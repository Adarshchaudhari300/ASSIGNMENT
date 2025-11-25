import React from 'react'
import { cn } from '@/lib/utils'
import { formatPercentage } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface PercentageChangeProps {
  value: number
  className?: string
  showIcon?: boolean
}

export const PercentageChange = React.memo<PercentageChangeProps>(
  ({ value, className, showIcon = true }) => {
    const isPositive = value >= 0

    return (
      <div
        className={cn(
          'flex items-center gap-1 font-medium',
          isPositive ? 'text-success' : 'text-danger',
          className
        )}
      >
        {showIcon && (
          <>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </>
        )}
        <span className="font-mono text-sm">{formatPercentage(value)}</span>
      </div>
    )
  }
)

PercentageChange.displayName = 'PercentageChange'

