import TradingViewChart from '@/components/TradingViewChart';
import Banner from '@/components/TokenDetail/Banner';
import Transactions from '@/components/TokenDetail/Transactions';
import BondingPanel from '@/components/TokenDetail/BondingPanel';
import HoldersPanel from '@/components/TokenDetail/HoldersPanel';
import Header from '@/components/Header';
import TrendingCarousel from '@/components/TrendingCarousel';

export default function TokenPage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Header />
            <TrendingCarousel />
            <div className="md:py-6 relative z-10">
                <div className="container mx-auto px-2 sm:px-4">
                    <div className="flex flex-row md:flex-row gap-4 md:gap-6">

                        {/* CENTER */}
                        <div className="border border-purple-900" style={{flex: "2"}}>
                            <div className="space-y-4 md:space-y-6">
                                <Banner />

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

