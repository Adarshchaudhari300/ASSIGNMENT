import { PriceUpdate } from '@/types/token'

type Listener = (update: PriceUpdate) => void

export class WebSocketMock {
  private listeners: Listener[] = []
  private interval: NodeJS.Timeout | null = null
  private tokenIds: string[] = []

  constructor(tokenIds: string[]) {
    this.tokenIds = tokenIds
  }

  connect() {
    if (this.interval) return

    // Simulate price updates every 2-5 seconds
    this.interval = setInterval(() => {
      if (this.tokenIds.length === 0) return

      const randomTokenId = this.tokenIds[Math.floor(Math.random() * this.tokenIds.length)]
      const priceUpdate: PriceUpdate = {
        tokenId: randomTokenId,
        price: Math.random() * 10,
        timestamp: Date.now(),
      }

      this.notifyListeners(priceUpdate)
    }, 2000 + Math.random() * 3000)
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(update: PriceUpdate) {
    this.listeners.forEach(listener => listener(update))
  }

  updateTokenIds(tokenIds: string[]) {
    this.tokenIds = tokenIds
  }
}

