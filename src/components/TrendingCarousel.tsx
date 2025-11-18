import { useNavigate } from 'react-router-dom';

interface TrendingToken {
  id: string;
  symbol: string;
  contractAddress: string;
  status: 'SOLD' | 'BOUGHT' | 'LAUNCHED';
  imageUrl: string;
  price: number;
}

const TrendingCarousel = () => {

  const navigate = useNavigate();

  // Mock trending tokens based on the attachment image
  const trendingTokens: TrendingToken[] = [
    { id: '1', symbol: 'PEPE', contractAddress: '0xaa0355359b71eb560c1c04683d42fc6eb13ec046', status: 'SOLD', imageUrl: '/imgs/nad1.jpg', price: 2.3 },
    { id: '2', symbol: 'FROG', contractAddress: '0xbb0355359b71eb560c1c04683d42fc6eb13ec046', status: 'LAUNCHED', imageUrl: '/imgs/nad2.jpg', price: 1.2 },
    { id: '3', symbol: 'MONKEY', contractAddress: '0xcc0355359b71eb560c1c04683d42fc6eb13ec046', status: 'SOLD', imageUrl: '/imgs/nad3.jpg', price: 4.5 },
    { id: '4', symbol: 'CAT', contractAddress: '0xdd0355359b71eb560c1c04683d42fc6eb13ec046', status: 'SOLD', imageUrl: '/imgs/nad4.jpg', price: 2.1 },
    { id: '5', symbol: 'MUFFIN', contractAddress: '0xee0355359b71eb560c1c04683d42fc6eb13ec046', status: 'SOLD', imageUrl: '/imgs/nad5.jpg', price: 3.8 },
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
                    className={`text-xs px-6 py-0.5 rounded-lg font-bold whitespace-nowrap ${token.status === 'SOLD'
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
                  className="text-xs font-semibold text-white"
                >
                  {token.price.toFixed(2)}MON
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