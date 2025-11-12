'use client';

import { useState } from 'react';
import { TokenCard } from '../components/TokenCard';
import { CreateTokenDialog } from '../components/CreateTokenDialog';
import { Button } from '../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Rocket, TrendingUp, Clock, Flame, Twitter, Youtube, Send, ChartArea, Wallet, Search } from 'lucide-react';

interface Token {
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
}

const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Moon Doge',
    symbol: 'MDOGE',
    description: 'To the moon! 🚀 The next generation of dog coins.',
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop',
    creator: '0x742d...a3f1',
    marketCap: 1250000,
    price: 0.000125,
    priceChange24h: 145.3,
    volume24h: 450000,
    holders: 1243,
    createdAt: new Date('2024-11-10T14:23:00'),
    chartData: [
      { time: '00:00', price: 0.00005 },
      { time: '04:00', price: 0.00007 },
      { time: '08:00', price: 0.00009 },
      { time: '12:00', price: 0.00011 },
      { time: '16:00', price: 0.000125 },
    ],
  },
  {
    id: '2',
    name: 'Pepe Rocket',
    symbol: 'PRKT',
    description: 'Rare pepe going vertical 📈',
    imageUrl:
      'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=200&h=200&fit=crop',
    creator: '0x891b...c4e2',
    marketCap: 890000,
    price: 0.00089,
    priceChange24h: 89.7,
    volume24h: 320000,
    holders: 856,
    createdAt: new Date('2024-11-10T16:45:00'),
    chartData: [
      { time: '00:00', price: 0.00047 },
      { time: '04:00', price: 0.00052 },
      { time: '08:00', price: 0.00068 },
      { time: '12:00', price: 0.00079 },
      { time: '16:00', price: 0.00089 },
    ],
  },
  {
    id: '3',
    name: 'Shiba Moon',
    symbol: 'SHIB2',
    description: 'The OG is back with a vengeance 🐕',
    imageUrl:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
    creator: '0x123c...d9a4',
    marketCap: 2100000,
    price: 0.0021,
    priceChange24h: 67.2,
    volume24h: 780000,
    holders: 2341,
    createdAt: new Date('2024-11-09T09:12:00'),
    chartData: [
      { time: '00:00', price: 0.00126 },
      { time: '04:00', price: 0.00145 },
      { time: '08:00', price: 0.00172 },
      { time: '12:00', price: 0.00193 },
      { time: '16:00', price: 0.0021 },
    ],
  },
  {
    id: '4',
    name: 'SafeMoon V3',
    symbol: 'SAFEV3',
    description: "This time it's actually safe, trust me bro 🔒",
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    creator: '0x456d...e8b3',
    marketCap: 560000,
    price: 0.00056,
    priceChange24h: -12.4,
    volume24h: 180000,
    holders: 634,
    createdAt: new Date('2024-11-11T08:30:00'),
    chartData: [
      { time: '00:00', price: 0.00064 },
      { time: '04:00', price: 0.00061 },
      { time: '08:00', price: 0.00059 },
      { time: '12:00', price: 0.00057 },
      { time: '16:00', price: 0.00056 },
    ],
  },
  {
    id: '5',
    name: 'Bonk Inu',
    symbol: 'BONK',
    description: "Bonk! Just bonk. That's it. 🏏",
    imageUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
    creator: '0x789e...f2c5',
    marketCap: 3400000,
    price: 0.0034,
    priceChange24h: 234.8,
    volume24h: 1200000,
    holders: 4521,
    createdAt: new Date('2024-11-08T12:00:00'),
    chartData: [
      { time: '00:00', price: 0.00102 },
      { time: '04:00', price: 0.00156 },
      { time: '08:00', price: 0.00234 },
      { time: '12:00', price: 0.00289 },
      { time: '16:00', price: 0.0034 },
    ],
  },
];

export default function App() {
  const [tokens, setTokens] = useState<Token[]>(mockTokens);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateToken = (
    tokenData: Omit<
      Token,
      | 'id'
      | 'createdAt'
      | 'chartData'
      | 'marketCap'
      | 'volume24h'
      | 'holders'
    >
  ) => {
    const newToken: Token = {
      ...tokenData,
      id: Date.now().toString(),
      createdAt: new Date(),
      marketCap: 0,
      volume24h: 0,
      holders: 1,
      chartData: [
        { time: '00:00', price: tokenData.price },
        { time: '04:00', price: tokenData.price },
        { time: '08:00', price: tokenData.price },
        { time: '12:00', price: tokenData.price },
        { time: '16:00', price: tokenData.price },
      ],
    };
    setTokens([newToken, ...tokens]);
    setIsCreateDialogOpen(false);
  };

  const trendingTokens = [...tokens].sort(
    (a, b) => b.priceChange24h - a.priceChange24h
  );
  const recentTokens = [...tokens].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="monadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M 50 15 L 75 35 L 75 65 L 50 85 L 25 65 L 25 35 Z" fill="none" stroke="url(#monadGrad)" strokeWidth="5" />
                <path d="M 50 30 L 65 42 L 65 58 L 50 70 L 35 58 L 35 42 Z" fill="url(#monadGrad)" opacity="0.3" />
                <circle cx="50" cy="45" r="4" fill="#a855f7" />
                <path d="M 35 48 L 50 58 L 65 48" stroke="url(#monadGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                GNAD.FUN
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                >
                  <Twitter className="size-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                >
                  <Youtube className="size-4" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                >
                  <Send className="size-4" />
                </a>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
          >
            Launch Token
          </Button>
          {/* <img 
            src="/imgs/gnad.png" 
            alt="" 
            className="mx-auto w-full max-w-4xl rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] border-4 border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_80px_rgba(236,72,153,0.6)] hover:scale-[1.02] bg-white/5 backdrop-blur-sm"
          /> */}
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Flame className="size-6 text-purple-400" />
              </div>
              <div>
                <div className="text-white/50 text-sm">Total Volume</div>
                <div className="text-white">$2.93M</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Rocket className="size-6 text-pink-400" />
              </div>
              <div>
                <div className="text-white/50 text-sm">Tokens Launched</div>
                <div className="text-white">{tokens.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="size-6 text-blue-400" />
              </div>
              <div>
                <div className="text-white/50 text-sm">Active Traders</div>
                <div className="text-white">9,566</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Tabs for different views */}
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-purple-500/20 text-white"
              >
                <Flame className="size-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="marketcap"
                className="data-[state=active]:bg-purple-500/20"
              >
                <ChartArea className="size-4 mr-2" />
                Top MC
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-purple-500/20"
              >
                <Clock className="size-4 mr-2" />
                Recent
              </TabsTrigger>
            </TabsList>
            <div className="">

            </div>
          </div>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTokens.map((token) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTokens.map((token) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Token Dialog */}
      <CreateTokenDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateToken={handleCreateToken}
      />
    </div>
  );
}
