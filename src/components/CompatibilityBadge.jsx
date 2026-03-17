import React, { useState } from 'react'

export default function CompatibilityBadge({ score, size = 'md', showLabel = true, breakdown = null }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const getColor = (s) => {
    if (s >= 90) return { stroke: '#FF6B6B', text: 'text-coral', label: 'Great Match', bg: 'bg-red-50' }
    if (s >= 70) return { stroke: '#F59E0B', text: 'text-amber-500', label: 'Good Match', bg: 'bg-amber-50' }
    return { stroke: '#94A3B8', text: 'text-gray-400', label: 'Fair Match', bg: 'bg-gray-50' }
  }

  const colors = getColor(score)

  const sizes = {
    sm: { outer: 48, strokeWidth: 4, fontSize: 'text-xs', cx: 24, cy: 24, r: 20 },
    md: { outer: 64, strokeWidth: 5, fontSize: 'text-sm', cx: 32, cy: 32, r: 26 },
    lg: { outer: 80, strokeWidth: 6, fontSize: 'text-base', cx: 40, cy: 40, r: 33 },
  }

  const s = sizes[size]
  const circumference = 2 * Math.PI * s.r
  const offset = circumference - (score / 100) * circumference

  return (
    <div
      className="relative inline-flex flex-col items-center gap-1 cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg width={s.outer} height={s.outer} className="transform -rotate-90">
        <circle
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={s.strokeWidth}
        />
        <circle
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={s.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold ${colors.text} ${s.fontSize}`}>{score}%</span>
      </div>
      {showLabel && (
        <span className={`${s.fontSize} font-semibold ${colors.text} whitespace-nowrap`}>
          {colors.label}
        </span>
      )}

      {/* Tooltip */}
      {showTooltip && breakdown && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy text-white text-xs rounded-xl p-3 w-44 shadow-xl z-50">
          <p className="font-semibold mb-2">Compatibility Breakdown</p>
          {Object.entries(breakdown).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center mb-1">
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-coral rounded-full" style={{ width: `${val}%` }} />
                </div>
                <span className="text-coral font-medium">{val}%</span>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy" />
        </div>
      )}
    </div>
  )
}
