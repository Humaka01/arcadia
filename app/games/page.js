import React from 'react'
import { GAMES } from '../../lib/games'
import GamesList from '../../components/GamesList'
import SkeletonCard from '../../components/SkeletonCard'

export default function GamesPage() {
  return (
    <div className="container section space-y-6">
      <header className="mb-2">
        <h1 className="accent-title text-3xl font-extrabold">Browse Games</h1>
        <p className="text-muted mt-1">Find a quick game to play — use favorites to save the ones you like most.</p>
      </header>
      <React.Suspense fallback={<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{Array.from({length:6}).map((_,i)=>(<SkeletonCard key={i} />))}</div>}>
        <GamesList games={GAMES} showHeader={false} />
      </React.Suspense>
    </div>
  )
}
