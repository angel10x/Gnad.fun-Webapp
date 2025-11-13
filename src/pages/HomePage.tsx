'use client';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenCard } from '../components/TokenCard';
import { WalletDropdown } from '../components/WalletConnect/WalletDropdown';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useWallet } from '../hooks/useWallet';
import { useTokenStore } from '../store/tokenStore';
import { sortTokensByTrending, sortTokensByMarketCap, sortTokensByRecent } from '../utils/tokenSorting';
import { SOCIAL_LINKS } from '../constants/socialLinks';
import { Clock, Flame, ChartArea } from 'lucide-react';

export default function HomePage() {
  const { tokens } = useTokenStore();
  const navigate = useNavigate();
  const {
    account,
    connectWallet,
  } = useWallet();

  const handleLaunchTokenClick = useCallback(() => {
    if (account) {
      navigate('/launch-token');
      return;
    }

    void connectWallet();
  }, [account, connectWallet, navigate]);

  const trendingTokens = sortTokensByTrending(tokens);
  const topmarketcapTokens = sortTokensByMarketCap(tokens);
  const recentTokens = sortTokensByRecent(tokens);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
              <WalletDropdown />
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
          <TabsList className="bg-white/5 border border-white/10 mb-8">
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
    </div>
  );
}
