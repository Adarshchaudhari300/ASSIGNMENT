'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { SortField, SortDirection } from '@/types/token'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSortConfig } from '@/store/tokenSlice'
import { cn } from '@/lib/utils'

interface Column {
  label: string
  field: SortField
  width: string
}

const columns: Column[] = [
  { label: 'Token', field: 'createdAt', width: 'min-w-[200px]' },
  { label: 'Price', field: 'price', width: 'min-w-[120px]' },
  { label: '24h Change', field: 'priceChange24h', width: 'min-w-[100px]' },
  { label: 'Chart', field: 'price', width: 'min-w-[100px]' },
  { label: 'Market Cap', field: 'marketCap', width: 'min-w-[120px]' },
  { label: 'Volume (24h)', field: 'volume24h', width: 'min-w-[120px]' },
  { label: 'Liquidity', field: 'liquidity', width: 'min-w-[120px]' },
  { label: 'Holders', field: 'holders', width: 'min-w-[100px]' },
]

export const TokenTableHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortConfig = useAppSelector(state => state.tokens.sortConfig)

  const handleSort = (field: SortField) => {
    let direction: SortDirection = 'desc'
    
    if (sortConfig.field === field) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }
    
    dispatch(setSortConfig({ field, direction }))
  }

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
    }
    
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4 font-semibold text-sm">
      {columns.map((column) => (
        <div key={column.field} className={cn('flex-shrink-0', column.width)}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort(column.field)}
            className={cn(
              'flex items-center p-0 h-auto font-semibold hover:bg-transparent',
              sortConfig.field === column.field && 'text-primary'
            )}
          >
            {column.label}
            {getSortIcon(column.field)}
          </Button>
        </div>
      ))}
      <div className="min-w-[120px] flex-shrink-0">Status</div>
    </div>
  )
}

