'use client'
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'favoriteGames'

export default function useFavorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setFavorites(raw ? JSON.parse(raw) : [])
    } catch (e) {
      setFavorites([])
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (e) {
      // ignore
    }
  }, [favorites])

  useEffect(() => {
    const onStorage = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const newFav = raw ? JSON.parse(raw) : []
        // avoid updating state during render synchronously
        // schedule an update to avoid React setState while rendering another component
        setTimeout(() => {
          setFavorites((cur) => {
            const curStr = JSON.stringify(cur)
            const newStr = JSON.stringify(newFav)
            return curStr === newStr ? cur : newFav
          })
        }, 0)
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('favorites-changed', onStorage)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('favorites-changed', onStorage)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = (slug) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        // dispatch an event asynchronously so any listeners update outside
        // React render phase. This avoids setState during render warnings.
        setTimeout(() => window.dispatchEvent(new Event('favorites-changed')), 0)
      } catch (e) {
        // ignore
      }
      return next
    })
  }

  const isFavorite = (slug) => favorites.includes(slug)

  return { favorites, toggle, isFavorite }
}
