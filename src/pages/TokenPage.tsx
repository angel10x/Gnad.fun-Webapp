import TradingViewChart from '@/components/TradingViewChart';
import Banner from '@/components/TokenDetail/Banner';
import Transactions from '@/components/TokenDetail/Transactions';
import BondingPanel from '@/components/TokenDetail/BondingPanel';
import HoldersPanel from '@/components/TokenDetail/HoldersPanel';
import Header from '@/components/Header';
import TrendingCarousel from '@/components/TrendingCarousel';

export default function TokenPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Header />
            <TrendingCarousel />
            <div className="flex-1 relative overflow-hidden">
                {/* Background pattern/grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9a]/5 via-transparent to-[#ff4d4d]/5 pointer-events-none" />
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
            `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
            <div className="py-6 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex gap-6">

                        {/* CENTER */}
                        <div className="flex-1">
                            <div className="space-y-6">
                                <Banner />

                                <div className="bg-[#111] rounded-[12px] shadow-sm p-3">
                                    <TradingViewChart />
                                </div>
                                <Transactions />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="w-80">
                            <div className="space-y-4 sticky top-6">
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
