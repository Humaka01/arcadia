'use client'
import TicTacToe from './games/TicTacToe'
import RockPaperScissors from './games/RockPaperScissors'
import MemoryMatch from './games/MemoryMatch'
import GuessNumber from './games/GuessNumber'
import ReactionTime from './games/ReactionTime'
import useFavorites from './useFavorites'
import Link from 'next/link'

export default function GameHost({ slug }) {
  if (!slug) return <div className="p-4">No game specified.</div>
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(slug)
  // header for the host
  const header = (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold capitalize">{slug.replace(/-/g, ' ')}</div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => toggle(slug)} className={`px-2 py-1 rounded play-btn ${fav ? 'bg-yellow-100 text-yellow-600 scale-105' : 'bg-slate-100'}`}>{fav ? '★ Favorited' : '☆ Favorite'}</button>
        <Link href="/games" className="nav-link">Back</Link>
      </div>
    </div>
  )
  switch(slug) {
    case 'tic-tac-toe': return <div>{header}<TicTacToe /></div>
    case 'rps': return <div>{header}<RockPaperScissors /></div>
    case 'memory': return <div>{header}<MemoryMatch /></div>
    case 'guess-number': return <div>{header}<GuessNumber /></div>
    case 'reaction-time': return <div>{header}<ReactionTime /></div>
    default: return <div>{header}<div>Game not found.</div></div>
  }
}
