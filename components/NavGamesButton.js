'use client'
import React from 'react'

export default function NavGamesButton() {
  return (
    <a href="/games" className="btn-glitch-fill nav-link" aria-label="Browse games">
      <span className="text">Games</span>
      <span className="text-decoration"> &gt;&gt;</span>
      <span className="decoration">⇒</span>
    </a>
  )
}
