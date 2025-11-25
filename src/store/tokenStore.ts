import { useCallback, useState } from "react";
import type { Token } from "../types/token";

export const defaultTokens: Token[] = [
  {
    id: "1",
    name: "Doge King",
    symbol: "DOGEKING",
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
    name: "MooGra",
    symbol: " MGRA",
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
    name: "Anger",
    symbol: "ANGER",
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
    name: "CZ",
    symbol: "CZ",
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
  {
    id: "6",
    name: "Lucy",
    symbol: "LUCY",
    contractAddress: "0xff0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Lets smile!",
    imageUrl:
      "/imgs/nad6.jpg",
    creator: "0x783e...f2c5",
    marketCap: 34000,
    price: 0.064,
    priceChange24h: 534.8,
    volume24h: 132000,
    holders: 41,
    createdAt: new Date("2024-12-08T12:00:00"),
    chartData: [
      { time: "00:00", price: 0.00102 },
      { time: "04:00", price: 0.00156 },
      { time: "08:00", price: 0.00234 },
      { time: "12:00", price: 0.00289 },
      { time: "16:00", price: 0.0034 },
    ],
  },
  {
    id: "7",
    name: "KNad",
    symbol: "KDAD",
    contractAddress: "0xgg0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Go Monad with me!",
    imageUrl:
      "/imgs/nad7.jpg",
    creator: "0x783e...f2c5",
    marketCap: 340040,
    price: 0.0654,
    priceChange24h: 5343.8,
    volume24h: 1322000,
    holders: 441,
    createdAt: new Date("2024-2-08T12:00:00"),
    chartData: [
      { time: "00:00", price: 0.00102 },
      { time: "04:00", price: 0.00156 },
      { time: "08:00", price: 0.00234 },
      { time: "12:00", price: 0.00289 },
      { time: "16:00", price: 0.0034 },
    ],
  },
  {
    id: "8",
    name: "Momoko",
    symbol: "MMK",
    contractAddress: "0xhh0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Come here to monad!",
    imageUrl:
      "/imgs/nad8.png",
    creator: "0x78554...f2c5",
    marketCap: 3740040,
    price: 0.06534,
    priceChange24h: 53443.8,
    volume24h: 13232000,
    holders: 9441,
    createdAt: new Date("2024-2-05T12:00:00"),
    chartData: [
      { time: "00:00", price: 0.00102 },
      { time: "04:00", price: 0.00156 },
      { time: "08:00", price: 0.00234 },
      { time: "12:00", price: 0.00289 },
      { time: "16:00", price: 0.0034 },
    ],
  },
    {
    id: "9",
    name: "Momoko",
    symbol: "MMK",
    contractAddress: "0xii0355359b71eb560c1c04683d42fc6eb13ec046",
    description: "Call the moand when u are difficult!",
    imageUrl:
      "/imgs/nad9.png",
    creator: "0x78554...f2c5",
    marketCap: 37404040,
    price: 0.065534,
    priceChange24h: 353443.8,
    volume24h: 613232000,
    holders: 94541,
    createdAt: new Date("2024-2-15T12:00:00"),
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

