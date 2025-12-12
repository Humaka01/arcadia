'use client'
export default function LoaderDots({ size = 6 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" />
      ))}
    </div>
  )
}
