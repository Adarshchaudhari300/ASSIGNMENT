import { Token, TokenStatus } from '@/types/token'

const tokenNames = [
  { name: 'Pepe Coin', symbol: 'PEPE' },
  { name: 'Dogwifhat', symbol: 'WIF' },
  { name: 'Bonk', symbol: 'BONK' },
  { name: 'Floki Inu', symbol: 'FLOKI' },
  { name: 'Baby Doge', symbol: 'BABYDOGE' },
  { name: 'Shiba Inu', symbol: 'SHIB' },
  { name: 'Meme Token', symbol: 'MEME' },
  { name: 'Chad Coin', symbol: 'CHAD' },
  { name: 'Moon Token', symbol: 'MOON' },
  { name: 'Rocket Fuel', symbol: 'FUEL' },
  { name: 'Diamond Hands', symbol: 'DIAM' },
  { name: 'Ape Together', symbol: 'APE' },
  { name: 'Hodl Coin', symbol: 'HODL' },
  { name: 'Lambo Token', symbol: 'LAMBO' },
  { name: 'To The Moon', symbol: 'TTM' },
  { name: 'Degen Token', symbol: 'DEGEN' },
  { name: 'Gigachad', symbol: 'GIGA' },
  { name: 'Wojak Coin', symbol: 'WOJAK' },
  { name: 'Based Token', symbol: 'BASED' },
  { name: 'Fren Coin', symbol: 'FREN' },
]

function generateAddress(): string {
  const chars = '0123456789abcdef'
  let address = '0x'
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)]
  }
  return address
}

function generateChart(): number[] {
  const points = 50
  const chart: number[] = []
  let value = 50 + Math.random() * 50
  
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.48) * 10
    value = Math.max(10, Math.min(100, value))
    chart.push(value)
  }
  
  return chart
}

export function generateMockTokens(count: number = 60): Token[] {
  const tokens: Token[] = []
  const statuses: TokenStatus[] = ['new', 'final_stretch', 'migrated']
  
  for (let i = 0; i < count; i++) {
    const tokenData = tokenNames[i % tokenNames.length]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const price = Math.random() * 10
    
    tokens.push({
      id: `token-${i}`,
      name: `${tokenData.name} ${i > tokenNames.length - 1 ? Math.floor(i / tokenNames.length) : ''}`.trim(),
      symbol: `${tokenData.symbol}${i > tokenNames.length - 1 ? Math.floor(i / tokenNames.length) : ''}`,
      address: generateAddress(),
      price,
      priceChange24h: (Math.random() - 0.5) * 100,
      volume24h: Math.random() * 10000000,
      marketCap: Math.random() * 100000000,
      liquidity: Math.random() * 5000000,
      holders: Math.floor(Math.random() * 50000),
      createdAt: Date.now() - Math.random() * 86400000 * 30,
      status,
      trending: Math.random() > 0.7,
      verified: Math.random() > 0.5,
      chart: generateChart(),
    })
  }
  
  return tokens
}

export const mockTokens = generateMockTokens()

