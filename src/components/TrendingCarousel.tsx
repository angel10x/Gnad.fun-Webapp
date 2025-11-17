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

  // Mock trending tokens based on the attachment image
  const trendingTokens: TrendingToken[] = [
    { id: '1', symbol: 'PEPE', status: 'SOLD', imageUrl: '/imgs/nad1.jpg', marketCap: 1000, priceChange24h: 2.3 },
    { id: '2', symbol: 'FROG', status: 'LAUNCHED', imageUrl: '/imgs/nad2.jpg', marketCap: 2500, priceChange24h: -1.2 },
    { id: '3', symbol: 'MONKEY', status: 'SOLD', imageUrl: '/imgs/nad3.jpg', marketCap: 1800, priceChange24h: 4.5 },
    { id: '4', symbol: 'CAT', status: 'SOLD', imageUrl: '/imgs/nad4.jpg', marketCap: 3200, priceChange24h: -2.1 },
    { id: '5', symbol: 'MUFFIN', status: 'SOLD', imageUrl: '/imgs/nad5.jpg', marketCap: 1500, priceChange24h: 3.8 },
    { id: '6', symbol: 'DOG', status: 'SOLD', imageUrl: '/imgs/nad6.jpg', marketCap: 2100, priceChange24h: -0.5 },
  ];

  // Duplicate tokens for seamless looping
  const displayTokens = [...trendingTokens, ...trendingTokens, ...trendingTokens];

  return (
    <div className="bg-[#0a0a0a] border-b border-white/10 py-3 overflow-hidden ">
      <div className="container mx-auto px-4">
        <div
          className="carousel-container flex gap-4 overflow-x-hidden"
        >
          {displayTokens.map((token, index) => (
            <div
  key={`${token.id}-${index}`}
  data-carousel-item
  className="flex items-center gap-3 px-4 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-w-[180px]"
  onClick={() => navigate(`/token/${token.id}`)}
>
  <img
    src={token.imageUrl}
    alt={token.symbol}
    className="w-8 h-8 rounded-full"
  />

  {/* RIGHT SIDE */}
  <div className="flex flex-col gap-1 w-full">
    <div className="flex items-center w-full">
      <span className="text-white font-semibold text-sm">{token.symbol}</span>

      <span
        className={`text-xs px-6 py-0.5 rounded-lg font-bold whitespace-nowrap ${
          token.status === 'SOLD'
            ? 'bg-red-500/20 text-red-400'
            : token.status === 'LAUNCHED'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-yellow-500/20 text-yellow-400'
        }`}
      >
        {token.status}
      </span>
    </div>

    <span
      className={`text-xs font-semibold ${
        token.priceChange24h >= 0 ? 'text-[#00ff9a]' : 'text-[#ff4d4d]'
      }`}
    >
      {token.priceChange24h >= 0 ? '+' : ''}
      {token.priceChange24h.toFixed(2)}%
    </span>
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;