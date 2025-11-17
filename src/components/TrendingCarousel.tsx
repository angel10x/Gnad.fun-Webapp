import { sampleToken } from '@/utils/mockTokenData';
import { useNavigate } from 'react-router-dom';

interface TrendingToken {
  id: string;
  symbol: string;
  status: 'SOLD' | 'LAUNCHED' | 'LIVE';
  imageUrl: string;
  marketCap: number;
  priceChange24h: number;
}

const TrendingCarousel = () => {

  const navigate = useNavigate();

  // const animationStyles = `
  //   @keyframes carousel-scroll {
  //     0% {
  //       transform: translateX(-100%);
  //     }
  //     100% {
  //       display: flex;
  //       transform: translateX(-33.333%));
  //       will-change: transform;
  //     }
  //   }
  //   .carousel-container {
  //     animation: carousel-scroll 30s linear infinite;
  //   }
  //   .carousel-container:hover {
  //     animation-play-state: paused;
  //   }
  // `;

  // Mock trending tokens based on the attachment image
  const trendingTokens: TrendingToken[] = [
    { id: '1', symbol: 'PEPE', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1000, priceChange24h: 2.3 },
    { id: '2', symbol: 'FROG', status: 'LAUNCHED', imageUrl: sampleToken.imageUrl, marketCap: 2500, priceChange24h: -1.2 },
    { id: '3', symbol: 'MONKEY', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1800, priceChange24h: 4.5 },
    { id: '4', symbol: 'CAT', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 3200, priceChange24h: -2.1 },
    { id: '5', symbol: 'MUFFIN', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 1500, priceChange24h: 3.8 },
    { id: '6', symbol: 'DOG', status: 'SOLD', imageUrl: sampleToken.imageUrl, marketCap: 2100, priceChange24h: -0.5 },
  ];

  // Duplicate tokens for seamless looping
  const displayTokens = [...trendingTokens, ...trendingTokens, ...trendingTokens];

  return (
    <div className="bg-[#0a0a0a] border-b border-white/10 py-3 overflow-hidden ">
      {/* <style>{animationStyles}</style> */}
      {/* <div className='carousel-scroll carousel-container '></div> */}
      <div className="container mx-auto px-4">
        <div
          className="carousel-container flex gap-4 overflow-x-hidden"
        >
          {displayTokens.map((token, index) => (
            <div
              key={`${token.id}-${index}`}
              data-carousel-item
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer min-w-fit"
              onClick={() => navigate(`/token/${token.id}`)}
            >
              <img
                src={token.imageUrl}
                alt={token.symbol}
                className="flex size-8 rounded-full"
              />
              {/* <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">{token.symbol}</span>
              {token.status && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-lg font-bold ${token.status === 'SOLD'
                    ? 'bg-red-500/20 text-red-400'
                    : token.status === 'LAUNCHED'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                >
                  {token.status}
                </span>
              )}
            </div> */}
              {/* <span className="text-white/60 text-xs">${token.marketCap?.toLocaleString() || '0'}K</span> */}
              {/* <span
                className={`text-xs font-semibold ${
                  token.priceChange24h >= 0 ? 'text-[#00ff9a]' : 'text-[#ff4d4d]'
                }`}
              >
                {token.priceChange24h >= 0 ? '+' : ''}
                {token.priceChange24h.toFixed(2)}%
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;