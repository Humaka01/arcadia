'use client'
import { useState, useEffect } from 'react'

export default function GuessNumber() {
  const [target, setTarget] = useState(() => Math.floor(Math.random()*100)+1)
  const [guess, setGuess] = useState('')
  const [msg, setMsg] = useState(null)
  const [best, setBest] = useState(null)
  const [attempts, setAttempts] = useState(0)

  function submit() {
    const g = parseInt(guess, 10)
    if (!g || g < 1 || g > 100) { setMsg('Enter a number 1-100'); return }
    setAttempts((a)=>a+1)
    if (g === target) {
      const wonAttempts = attempts+1
      setMsg(`Correct! You guessed in ${wonAttempts} attempts`)
      setBest((prev) => {
        const next = prev === null ? wonAttempts : Math.min(prev, wonAttempts)
        try { localStorage.setItem('guess-number-best', JSON.stringify(next)) } catch(e){}
        return next
      })
    }
    else if (g < target) setMsg('Too low')
    else setMsg('Too high')
  }

  function reset() {
    setTarget(Math.floor(Math.random()*100)+1)
    setGuess('')
    setMsg(null)
    setAttempts(0)
  }

  useEffect(()=>{
    try {
      const raw = localStorage.getItem('guess-number-best')
      if (raw) setBest(JSON.parse(raw))
    } catch(e){}
  }, [])

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Guess Number</h3>
      <div className="flex gap-2 mb-2">
        <input value={guess} onChange={(e)=>setGuess(e.target.value)} className="border px-2 py-1 rounded" placeholder="1-100" />
        <button onClick={submit} className="px-3 py-1 bg-slate-200 rounded">Guess</button>
      </div>
      {msg && <div className="mb-2">{msg}</div>}
      <div className="text-sm text-slate-600">Attempts: {attempts}</div>
      <div className="mt-2"><button onClick={reset} className="px-3 py-1 bg-slate-200 rounded">Reset</button></div>
    </div>
  )
}
