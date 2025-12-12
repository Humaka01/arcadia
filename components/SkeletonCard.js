export default function SkeletonCard({ wide = false }) {
  return (
    <div className={`animate-pulse card ${wide ? 'col-span-1 sm:col-span-2' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-slate-200" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
        <div className="w-12 h-6 rounded bg-slate-200" />
      </div>
    </div>
  )
}
