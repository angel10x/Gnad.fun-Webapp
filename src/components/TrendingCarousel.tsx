import { useEffect, useRef } from 'react';
import { sampleToken } from '@/utils/mockTokenData';

interface TrendingToken {
  id: string;
  symbol: string;
  status: 'SOLD' | 'LAUNCHED' | 'LIVE';
  imageUrl: string;
  marketCap: number;
  priceChange24h: number;
}

const TrendingCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mock trending tokens based on the attachment image
  const trendingTokens: TrendingToken[] = [
    { id: '1', symbol: 'OxfL_De', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1000, priceChange24h: 2.3 },
    { id: '2', symbol: '0x5d_tds', status: 'LAUNCHED', imageUrl: sampleToken.imageUrl, marketCap: 2500, priceChange24h: -1.2 },
    { id: '3', symbol: '0xfb__cd', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1800, priceChange24h: 4.5 },
    { id: '4', symbol: 'OxXd_Drl', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 3200, priceChange24h: -2.1 },
    { id: '5', symbol: 'OxcL_fse', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1500, priceChange24h: 3.8 },
    { id: '6', symbol: '0xAd_jed', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 2100, priceChange24h: -0.5 },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      container.scrollLeft = scrollPosition;

      // Loop back to start when reaching end
      if (scrollPosition > container.scrollWidth - container.clientWidth) {
        scrollPosition = 0;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate tokens for seamless looping
  const displayTokens = [...trendingTokens, ...trendingTokens, ...trendingTokens];

  return (
    <div className="bg-[#0a0a0a] border-b border-white/10 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayTokens.map((token, index) => (
            <div
              key={`${token.id}-${index}`}
              data-carousel-item
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer min-w-fit"
            >
              <img
                src={token.imageUrl}
                alt={token.symbol}
                className="w-6 h-6 rounded-full"
              />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">{token.symbol}</span>
                {token.status && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      token.status === 'SOLD'
                        ? 'bg-red-500/20 text-red-400'
                        : token.status === 'LAUNCHED'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {token.status}
                  </span>
                )}
              </div>
              <span className="text-white/60 text-xs">${token.marketCap?.toLocaleString() || '0'}K</span>
              <span
                className={`text-xs font-semibold ${
                  token.priceChange24h >= 0 ? 'text-[#00ff9a]' : 'text-[#ff4d4d]'
                }`}
              >
                {token.priceChange24h >= 0 ? '+' : ''}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
