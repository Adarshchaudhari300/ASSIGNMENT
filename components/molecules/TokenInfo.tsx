'use client'

import React from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/Tooltip'
import { CheckCircle2, TrendingUp, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Token } from '@/types/token'

interface TokenInfoProps {
  token: Token
  className?: string
}

export const TokenInfo = React.memo<TokenInfoProps>(({ token, className }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 text-lg font-bold text-primary-foreground">
        {token.symbol.charAt(0)}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{token.name}</span>
          {token.verified && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Token</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {token.trending && (
            <Badge variant="success" className="text-xs">
              <TrendingUp className="mr-1 h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-muted-foreground">{token.symbol}</span>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-mono">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </span>
                  <Copy className="h-3 w-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy address'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
})

TokenInfo.displayName = 'TokenInfo'

