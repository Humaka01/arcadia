'use client'
import { useState, useRef, useEffect } from 'react'

export default function ReactionTime() {
  const [state, setState] = useState('idle')
  const [time, setTime] = useState(null)
  const [best, setBest] = useState(null)
  const startRef = useRef(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('reaction-best')
      if (raw) setBest(JSON.parse(raw))
    } catch (e) {}
  }, [])

  function start() {
    setTime(null)
    setState('wait')
    const delay = 1000 + Math.random()*2000
    setTimeout(()=>{
      startRef.current = performance.now()
      setState('go')
    }, delay)
  }

  function record() {
    if (state === 'go') {
      const t = performance.now() - startRef.current
      setTime(t)
      setState('idle')
      setBest((prev) => {
        const next = prev === null ? t : Math.min(prev, t)
        try { localStorage.setItem('reaction-best', JSON.stringify(next)) } catch(e){}
        return next
      })
    } else if (state === 'wait') {
      // early click, punish
      setTime('Too early!')
      setState('idle')
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Reaction Time</h3>
      <div className="mb-2">
        <div className={`w-48 h-24 rounded flex items-center justify-center cursor-pointer ${state === 'go' ? 'bg-green-200' : state === 'wait' ? 'bg-yellow-200' : 'bg-slate-100'}`} onClick={record}>
          {state === 'idle' && 'Click Start'}
          {state === 'wait' && 'Wait...'}
          {state === 'go' && 'Click!'}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={start} className="px-3 py-1 bg-slate-200 rounded">Start</button>
        <button onClick={()=>{setTime(null); setState('idle')}} className="px-3 py-1 bg-slate-200 rounded">Reset</button>
      </div>
      {time && <div className="mt-3">Reaction: {typeof time === 'number' ? `${Math.round(time)} ms` : time}</div>}
      {best && <div className="mt-1 text-sm text-muted">Best: {Math.round(best)} ms</div>}
    </div>
  )
}
