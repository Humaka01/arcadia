// Global stylesheet is imported here so it's available in all routes
import '../styles/globals.scss'
import TopProgress from '../components/TopProgress'
import LightPillarClient from '../components/LightPillarClient'
import NavGamesButton from '../components/NavGamesButton'

// Metadata is used by Next.js App Router for default head tags
export const metadata = {
  title: 'Arcadia — Fun & Quick Browser Games',
  description: 'Arcadia — a collection of quick and polished browser games',
}

// RootLayout is a Server Component by default in the App Router
// It wraps pages and nested layouts, and is the right place to put
// global imports like CSS, fonts, and providers.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          <div className="container section app-content" style={{ position: 'relative', zIndex: 10 }}>
            <header className="site-header mb-6 flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">A</div>
                <div>
                  <div className="text-xl font-semibold">Arcadia</div>
                  <div className="text-xs text-muted">Fun & quick browser games</div>
                </div>
              </div>
              <nav className="flex items-center gap-4">
                <a href="/" className="nav-link">Home</a>
                <NavGamesButton />
                <a href="/favorites" className="nav-link">Favorites</a>
                {/* Search removed by user request */}
              </nav>
            </header>
            <TopProgress />
            <LightPillarClient
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1.0}
              rotationSpeed={0.3}
              glowAmount={0.005}
              pillarWidth={3.0}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={0}
              interactive={false}
              mixBlendMode="screen"
            />
            <div className="container section">
              {children}
            </div>
            <footer className="site-footer mt-12 py-8 text-sm text-muted">
              <div className="flex items-center justify-between">
                <div>© {new Date().getFullYear()} Arcadia</div>
                <div className="flex gap-4">
                  <a href="#" className="nav-link">Privacy</a>
                  <a href="#" className="nav-link">Terms</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  )
}
