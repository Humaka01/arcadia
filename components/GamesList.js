"use client"
import GameCard from './GameCard'
import useFavorites from './useFavorites'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function GamesList({ games, forceFavorites = false, showHeader = true }) {
  const { favorites } = useFavorites()
  const searchParams = useSearchParams()
  const defaultFromQuery = !!searchParams?.get('favorites')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(forceFavorites || defaultFromQuery)

  useEffect(() => {
    // Keep in sync if URL query param changes
    const qp = !!searchParams?.get('favorites')
    if (!forceFavorites) setShowOnlyFavorites(qp)
  }, [searchParams, forceFavorites])

  const visible = showOnlyFavorites ? games.filter((g) => favorites.includes(g.slug)) : games

  return (
    <div>
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Games</h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" className="accent-sky-600" checked={showOnlyFavorites} onChange={() => setShowOnlyFavorites((s) => !s)} />
              <span className="select-none">Show favorites</span>
            </label>
          </div>
        </div>
      )}
      {!showHeader && (
        <div className="flex items-center justify-end mb-4">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" className="accent-sky-600" checked={showOnlyFavorites} onChange={() => setShowOnlyFavorites((s) => !s)} />
            <span className="select-none">Show favorites</span>
          </label>
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  )
}
