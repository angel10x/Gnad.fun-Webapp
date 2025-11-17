import { UTCTimestamp } from 'lightweight-charts';

export const sampleToken = {
  id: 'baby-pepe',
  name: 'Pepe',
  symbol: 'Pepe',
  imageUrl: '/public/imgs/muffin.jpg',
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
  { address: 'Liquidity pool', percentage: 30.91, isLiquidityPool: true },
  { address: 'Ccnu...Yz44', percentage: 29.10 },
  { address: '2xKB...tuG5', percentage: 3.47 },
  { address: 'Ds8c...nmxv', percentage: 2.98 },
  { address: '7jMM...ZaPN', percentage: 2.77 },
  { address: '5QYB...TZpe', percentage: 2.60 },
  { address: 'Dire...uXVE', percentage: 2.21 },
  { address: '6xwi...E6dr', percentage: 2.14 },
  { address: '3QdY...7A88', percentage: 1.78 },
  { address: 'A6cc...fWyc', percentage: 1.63 },
  { address: '71NQ...21U8', percentage: 1.38 },
  { address: '47Ka...PR86', percentage: 1.27 },
  { address: 'EGy_..VWrc', percentage: 1.20 },
  { address: 'Gsm1...3IQR', percentage: 0.84 },
  { address: '3VRS...aTS5', percentage: 0.76 },
  { address: 'Eytg...aTeL', percentage: 0.75 },
  { address: '6tJ1...pZHZ', percentage: 0.75 },
  { address: 'GCQk...GDCA', percentage: 0.72 },
  { address: '49nF...4wX7', percentage: 0.70 },
  { address: '7C7f...Ssiq', percentage: 0.68 },
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
