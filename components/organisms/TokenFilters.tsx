'use client'

import React from 'react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/atoms/Dropdown'
import { Search, Filter, X } from 'lucide-react'
import { FilterConfig, TokenStatus } from '@/types/token'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFilterConfig, setSearchQuery } from '@/store/tokenSlice'

export const TokenFilters: React.FC = () => {
  const dispatch = useAppDispatch()
  const filterConfig = useAppSelector(state => state.tokens.filterConfig)
  const searchQuery = useAppSelector(state => state.tokens.searchQuery)

  const handleStatusChange = (value: string) => {
    dispatch(setFilterConfig({ ...filterConfig, status: value as TokenStatus | 'all' }))
  }

  const handleVerifiedToggle = (checked: boolean) => {
    dispatch(setFilterConfig({ ...filterConfig, verified: checked ? true : undefined }))
  }

  const handleTrendingToggle = (checked: boolean) => {
    dispatch(setFilterConfig({ ...filterConfig, trending: checked ? true : undefined }))
  }

  const handleMinMarketCapChange = (value: string) => {
    const minMarketCap = value ? Number(value) : undefined
    dispatch(setFilterConfig({ ...filterConfig, minMarketCap }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handleClearFilters = () => {
    dispatch(setFilterConfig({ status: 'all' }))
    dispatch(setSearchQuery(''))
  }

  const activeFiltersCount = [
    filterConfig.status !== 'all',
    filterConfig.verified,
    filterConfig.trending,
    filterConfig.minMarketCap,
  ].filter(Boolean).length

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tokens, symbols, or addresses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(''))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters Dropdown */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-2 px-1.5 py-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={filterConfig.status} onValueChange={handleStatusChange}>
              <DropdownMenuRadioItem value="all">All Tokens</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="new">New Pairs</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="final_stretch">Final Stretch</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="migrated">Migrated</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Attributes</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filterConfig.verified === true}
              onCheckedChange={handleVerifiedToggle}
            >
              Verified Only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterConfig.trending === true}
              onCheckedChange={handleTrendingToggle}
            >
              Trending Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}

