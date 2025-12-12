import { GAMES } from '../../../lib/games'
import Link from 'next/link'
import GameHost from '../../../components/GameHost'

export default async function GamePage({ params }) {
  // `params` may be a plain object or a Promise depending on runtime.
  const realParams = typeof params?.then === 'function' ? await params : params
  const slug = realParams?.slug
  const game = GAMES.find((g) => g.slug === slug)
  if (!game) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Game not found</h1>
        <p className="mt-2 text-muted">The game &quot;{slug}&quot; is not available.</p>
        <div className="mt-4">
          <Link href="/games" className="nav-link">Back to Games</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="text-sm text-muted">{game.desc}</p>
        </div>
        <div>
          <Link href="/games" className="px-3 py-1 bg-slate-100 rounded nav-link">Back</Link>
        </div>
      </div>
      <div className="card">
        {/* pass the resolved slug instead of the possibly-promise `params` */}
        <GameHost slug={slug} />
      </div>
    </div>
  )
}
