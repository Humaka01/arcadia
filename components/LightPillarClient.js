'use client'
import React, { useEffect, useState } from 'react'

function LightPillarFallback(props) {
  const { topColor = '#5227FF', bottomColor = '#FF9FFC' } = props
  // Simple CSS-based vertical gradient pillar as a graceful fallback
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80%', height: '380px', background: `linear-gradient(${topColor}, ${bottomColor})`, borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
    </div>
  )
}

export default function LightPillarClient(props) {
  const [Comp, setComp] = useState(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    let mounted = true
    import('./LightPillar').then((m) => {
      if (!mounted) return
      setComp(() => m.default)
    }).catch((err) => {
      console.warn('Could not load LightPillar (three.js):', err)
      setErrored(true)
    })
    return () => { mounted = false }
  }, [])

  if (errored) return <LightPillarFallback {...props} />
  if (!Comp) return <LightPillarFallback {...props} />
  const Loaded = Comp
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Loaded {...props} />
    </div>
  )
}
