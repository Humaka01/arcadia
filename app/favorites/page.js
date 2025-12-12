import React from 'react'
import GamesList from '../../components/GamesList'
import { GAMES } from '../../lib/games'

export default function FavoritesPage() {
  return (
    <div className="container section space-y-6">
      <header className="mb-2">
        <h1 className="accent-title text-3xl font-extrabold">Your Favorites</h1>
        <p className="text-muted mt-1">Play games you saved as favorites.</p>
      </header>
      <React.Suspense fallback={<div className="p-4">Loading favorites...</div>}>
        <GamesList games={GAMES} forceFavorites={true} showHeader={false} />
      </React.Suspense>
    </div>
  )
}
