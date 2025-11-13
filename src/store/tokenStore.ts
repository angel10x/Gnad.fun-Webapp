import { useCallback, useState } from "react";
import type { Token } from "../types/token";

export const defaultTokens: Token[] = [
  {
    id: "1",
    name: "Moon Doge",
    symbol: "MDOGE",
    description: "To the moon! 🚀 The next generation of dog coins.",
    imageUrl:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop",
    creator: "0x742d...a3f1",
    marketCap: 1250000,
    price: 0.000125,
    priceChange24h: 145.3,
    volume24h: 450000,
    holders: 1243,
    createdAt: new Date("2024-11-10T14:23:00"),
    chartData: [
      { time: "00:00", price: 0.00005 },
      { time: "04:00", price: 0.00007 },
      { time: "08:00", price: 0.00009 },
      { time: "12:00", price: 0.00011 },
      { time: "16:00", price: 0.000125 },
    ],
  },
  {
    id: "2",
    name: "Pepe Rocket",
    symbol: "PRKT",
    description: "Rare pepe going vertical 📈",
    imageUrl:
      "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=200&h=200&fit=crop",
    creator: "0x891b...c4e2",
    marketCap: 890000,
    price: 0.00089,
    priceChange24h: 89.7,
    volume24h: 320000,
    holders: 856,
    createdAt: new Date("2024-11-10T16:45:00"),
    chartData: [
      { time: "00:00", price: 0.00047 },
      { time: "04:00", price: 0.00052 },
      { time: "08:00", price: 0.00068 },
      { time: "12:00", price: 0.00079 },
      { time: "16:00", price: 0.00089 },
    ],
  },
  {
    id: "3",
    name: "Shiba Moon",
    symbol: "SHIB2",
    description: "The OG is back with a vengeance 🐕",
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop",
    creator: "0x123c...d9a4",
    marketCap: 2100000,
    price: 0.0021,
    priceChange24h: 67.2,
    volume24h: 780000,
    holders: 2341,
    createdAt: new Date("2024-11-09T09:12:00"),
    chartData: [
      { time: "00:00", price: 0.00126 },
      { time: "04:00", price: 0.00145 },
      { time: "08:00", price: 0.00172 },
      { time: "12:00", price: 0.00193 },
      { time: "16:00", price: 0.0021 },
    ],
  },
  {
    id: "4",
    name: "SafeMoon V3",
    symbol: "SAFEV3",
    description: "This time it's actually safe, trust me bro 🔒",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    creator: "0x456d...e8b3",
    marketCap: 560000,
    price: 0.00056,
    priceChange24h: -12.4,
    volume24h: 180000,
    holders: 634,
    createdAt: new Date("2024-11-11T08:30:00"),
    chartData: [
      { time: "00:00", price: 0.00064 },
      { time: "04:00", price: 0.00061 },
      { time: "08:00", price: 0.00059 },
      { time: "12:00", price: 0.00057 },
      { time: "16:00", price: 0.00056 },
    ],
  },
  {
    id: "5",
    name: "Bonk Inu",
    symbol: "BONK",
    description: "Bonk! Just bonk. That's it. 🏏",
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
    creator: "0x789e...f2c5",
    marketCap: 3400000,
    price: 0.0034,
    priceChange24h: 234.8,
    volume24h: 1200000,
    holders: 4521,
    createdAt: new Date("2024-11-08T12:00:00"),
    chartData: [
      { time: "00:00", price: 0.00102 },
      { time: "04:00", price: 0.00156 },
      { time: "08:00", price: 0.00234 },
      { time: "12:00", price: 0.00289 },
      { time: "16:00", price: 0.0034 },
    ],
  },
];

function cloneTokens(tokens: Token[]): Token[] {
  return tokens.map((token) => ({
    ...token,
    chartData: token.chartData.map((point) => ({ ...point })),
  }));
}

export function useTokenStore(initialTokens: Token[] = defaultTokens) {
  const [tokens, setTokens] = useState<Token[]>(() => cloneTokens(initialTokens));

  const addToken = useCallback((token: Token) => {
    setTokens((previous) => [token, ...previous]);
  }, []);

  return { tokens, addToken, setTokens };
}

