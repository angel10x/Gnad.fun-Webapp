import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { Token } from "../types/token";

interface TokenCardProps {
  token: Token;
}

export function TokenCard({ token }: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0;
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) {
      return `$${price.toFixed(8)}`;
    }
    return `$${price.toFixed(6)}`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg overflow-hidden hover:bg-white/10 transition-all hover:scale-105 cursor-pointer">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={token.imageUrl} 
            alt={token.name}
            className="size-16 rounded-full object-cover border-2 border-white/20"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white truncate">{token.name}</h3>
              <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                ${token.symbol}
              </Badge>
            </div>
            <p className="text-white/50 text-sm line-clamp-2">{token.description}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-20 mb-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={token.chartData}>
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Price Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm">Price</span>
            <span className="text-white">{formatPrice(token.price)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm">24h Change</span>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
              <span>{isPositive ? '+' : ''}{token.priceChange24h.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="size-4 text-white/50" />
              <span className="text-white/50 text-xs">Market Cap</span>
            </div>
            <div className="text-white text-sm">{formatNumber(token.marketCap)}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="size-4 text-white/50" />
              <span className="text-white/50 text-xs">Holders</span>
            </div>
            <div className="text-white text-sm">{token.holders.toLocaleString()}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="text-white/50 text-xs">
            by {token.creator}
          </div>
          <div className="text-white/50 text-xs">
            {getTimeAgo(token.createdAt)}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Trade Now
        </Button>
      </div>
    </Card>
  );
}