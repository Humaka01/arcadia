'use client'
import Link from 'next/link'
import useFavorites from './useFavorites'

export default function GameCard({ game }) {
  const { toggle, isFavorite } = useFavorites()
  const fav = isFavorite(game.slug)

  function onStarClick(e) {
    e.stopPropagation()
    e.preventDefault()
    toggle(game.slug)
  }

  return (
    <Link href={`/games/${game.slug}`} className="block no-underline focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2">
      <article className="relative card card-hover transform transition-all duration-200 hover:scale-[1.01]">
        <button
          type="button"
          onClick={onStarClick}
          aria-label={fav ? 'Unfavorite' : 'Add to favorites'}
          aria-pressed={fav ? 'true' : 'false'}
          className={`fav-btn ${fav ? 'favorited scale-105' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300`}
        >
          {fav ? '★' : '☆'}
        </button>
        <div className="flex items-start gap-4">
          <div className="thumbnail mr-4 text-3xl" aria-hidden>
            {game.thumbnail}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <p className="text-sm text-muted">{game.desc}</p>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button className="btn btn-primary play-btn" type="button">Play</button>
        </div>
      </article>
    </Link>
  )
}
