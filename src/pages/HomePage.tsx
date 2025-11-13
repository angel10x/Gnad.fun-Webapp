'use client';

import { useState } from 'react';
import { TokenCard } from '../components/TokenCard';
import { CreateTokenDialog } from '../components/CreateTokenDialog';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useWallet } from '../hooks/useWallet';
import { useTokenStore } from '../store/tokenStore';
import type { Token } from '../types/token';
import { Clock, Flame, Twitter, Youtube, Send, ChartArea, Wallet } from 'lucide-react';

export default function HomePage() {
  const { tokens, addToken } = useTokenStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const {
    account,
    connectWallet,
    disconnectWallet: disconnect,
    formatAccount,
    isConnecting,
    walletError,
    resetWalletError,
  } = useWallet();

  const handleLaunchTokenClick = () => {
    resetWalletError();
    if (account) {
      setIsCreateDialogOpen(true);
      return;
    }

    setIsWalletDialogOpen(true);
  };

  const handleConnectAndLaunch = async () => {
    const connected = await connectWallet();
    if (connected) {
      setIsWalletDialogOpen(false);
      setIsCreateDialogOpen(true);
    }
  };

  const handleWalletDialogChange = (open: boolean) => {
    setIsWalletDialogOpen(open);
    if (!open) {
      resetWalletError();
    }
  };

  const handleWalletButtonClick = () => {
    resetWalletError();
    if (account) {
      setIsWalletDialogOpen(true);
      return;
    }
    void connectWallet();
  };

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
    addToken(newToken);
    setIsCreateDialogOpen(false);
  };

  const trendingTokens = [...tokens].sort(
    (a, b) => b.priceChange24h - a.priceChange24h
  );
  const topmarketcapTokens = [...tokens].sort(
    (a, b) => b.marketCap - a.marketCap
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
              <div className="flex flex-col items-end gap-2">
                <Button
                  onClick={handleWalletButtonClick}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
                >
                  <Wallet className="size-4 mr-2" />
                  {account ? formatAccount(account) : isConnecting ? 'Connecting…' : 'Connect Wallet'}
                </Button>
                {walletError && (
                  <span className="text-sm text-red-400">{walletError}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Button
            onClick={handleLaunchTokenClick}
            className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
          >
            Launch Token
          </Button>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-purple-500/20 text-white cursor-pointer"
              >
                <Flame className="size-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="marketcap"
                className="data-[state=active]:bg-purple-500/20 text-white cursor-pointer"
              >
                <ChartArea className="size-4 mr-2" />
                Top MC
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-purple-500/20 text-white cursor-pointer"
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

          <TabsContent value="marketcap">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topmarketcapTokens.map((token) => (
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
      <Dialog open={isWalletDialogOpen} onOpenChange={handleWalletDialogChange}>
        <DialogContent className="bg-black/90 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{account ? 'Switch Wallet' : 'Connect Wallet'}</DialogTitle>
            <DialogDescription className="text-white/70">
              {account
                ? `You are connected as ${formatAccount(account)}. Connect a different MetaMask account to continue.`
                : 'You need to connect your MetaMask wallet before launching a token.'}
            </DialogDescription>
          </DialogHeader>
          {walletError && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm rounded-md px-3 py-2">
              {walletError}
            </div>
          )}
          <DialogFooter>
            {account && (
              <Button
                onClick={disconnect}
                variant="outline"
                className="border-white/20 bg-transparent hover:bg-white/10 text-white"
              >
                Disconnect
              </Button>
            )}
            <Button
              onClick={handleConnectAndLaunch}
              disabled={isConnecting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
            >
              {isConnecting
                ? 'Connecting…'
                : account
                  ? 'Connect Different Account'
                  : 'Connect MetaMask'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
