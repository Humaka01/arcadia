"use client"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageFade({ children }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>{children}</div>
  )
}
