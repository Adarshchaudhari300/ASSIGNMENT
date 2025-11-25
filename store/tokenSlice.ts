import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, SortConfig, FilterConfig } from '@/types/token'

interface TokenState {
  tokens: Token[]
  filteredTokens: Token[]
  sortConfig: SortConfig
  filterConfig: FilterConfig
  searchQuery: string
}

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  sortConfig: {
    field: 'marketCap',
    direction: 'desc',
  },
  filterConfig: {
    status: 'all',
  },
  searchQuery: '',
}

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Token[]>) {
      state.tokens = action.payload
      state.filteredTokens = applyFiltersAndSort(action.payload, state.filterConfig, state.sortConfig, state.searchQuery)
    },
    updateTokenPrice(state, action: PayloadAction<{ tokenId: string; price: number }>) {
      const { tokenId, price } = action.payload
      const token = state.tokens.find(t => t.id === tokenId)
      if (token) {
        const oldPrice = token.price
        token.price = price
        token.priceChange24h = ((price - oldPrice) / oldPrice) * 100
      }
      state.filteredTokens = applyFiltersAndSort(state.tokens, state.filterConfig, state.sortConfig, state.searchQuery)
    },
    setSortConfig(state, action: PayloadAction<SortConfig>) {
      state.sortConfig = action.payload
      state.filteredTokens = applyFiltersAndSort(state.tokens, state.filterConfig, state.sortConfig, state.searchQuery)
    },
    setFilterConfig(state, action: PayloadAction<FilterConfig>) {
      state.filterConfig = action.payload
      state.filteredTokens = applyFiltersAndSort(state.tokens, state.filterConfig, state.sortConfig, state.searchQuery)
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.filteredTokens = applyFiltersAndSort(state.tokens, state.filterConfig, state.sortConfig, state.searchQuery)
    },
  },
})

function applyFiltersAndSort(
  tokens: Token[],
  filterConfig: FilterConfig,
  sortConfig: SortConfig,
  searchQuery: string
): Token[] {
  let filtered = [...tokens]

  // Apply status filter
  if (filterConfig.status !== 'all') {
    filtered = filtered.filter(token => token.status === filterConfig.status)
  }

  // Apply market cap filter
  if (filterConfig.minMarketCap) {
    filtered = filtered.filter(token => token.marketCap >= filterConfig.minMarketCap!)
  }

  // Apply liquidity filter
  if (filterConfig.minLiquidity) {
    filtered = filtered.filter(token => token.liquidity >= filterConfig.minLiquidity!)
  }

  // Apply verified filter
  if (filterConfig.verified !== undefined) {
    filtered = filtered.filter(token => token.verified === filterConfig.verified)
  }

  // Apply trending filter
  if (filterConfig.trending !== undefined) {
    filtered = filtered.filter(token => token.trending === filterConfig.trending)
  }

  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      token =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query) ||
        token.address.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[sortConfig.field]
    const bValue = b[sortConfig.field]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return filtered
}

export const { setTokens, updateTokenPrice, setSortConfig, setFilterConfig, setSearchQuery } = tokenSlice.actions
export default tokenSlice.reducer

