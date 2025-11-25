export type TokenStatus = 'new' | 'final_stretch' | 'migrated'

export interface Token {
  id: string
  name: string
  symbol: string
  address: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  createdAt: number
  status: TokenStatus
  trending: boolean
  verified: boolean
  chart?: number[]
}

export interface PriceUpdate {
  tokenId: string
  price: number
  timestamp: number
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'holders' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: SortField
  direction: SortDirection
}

export interface FilterConfig {
  status: TokenStatus | 'all'
  minMarketCap?: number
  minLiquidity?: number
  verified?: boolean
  trending?: boolean
}

