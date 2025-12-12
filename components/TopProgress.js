"use client"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function TopProgress() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let t
    if (!pathname) return
    setLoading(true)
    // simulate progress finishing sometime in the future, but never too long
    t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div aria-hidden>
      <div className={`fixed left-0 top-0 h-1 z-50 transition-all duration-300 ${loading ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
        <div className="h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-lg" style={{ opacity: 0.95 }} />
      </div>
    </div>
  )
}
