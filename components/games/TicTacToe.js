'use client'
import { useState, useRef, useEffect } from 'react'

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function computeWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] }
    }
  }
  const isDraw = board.every(Boolean)
  return { winner: isDraw ? 'Draw' : null, line: null }
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X') // human always 'X'
  const [winner, setWinner] = useState(null) // 'X', 'O', 'Draw'
  const [winningLine, setWinningLine] = useState(null)
  const [isThinking, setIsThinking] = useState(false)
  const cpuRef = useRef(null)

  useEffect(() => {
    return () => {
      if (cpuRef.current) clearTimeout(cpuRef.current)
    }
  }, [])

  useEffect(() => {
    // recompute winner whenever board changes
    const { winner: w, line } = computeWinner(board)
    if (w) {
      setWinner(w)
      setWinningLine(line)
      setIsThinking(false)
      // cancel any cpu timeout
      if (cpuRef.current) {
        clearTimeout(cpuRef.current)
        cpuRef.current = null
      }
    }
  }, [board])

  function reset() {
    if (cpuRef.current) { clearTimeout(cpuRef.current); cpuRef.current = null }
    setBoard(Array(9).fill(null))
    setTurn('X')
    setWinner(null)
    setWinningLine(null)
    setIsThinking(false)
  }

  function playerMove(i) {
    if (winner || board[i] !== null || turn !== 'X' || isThinking) return
    const next = board.slice()
    next[i] = 'X'
    setBoard(next)
    setTurn('O')
    const { winner: w } = computeWinner(next)
    if (w) {
      setWinner(w)
      return
    }
    // schedule CPU move
    setIsThinking(true)
    cpuRef.current = setTimeout(() => {
      // choose random empty
      const empties = next.map((v, idx) => v === null ? idx : -1).filter(n => n >= 0)
      if (empties.length === 0) {
        setIsThinking(false); setTurn('X'); return
      }
      const cpuIndex = empties[Math.floor(Math.random() * empties.length)]
      setBoard((cur) => {
        // if something changed (reset or win), abort
        if (computeWinner(cur).winner) return cur
        const copy = cur.slice()
        if (copy[cpuIndex] !== null) return cur
        copy[cpuIndex] = 'O'
        return copy
      })
      setTurn('X')
      setIsThinking(false)
      cpuRef.current = null
    }, 200)
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Tic Tac Toe</h3>
      <div className={`grid grid-cols-3 gap-2 w-48 ${isThinking ? 'opacity-90 cursor-not-allowed' : ''}`}>
        {board.map((cell, i) => (
          <button
            key={i}
            disabled={winner || cell !== null || turn !== 'X' || isThinking}
            onClick={() => playerMove(i)}
            className={`aspect-square rounded flex items-center justify-center text-2xl font-bold ${winningLine?.includes(i) ? 'bg-yellow-100 ring-2 ring-yellow-200' : 'bg-slate-100'}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-3">
        {winner ? (
          <div className="font-bold">{winner === 'Draw' ? 'Draw' : `Winner: ${winner}`}</div>
        ) : (
          <div>Next: {turn}</div>
        )}
        {isThinking && <div className="text-sm text-muted mt-2">CPU thinking…</div>}
        <div className="mt-2">
          <button onClick={reset} className="px-3 py-1 bg-slate-200 rounded">Reset</button>
        </div>
      </div>
    </div>
  )
}
