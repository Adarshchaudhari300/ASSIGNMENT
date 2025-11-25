'use client'

import React from 'react'
import { Token } from '@/types/token'
import { TokenInfo } from '@/components/molecules/TokenInfo'
import { PriceDisplay } from '@/components/molecules/PriceDisplay'
import { PercentageChange } from '@/components/molecules/PercentageChange'
import { MiniChart } from '@/components/molecules/MiniChart'
import { Badge } from '@/components/atoms/Badge'
import { formatNumber } from '@/lib/utils'
import { Droplets, Users, TrendingUp as TrendingUpIcon } from 'lucide-react'

interface MobileTokenCardProps {
  token: Token
  previousPrice?: number
}

export const MobileTokenCard = React.memo<MobileTokenCardProps>(({ token, previousPrice }) => {
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
    <div className="rounded-lg border bg-card p-4 space-y-3">
      {/* Header with Token Info and Status */}
      <div className="flex items-start justify-between gap-2">
        <TokenInfo token={token} />
        <Badge variant={statusVariants[token.status]} className="flex-shrink-0">
          {statusLabels[token.status]}
        </Badge>
      </div>

      {/* Price and Change */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Price</div>
          <PriceDisplay price={token.price} previousPrice={previousPrice} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">24h Change</div>
          <PercentageChange value={token.priceChange24h} showIcon={false} />
        </div>
      </div>

      {/* Chart */}
      {token.chart && (
        <div className="flex items-center justify-center py-2">
          <MiniChart
            data={token.chart}
            positive={token.priceChange24h >= 0}
            className="w-full h-12"
          />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
          <div className="font-mono font-medium">${formatNumber(token.marketCap)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Volume</div>
          <div className="font-mono font-medium">${formatNumber(token.volume24h)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            Liquidity
          </div>
          <div className="font-mono font-medium">${formatNumber(token.liquidity)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Users className="h-3 w-3" />
            Holders
          </div>
          <div className="font-mono font-medium">{formatNumber(token.holders, 0)}</div>
        </div>
      </div>
    </div>
  )
})

MobileTokenCard.displayName = 'MobileTokenCard'

