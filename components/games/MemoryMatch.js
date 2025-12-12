'use client'
import { useState } from 'react'

const symbols = ['🍎','🍌','🍇','🍒']

export default function MemoryMatch() {
  const [cards, setCards] = useState(shuffle([...symbols, ...symbols].map((s, i) => ({id: i, s, flipped: false, found: false}))))
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)

  function shuffle(a) { return a.sort(()=>Math.random()-0.5) }

  function flip(i) {
    if (cards[i].found || cards[i].flipped) return
    const next = cards.slice()
    next[i].flipped = true
    setCards(next)
    if (!first) { setFirst(i); return }
    if (!second) { setSecond(i); setTimeout(()=>checkMatch(i), 600) }
  }

  function checkMatch(i) {
    const next = cards.slice()
    if (next[first].s === next[i].s) {
      next[first].found = true
      next[i].found = true
    } else {
      next[first].flipped = false
      next[i].flipped = false
    }
    setCards(next)
    setFirst(null); setSecond(null)
  }

  function reset() {
    setCards(shuffle([...symbols, ...symbols].map((s, i) => ({id: i, s, flipped: false, found: false}))))
    setFirst(null); setSecond(null)
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Memory Match</h3>
      <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
        {cards.map((c, idx) => (
          <button key={c.id} onClick={() => flip(idx)} className={`aspect-square rounded ${c.flipped || c.found ? 'bg-white' : 'bg-slate-100'} flex items-center justify-center text-2xl`}>{c.flipped||c.found ? c.s : '?'}</button>
        ))}
      </div>
      <div className="mt-3">
        <button onClick={reset} className="px-3 py-1 bg-slate-200 rounded">Reset</button>
      </div>
    </div>
  )
}
