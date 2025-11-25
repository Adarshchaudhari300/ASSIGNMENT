'use client'

import React, { useEffect, useCallback, useRef, useState } from 'react'
import { TokenRow } from './TokenRow'
import { TokenTableHeader } from './TokenTableHeader'
import { TokenFilters } from './TokenFilters'
import { TableSkeleton } from '@/components/molecules/TableSkeleton'
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokens, updateTokenPrice } from '@/store/tokenSlice'
import { useTokens } from '@/hooks/useTokens'
import { useWebSocket } from '@/hooks/useWebSocket'
import { PriceUpdate } from '@/types/token'

export const TokenTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const filteredTokens = useAppSelector(state => state.tokens.filteredTokens)
  const { data: tokens, isLoading, error } = useTokens()
  
  // Store previous prices for animation
  const previousPricesRef = useRef<Record<string, number>>({})
  
  // Track visible tokens for performance
  const [visibleCount, setVisibleCount] = useState(20)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens))
      // Initialize previous prices
      tokens.forEach(token => {
        previousPricesRef.current[token.id] = token.price
      })
    }
  }, [tokens, dispatch])

  const handlePriceUpdate = useCallback((update: PriceUpdate) => {
    dispatch(updateTokenPrice({ tokenId: update.tokenId, price: update.price }))
  }, [dispatch])

  const tokenIds = filteredTokens.map(token => token.id)
  useWebSocket(tokenIds, handlePriceUpdate)

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleCount < filteredTokens.length) {
          setVisibleCount(prev => Math.min(prev + 20, filteredTokens.length))
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [visibleCount, filteredTokens.length])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(20)
  }, [filteredTokens.length])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TokenFilters />
        <TableSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive">Failed to load tokens</h3>
          <p className="text-sm text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  const visibleTokens = filteredTokens.slice(0, visibleCount)

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <TokenFilters />
        
        <div className="space-y-3">
          <TokenTableHeader />
          
          {visibleTokens.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-muted/20">
              <p className="text-muted-foreground">No tokens found</p>
            </div>
          ) : (
            <>
              {visibleTokens.map(token => (
                <TokenRow
                  key={token.id}
                  token={token}
                  previousPrice={previousPricesRef.current[token.id]}
                />
              ))}
              
              {visibleCount < filteredTokens.length && (
                <div ref={observerTarget} className="flex justify-center py-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}
            </>
          )}
        </div>

        {filteredTokens.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Showing {visibleTokens.length} of {filteredTokens.length} tokens
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

