'use client'

import { useQuery } from '@tanstack/react-query'
import { Token } from '@/types/token'
import { mockTokens } from '@/lib/mock-data'

// Simulate API fetch
async function fetchTokens(): Promise<Token[]> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockTokens
}

export function useTokens() {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  })
}

