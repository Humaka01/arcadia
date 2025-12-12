'use client'
import { useState } from 'react'

const choices = ['Rock', 'Paper', 'Scissors']

export default function RockPaperScissors() {
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ you: 0, cpu: 0 })

  function play(yourChoice) {
    const cpu = choices[Math.floor(Math.random()*3)]
    const outcome = getOutcome(yourChoice, cpu)
    if (outcome === 'win') setScore((s) => ({...s, you: s.you+1}))
    if (outcome === 'lose') setScore((s) => ({...s, cpu: s.cpu+1}))
    setResult({ yourChoice, cpu, outcome })
  }

  function reset() {
    setResult(null);
    setScore({ you: 0, cpu: 0 })
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Rock Paper Scissors</h3>
      <div className="flex gap-2 mb-4">
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)} className="px-3 py-2 bg-slate-100 rounded">{c}</button>
        ))}
      </div>
      {result && (
        <div className="mb-2">
          <div>You: {result.yourChoice} — CPU: {result.cpu}</div>
          <div className={`font-bold ${result.outcome === 'win' ? 'text-green-600' : result.outcome === 'lose' ? 'text-red-600' : ''}`}>
            {result.outcome === 'win' ? 'You win!' : result.outcome === 'lose' ? 'You lose' : 'Draw'}
          </div>
        </div>
      )}
      <div className="text-sm text-slate-600 mb-2">Score — You: {score.you} / CPU: {score.cpu}</div>
      <div>
        <button onClick={reset} className="px-3 py-1 bg-slate-200 rounded">Reset</button>
      </div>
    </div>
  )
}

function getOutcome(a,b) {
  if (a === b) return 'draw'
  if ((a === 'Rock' && b === 'Scissors') || (a === 'Paper' && b === 'Rock') || (a === 'Scissors' && b === 'Paper')) return 'win'
  return 'lose'
}
