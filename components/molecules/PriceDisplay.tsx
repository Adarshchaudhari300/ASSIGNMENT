'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

interface PriceDisplayProps {
  price: number
  previousPrice?: number
  className?: string
}

export const PriceDisplay = React.memo<PriceDisplayProps>(
  ({ price, previousPrice, className }) => {
    const [animationClass, setAnimationClass] = useState<string>('')

    useEffect(() => {
      if (previousPrice !== undefined && previousPrice !== price) {
        const isIncrease = price > previousPrice
        setAnimationClass(isIncrease ? 'animate-price-flash-up' : 'animate-price-flash-down')
        
        const timer = setTimeout(() => {
          setAnimationClass('')
        }, 600)
        
        return () => clearTimeout(timer)
      }
    }, [price, previousPrice])

    const isPositive = previousPrice !== undefined ? price >= previousPrice : true

    return (
      <span
        className={cn(
          'font-mono font-medium transition-colors',
          isPositive ? 'text-success' : 'text-danger',
          animationClass,
          className
        )}
      >
        {formatPrice(price)}
      </span>
    )
  }
)

PriceDisplay.displayName = 'PriceDisplay'

