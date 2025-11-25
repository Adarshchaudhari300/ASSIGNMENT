'use client'

import React, { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface MiniChartProps {
  data: number[]
  className?: string
  positive?: boolean
}

export const MiniChart = React.memo<MiniChartProps>(({ data, className, positive = true }) => {
  const { path, viewBox } = useMemo(() => {
    const width = 80
    const height = 30
    const padding = 2
    
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    
    const pathString = `M ${points.join(' L ')}`
    
    return {
      path: pathString,
      viewBox: `0 0 ${width} ${height}`,
    }
  }, [data])
  
  return (
    <svg
      viewBox={viewBox}
      className={cn('h-8 w-20', className)}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={positive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
})

MiniChart.displayName = 'MiniChart'

