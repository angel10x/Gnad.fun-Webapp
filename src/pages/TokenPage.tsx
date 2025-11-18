import TradingViewChart from '@/components/TradingViewChart';
import Banner from '@/components/TokenDetail/Banner';
import Transactions from '@/components/TokenDetail/Transactions';
import BondingPanel from '@/components/TokenDetail/BondingPanel';
import HoldersPanel from '@/components/TokenDetail/HoldersPanel';
import Header from '@/components/Header';
import TrendingCarousel from '@/components/TrendingCarousel';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Token } from '@/types/token';
import { useTokenStore } from '@/store/tokenStore';

// const allTokens: Record<string, Partial<Token>> = {
//   '1': { id: '1', name: 'OxfL_De', symbol: 'OxfL_De', imageUrl: sampleToken.imageUrl, marketCap: 1000, priceChange24h: 2.3, creator: sampleToken.creator, description: sampleToken.description },
//   '2': { id: '2', name: '0x5d_tds', symbol: '0x5d_tds', imageUrl: sampleToken.imageUrl, marketCap: 2500, priceChange24h: -1.2, creator: sampleToken.creator, description: sampleToken.description },
//   '3': { id: '3', name: '0xfb__cd', symbol: '0xfb__cd', imageUrl: sampleToken.imageUrl, marketCap: 1800, priceChange24h: 4.5, creator: sampleToken.creator, description: sampleToken.description },
//   '4': { id: '4', name: 'OxXd_Drl', symbol: 'OxXd_Drl', imageUrl: sampleToken.imageUrl, marketCap: 3200, priceChange24h: -2.1, creator: sampleToken.creator, description: sampleToken.description },
//   '5': { id: '5', name: 'OxcL_fse', symbol: 'OxcL_fse', imageUrl: sampleToken.imageUrl, marketCap: 1500, priceChange24h: 3.8, creator: sampleToken.creator, description: sampleToken.description },
//   '6': { id: '6', name: '0xAd_jed', symbol: '0xAd_jed', imageUrl: sampleToken.imageUrl, marketCap: 2100, priceChange24h: -0.5, creator: sampleToken.creator, description: sampleToken.description },
// };

export default function TokenPage() {
  const { tokens } = useTokenStore();
  console.log('TokenPage tokens:', tokens);
  const { contractAddress } = useParams<{ contractAddress: string }>();
  console.log('TokenPage contractAddress:', contractAddress);
  
  const [token, setToken] = useState<Partial<Token> | undefined>(undefined);
  console.log(token);

  useEffect(() => {
    if (contractAddress) {
      const foundToken = tokens.find(
        (t) => t.contractAddress.toLowerCase() === contractAddress.toLowerCase()
      );
      setToken(foundToken);
    } else {
      setToken(undefined);
    }
  }, [contractAddress, tokens]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Header />
            <TrendingCarousel />
            <div className="md:py-6 relative z-10">
                <div className="container mx-auto px-2 sm:px-4">
                    <div className="flex flex-row md:flex-row gap-4 md:gap-6">

                        {/* CENTER */}
                        <div className="border border-white/70 " style={{flex: "2"}}>
                            <div className="space-y-4 md:space-y-6">
                                <Banner token={token as Token} />

                                <div className="bg-[#111] rounded-[12px] shadow-sm">
                                    <TradingViewChart />
                                </div>
                                <Transactions />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="" style={{flex: "1"}}>
                            <div className="space-y-4 md:sticky md:top-6">
                                <BondingPanel />
                                <HoldersPanel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

