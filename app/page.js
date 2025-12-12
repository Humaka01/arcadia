import Link from 'next/link'
import React from 'react'
import LightPillarClient from '../components/LightPillarClient'
import GlitchText from '../components/GlitchText'
import GamesList from '../components/GamesList'
import SkeletonCard from '../components/SkeletonCard'
import { GAMES } from '../lib/games'

// This is the root page for the App Router (app/page.js). Pages are
// Server Components by default. You can create client components inside
// the page (like `Hero`) to add interactivity.
export default function Home() {
  return (
    <div className="container section space-y-6">
      <section className="bg-white/5 backdrop-blur-sm text-white rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-4 text-4xl md:text-5xl font-extrabold">
              <GlitchText speed={1} enableShadows={true} enableOnHover={true} className="mr-3 inline-block">Arcadia</GlitchText>
              <span className="hidden md:inline text-inherit"> — Fun & Quick Browser Games</span>
            </h1>
            <p className="mt-2 text-sky-200/70 max-w-xl">Five compact, polished games designed for quick fun and to test your skills. Save favorites to play later.</p>
            <div className="mt-4">
              <Link href="/games" className="px-4 py-2 bg-white/90 text-sky-700 rounded-full font-medium shadow-sm">Browse Games</Link>
            </div>
          </div>
          <span className="hero-decor hidden md:block text-5xl">🎮</span>
        </div>
      </section>

      {/* Removed Visual Demo section — LightPillar now renders as full-screen background */}

      <section>
        <h2 className="accent-title text-2xl font-bold mb-4">Featured Games</h2>
          <React.Suspense fallback={<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"><SkeletonCard wide /><SkeletonCard /><SkeletonCard /></div>}>
            <GamesList games={GAMES.slice(0, 3)} showHeader={false} />
          </React.Suspense>
      </section>
      <section>
        <h2 className="accent-title text-2xl font-bold mb-4">All Games</h2>
          <React.Suspense fallback={<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{Array.from({length:6}).map((_,i)=>(<SkeletonCard key={i} />))}</div>}>
            <GamesList games={GAMES} showHeader={false} />
          </React.Suspense>
      </section>
    </div>
  )
}
