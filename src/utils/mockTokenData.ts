import { UTCTimestamp } from 'lightweight-charts';

export const sampleToken = {
  id: 'baby-pepe',
  name: 'Pepe (BabyPepe)',
  symbol: 'BabyPepe',
  imageUrl: '/public/imgs/pepe.png',
  creator: '0xd2f0...d652',
  createdAt: Date.now() - 1000 * 60 * 60 * 24 * 365,
  description: 'Disclaimer: The tokens listed are not associated with this platform. Engage with them at your own discretion.',
  holders: 2,
  price: 0.00778,
  marketCap: 7297.94,
  volume24h: 0,
  priceChange24h: 0,
};

export type TX = { id: number; time: string; type: 'Buy' | 'Sell'; usd: number; tokens: string; bnb: number; address: string; tx: string };

export const mockTransactions: TX[] = [
  { id: 1, time: '17 days ago', type: 'Buy', usd: 18.4, tokens: '2.1M', bnb: 0.01621, address: '0x671...39a', tx: '0xabc' },
  { id: 2, time: '1 year ago', type: 'Sell', usd: 2.08, tokens: '467.6K', bnb: 0.00366, address: '0x20b...c4e', tx: '0xdef' },
  { id: 3, time: '1 year ago', type: 'Sell', usd: 9.81, tokens: '2.1M', bnb: 0.01641, address: '0x0d5...169', tx: '0xghi' },
  { id: 4, time: '1 year ago', type: 'Buy', usd: 13.99, tokens: '3M', bnb: 0.02328, address: '0xa90...561', tx: '0xjkl' },
  { id: 5, time: '1 year ago', type: 'Sell', usd: 4.11, tokens: '864.8K', bnb: 0.00684, address: '0xf8f...1c0', tx: '0xmno' },
  { id: 6, time: '1 year ago', type: 'Sell', usd: 4.72, tokens: '988.2K', bnb: 0.00783, address: '0xcda...cca', tx: '0xpqr' },
];

export const mockHolders = [
  { address: '0x8341...6451', percentage: 99.8 },
  { address: '0x527c...e088', percentage: 0.2 },
];

export const bondingCurveData = {
  progressPercent: 0.25,
  tokenLeft: '798M',
  bnbCollected: 0.0159,
  bnbLeft: 30.9841,
};

export function generateMockOHLCV(points = 120) {
  const out: Array<{ time: UTCTimestamp; open: number; high: number; low: number; close: number; volume: number }> = [];
  let price = 0.00778;
  const now = Math.floor(Date.now() / 1000);
  for (let i = points - 1; i >= 0; i--) {
    const time = (now - i * 60 * 60) as UTCTimestamp;
    const change = (Math.random() - 0.5) * 0.0005;
    const open = price;
    const close = +(price + change).toFixed(6);
    const high = Math.max(open, close) + Math.random() * 0.0003;
    const low = Math.min(open, close) - Math.random() * 0.0003;
    const volume = Math.round(Math.random() * 500 + 10);
    out.push({ time, open, high: +high.toFixed(6), low: +low.toFixed(6), close, volume });
    price = close;
  }
  return out;
}
