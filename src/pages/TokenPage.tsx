import TradingViewChart from '@/components/TradingViewChart';
import Banner from '@/components/TokenDetail/Banner';
import BondingPanel from '@/components/TokenDetail/BondingPanel';
import HoldersPanel from '@/components/TokenDetail/HoldersPanel';
import Header from '@/components/Header';
import TrendingCarousel from '@/components/TrendingCarousel';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Token } from '@/types/token';
import { useTokenStore } from '@/store/tokenStore';
import ActivityTable from '@/components/TokenDetail/ActivityTable';
export default function TokenPage() {
  const { tokens } = useTokenStore();
  const { contractAddress } = useParams<{ contractAddress: string }>();
  
  const [token, setToken] = useState<Partial<Token> | undefined>(undefined);

  useEffect(() => {
    if (contractAddress) {
      const foundToken = tokens.find(
        (t) => t?.contractAddress?.toLowerCase() === contractAddress?.toLowerCase()
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
                                <ActivityTable />
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

