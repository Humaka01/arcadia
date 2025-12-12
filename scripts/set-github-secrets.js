#!/usr/bin/env node
const fetch = require('node-fetch')
const sealedbox = require('tweetnacl-sealedbox-js')

async function getRepoPublicKey(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/secrets/public-key`
  const res = await fetch(url, { headers: { Authorization: `token ${token}`, 'User-Agent': 'set-secrets-script' } })
  if (!res.ok) throw new Error(`Failed to get public key: ${res.status} ${res.statusText}`)
  return res.json()
}

function encryptValue(publicKeyBase64, value) {
  const publicKey = Buffer.from(publicKeyBase64, 'base64')
  const messageUint8 = Buffer.from(value)
  const sealed = sealedbox.seal(messageUint8, publicKey)
  return Buffer.from(sealed).toString('base64')
}

async function createOrUpdateSecret(owner, repo, token, keyId, encryptedValue, secretName) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secretName}`
  const body = { encrypted_value: encryptedValue, key_id: keyId }
  const res = await fetch(url, { method: 'PUT', headers: { Authorization: `token ${token}`, 'User-Agent': 'set-secrets-script', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(`Failed to create secret ${secretName}: ${res.status} ${res.statusText}`)
  console.log(`Set secret ${secretName}`)
}

async function getVercelProjectAndOrgIds(vercelToken, owner, projectName) {
  const headers = { Authorization: `Bearer ${vercelToken}`, 'User-Agent': 'set-secrets-script' }
  // Try v1 projects list
  let res = await fetch('https://api.vercel.com/v1/projects', { headers })
  if (!res.ok) throw new Error(`Failed to fetch Vercel projects: ${res.status} ${res.statusText}`)
  let projects = await res.json()
  console.log('Found', projects.length, 'projects in Vercel')
  let proj = projects.find(p => p.name === projectName)
  if (!proj) {
    // attempt to find teams and create a project under the first team
    const teamsRes = await fetch('https://api.vercel.com/v1/teams', { headers })
    if (!teamsRes.ok) throw new Error(`Failed to fetch teams: ${teamsRes.status} ${teamsRes.statusText}`)
    const teams = await teamsRes.json()
    console.log('Found', (teams && teams.length) || 0, 'teams on Vercel')
    const team = teams && teams[0]
    const teamId = team && team.id
    if (!teamId) return null
    // Attempt to create project via git repo
    const createBody = {
      name: projectName,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: `${owner}/${projectName}`,
        org: owner || null,
        productionBranch: 'main'
      }
    }
    const createUrl = teamId ? `https://api.vercel.com/v1/projects?teamId=${teamId}` : `https://api.vercel.com/v1/projects`
    console.log('Creating project on Vercel with URL', createUrl)
    const createRes = await fetch(createUrl, { method: 'POST', headers: { Authorization: `Bearer ${vercelToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(createBody) })
    const createText = await createRes.text()
    try { var createJson = JSON.parse(createText) } catch(e){ createJson = createText }
    if (!createRes.ok) {
      console.error('Vercel create project response:', createRes.status, createRes.statusText, createJson)
      throw new Error(`Failed to create Vercel project: ${createRes.status} ${createRes.statusText}`)
    }
    proj = createJson
    proj = await createRes.json()
  }
  return { projectId: proj.id, orgId: proj.orgId || (proj.owner && proj.owner.id) }
}

async function main() {
  const [owner, repo] = (process.env.GITHUB_REPO || 'Humaka01/arcadia').split('/')
  const githubToken = process.env.GITHUB_PAT
  const vercelToken = process.env.VERCEL_TOKEN
  if (!githubToken) throw new Error('GITHUB_PAT missing in env')
  if (!vercelToken) throw new Error('VERCEL_TOKEN missing in env')

  let projectId = null
  let orgId = null
  if (!process.env.SKIP_VERCEL_CHECK) {
    const vp = await getVercelProjectAndOrgIds(vercelToken, owner, repo)
    if (!vp) {
      console.error('Vercel project not found for project name:', repo)
      console.error('Please import/create the project in Vercel or set SKIP_VERCEL_CHECK=true to only set the VERCEL_TOKEN secret')
      process.exit(1)
    }
    projectId = vp.projectId
    orgId = vp.orgId
  }
  // gather secrets
  const secretsToSet = { VERCEL_TOKEN: vercelToken }
  if (!process.env.SKIP_VERCEL_CHECK) {
    secretsToSet.VERCEL_PROJECT_ID = projectId
    secretsToSet.VERCEL_ORG_ID = orgId
  }
  // public key
  const keyResp = await getRepoPublicKey(owner, repo, githubToken)
  const { key, key_id } = keyResp
  console.log('Setting repository secrets...')
  for (const [name, value] of Object.entries(secretsToSet)) {
    const encryptedValue = encryptValue(key, value)
    await createOrUpdateSecret(owner, repo, githubToken, key_id, encryptedValue, name)
  }
  console.log('All secrets set successfully.')
}

main().catch((err) => { console.error(err); process.exit(1) })
