import { useCallback, useState } from "react";
import type { Token } from "../types/token";

export const defaultTokens: Token[] = [
  {
    id: "1",
    name: "Pepe Doge",
    symbol: "PEPE",
    contractAddress: "0xaa0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "To the moon! 🚀 The next generation of dog coins.",
    imageUrl:
      "/imgs/nad1.jpg",
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
    name: "Frog",
    symbol: " FROG",
    contractAddress: "0xbb0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Rare pepe going vertical 📈",
    imageUrl:
      "/imgs/nad2.jpg",
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
    name: "Monkey",
    symbol: "MONKEY",
    contractAddress: "0xcc0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "The OG is back with a vengeance 🐕",
    imageUrl:
      "/imgs/nad3.jpg",
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
    name: "Cat",
    symbol: "CAT",
    contractAddress: "0xdd0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "This time it's actually safe, trust me bro 🔒",
    imageUrl:
      "/imgs/nad4.jpg",
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
    name: "Muffin",
    symbol: "MUFFIN",
    contractAddress: "0xee0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Bonk! Just bonk. That's it. 🏏",
    imageUrl:
      "/imgs/nad5.jpg",
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

