export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  creator: string;
  marketCap: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  holders: number;
  createdAt: Date;
  chartData: { time: string; price: number }[];
  twitter?: string;
  telegram?: string;
  website?: string;
}

