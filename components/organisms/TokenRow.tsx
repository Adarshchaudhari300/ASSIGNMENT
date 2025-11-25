'use client'

import React, { useState } from 'react'
import { Token } from '@/types/token'
import { TokenInfo } from '@/components/molecules/TokenInfo'
import { PriceDisplay } from '@/components/molecules/PriceDisplay'
import { PercentageChange } from '@/components/molecules/PercentageChange'
import { MiniChart } from '@/components/molecules/MiniChart'
import { Badge } from '@/components/atoms/Badge'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/atoms/Popover'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalTrigger } from '@/components/atoms/Modal'
import { formatNumber } from '@/lib/utils'
import { Info, Users, Droplets, TrendingUp } from 'lucide-react'

interface TokenRowProps {
  token: Token
  previousPrice?: number
}

export const TokenRow = React.memo<TokenRowProps>(({ token, previousPrice }) => {
  const [isHovered, setIsHovered] = useState(false)

  const statusLabels = {
    new: 'New',
    final_stretch: 'Final Stretch',
    migrated: 'Migrated',
  }

  const statusVariants = {
    new: 'default' as const,
    final_stretch: 'secondary' as const,
    migrated: 'success' as const,
  }

  return (
    <div
      className="group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Token Info */}
      <div className="min-w-[200px] flex-shrink-0">
        <TokenInfo token={token} />
      </div>

      {/* Price */}
      <div className="min-w-[120px] flex-shrink-0">
        <PriceDisplay price={token.price} previousPrice={previousPrice} />
      </div>

      {/* 24h Change */}
      <div className="min-w-[100px] flex-shrink-0">
        <PercentageChange value={token.priceChange24h} />
      </div>

      {/* Mini Chart */}
      <div className="min-w-[100px] flex-shrink-0">
        {token.chart && (
          <MiniChart
            data={token.chart}
            positive={token.priceChange24h >= 0}
          />
        )}
      </div>

      {/* Market Cap with Popover */}
      <div className="min-w-[120px] flex-shrink-0">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <span className="font-mono">${formatNumber(token.marketCap)}</span>
              <Info className="h-3 w-3 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Market Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="font-mono">${formatNumber(token.marketCap, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fully Diluted:</span>
                  <span className="font-mono">${formatNumber(token.marketCap * 1.2, 2)}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Volume */}
      <div className="min-w-[120px] flex-shrink-0 font-mono text-sm">
        ${formatNumber(token.volume24h)}
      </div>

      {/* Liquidity with Icon */}
      <div className="min-w-[120px] flex-shrink-0">
        <div className="flex items-center gap-1 text-sm">
          <Droplets className="h-4 w-4 text-primary" />
          <span className="font-mono">${formatNumber(token.liquidity)}</span>
        </div>
      </div>

      {/* Holders with Modal */}
      <div className="min-w-[100px] flex-shrink-0">
        <Modal>
          <ModalTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Users className="h-4 w-4" />
              <span className="font-mono">{formatNumber(token.holders, 0)}</span>
            </button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{token.name} Holder Information</ModalTitle>
              <ModalDescription>
                Detailed holder statistics and distribution
              </ModalDescription>
            </ModalHeader>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Holders:</span>
                <span className="font-mono font-semibold">{formatNumber(token.holders, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top 10 Holdings:</span>
                <span className="font-mono">~45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Holding:</span>
                <span className="font-mono">${formatNumber(token.marketCap / token.holders, 2)}</span>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>

      {/* Status Badge */}
      <div className="min-w-[120px] flex-shrink-0">
        <Badge variant={statusVariants[token.status]}>
          {statusLabels[token.status]}
        </Badge>
      </div>

      {/* Hover effect indicator */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary/20 pointer-events-none" />
      )}
    </div>
  )
})

TokenRow.displayName = 'TokenRow'

