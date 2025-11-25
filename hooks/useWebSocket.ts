'use client'

import { useEffect, useRef } from 'react'
import { WebSocketMock } from '@/lib/websocket-mock'
import { PriceUpdate } from '@/types/token'

export function useWebSocket(
  tokenIds: string[],
  onPriceUpdate: (update: PriceUpdate) => void
) {
  const wsRef = useRef<WebSocketMock | null>(null)

  useEffect(() => {
    if (tokenIds.length === 0) return

    const ws = new WebSocketMock(tokenIds)
    wsRef.current = ws

    const unsubscribe = ws.subscribe(onPriceUpdate)
    ws.connect()

    return () => {
      unsubscribe()
      ws.disconnect()
    }
  }, [tokenIds.join(','), onPriceUpdate])

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.updateTokenIds(tokenIds)
    }
  }, [tokenIds])

  return wsRef.current
}

