import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTokenStore } from "../store/tokenStore";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { formatPrice, formatNumber, getTimeAgo } from "../utils/formatters";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import { createChart, CrosshairMode, IChartApi } from 'lightweight-charts';
import { useGlobalContext } from "@/context/GlobalContext";
import { WalletConnectButton } from "@/components/WalletConnect";

// Mock transaction data
const mockTransactions = [
    { id: 1, time: new Date(Date.now() - 5 * 60000), type: 'buy', usd: 1250, tokens: 5000000, bnb: 0.5, address: '0x8341...6451', txHash: '0xabc...123' },
    { id: 2, time: new Date(Date.now() - 15 * 60000), type: 'sell', usd: 890, tokens: 3500000, bnb: 0.35, address: '0x2dc...60ff', txHash: '0xdef...456' },
    { id: 3, time: new Date(Date.now() - 30 * 60000), type: 'buy', usd: 2100, tokens: 8000000, bnb: 0.85, address: '0x5f7...a92c', txHash: '0xghi...789' },
    { id: 4, time: new Date(Date.now() - 1 * 60 * 60000), type: 'buy', usd: 450, tokens: 1800000, bnb: 0.18, address: '0x1b2...d4e1', txHash: '0xjkl...012' },
];

// Mock holders data
const mockHolders = [
    { address: '0x8341...6451', percentage: 45.23, amount: 125000000 },
    { address: '0x2dc...60ff', percentage: 28.15, amount: 78000000 },
    { address: '0x5f7...a92c', percentage: 15.62, amount: 43000000 },
    { address: '0x1b2...d4e1', percentage: 7.85, amount: 21700000 },
    { address: '0x9e4...c5f3', percentage: 3.15, amount: 8700000 },
];

// Mock bonding curve data
const bondingCurveData = {
    currentProgress: 65,
    targetMarketCap: 50000,
    currentMarketCap: 32500,
    nextMilestone: 40000,
};

export default function TokenPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tokens } = useTokenStore();

    const token = tokens.find((t) => t.id === id);

    if (!token) {
        return (
            <div className="p-8">
                <Card className="p-6">
                    <h2 className="text-white">Token not found</h2>
                    <p className="text-white/60 mt-2">No token matches id: {id}</p>
                    <div className="mt-4">
                        <Button onClick={() => navigate(-1)}>Go back</Button>
                    </div>
                </Card>
            </div>
        );
    }
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [timeframe, setTimeframe] = useState<string>('1D');
    const { account } = useGlobalContext();

    // Trading panel state
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');
    const [showSettings, setShowSettings] = useState(false);
    const [slippage, setSlippage] = useState<number>(1);
    const [amount, setAmount] = useState<string>('');

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // clean up previous chart
        if (chartRef.current) {
            try { chartRef.current.remove(); } catch (e) { }
            chartRef.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 360,
            layout: { textColor: 'rgba(255,255,255,0.9)' },
            grid: { vertLines: { color: 'rgba(255,255,255,0.03)' }, horzLines: { color: 'rgba(255,255,255,0.03)' } },
            crosshair: { mode: CrosshairMode.Normal },
            rightPriceScale: { borderColor: 'rgba(255,255,255,0.06)' },
            timeScale: { borderColor: 'rgba(255,255,255,0.06)' },
        });

        // Prepare data points from token.chartData
        // token.chartData contains lightweight example points; create recent timestamps
        const now = Date.now();
        const points = token.chartData.map((p, i) => ({
            // lightweight-charts expects a time value (UTCTimestamp) — provide seconds since epoch
            time: Math.floor((now - (token.chartData.length - 1 - i) * 60 * 60 * 1000) / 1000),
            value: p.price,
        }));

        const series = chart.addAreaSeries({ topColor: 'rgba(16,185,129,0.15)', bottomColor: 'rgba(16,185,129,0.02)', lineColor: '#10b981', lineWidth: 2 });
        // cast to any to satisfy typing for this simplified example
        series.setData(points as any);

        chartRef.current = chart;

        const handleResize = () => {
            if (!chartContainerRef.current || !chartRef.current) return;
            chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            try { chart.remove(); } catch (e) { }
            chartRef.current = null;
        };
    }, [token, timeframe]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">

                {/* CENTER - Main Content */}
                <div className="flex-1 flex flex-col overflow-auto">
                    <div className="flex-1 flex flex-col p-6 space-y-6">
                        {/* Token Header */}
                        <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                            <img src={token.imageUrl} alt={token.name} className="w-14 h-14 rounded-full border-2 border-white/20" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-white text-2xl font-bold">{token.name}</h1>
                                    <span className="text-white/60 text-lg">({token.symbol})</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                    <Badge className="text-xs bg-blue-500/20 text-blue-400">Migrated</Badge>
                                    <Badge className="text-xs bg-green-500/20 text-green-400">{token.holders} Holders</Badge>
                                </div>
                                <p className="text-white/60 text-xs mb-1">{token.description}</p>
                                <div className="text-white/50 text-xs">by {token.creator}</div>
                            </div>
                        </div>

                        {/* Timeframe & Price */}
                        <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                            <div className="flex items-center gap-1">
                                {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}
                                        className={`text-xs px-3 py-1.5 rounded font-semibold transition-all ${timeframe === tf ? 'bg-green-500 text-white' : 'text-white/60 hover:text-white'}`}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                            <div className="text-right">
                                <div className="text-white/60 text-xs">Price</div>
                                <div className="text-white font-bold text-lg">{formatPrice(token.price)}</div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white/3 border border-white/10 rounded-lg p-4" style={{ height: '350px' }}>
                            <div ref={chartContainerRef} className="w-full h-full" />
                        </div>

                        {/* Transactions Table */}
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold text-sm">Transactions</h3>
                            <div className="overflow-x-auto border border-white/10 rounded-lg bg-white/3">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold">Time</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold">Type</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold text-right">USD</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold text-right">{token.symbol}</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold text-right">BNB</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold">Address</th>
                                            <th className="px-3 py-2.5 text-white/60 font-semibold">Txs</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {mockTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-3 py-2 text-white/80">{getTimeAgo(tx.time)}</td>
                                                <td className="px-3 py-2">
                                                    <span className={`font-bold ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {tx.type === 'buy' ? 'Buy' : 'Sell'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right text-white/80 font-semibold">${tx.usd.toLocaleString()}</td>
                                                <td className="px-3 py-2 text-right text-white/80">{(tx.tokens / 1000000).toFixed(2)}M</td>
                                                <td className="px-3 py-2 text-right text-white/80">{tx.bnb.toFixed(4)}</td>
                                                <td className="px-3 py-2 text-white/60 text-xs font-mono">{tx.address}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <a href="#" className="text-blue-400 hover:text-blue-300">↗</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR - Trading Panel */}
                <div className="w-80 bg-black/40 border-l border-white/10 overflow-y-auto p-5">
                    <div className="space-y-5">
                        {/* Bonding Curve Progress */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white text-sm font-bold">Bonding Curve</h3>
                                <span className="text-white/60 text-xs">ℹ️</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-xs">Progress</span>
                                    <span className="text-green-400 font-bold text-sm">{bondingCurveData.currentProgress}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <div className="bg-green-500 h-full" style={{ width: `${bondingCurveData.currentProgress}%` }} />
                                </div>
                                <div className="text-white/60 text-xs text-right mt-2">{formatNumber(bondingCurveData.currentMarketCap)} / {formatNumber(bondingCurveData.targetMarketCap)}</div>
                            </div>
                        </div>

                        {/* Price & Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                <div className="text-white/60 text-xs mb-1">Price</div>
                                <div className="text-white font-bold">{formatPrice(token.price)}</div>
                                <div className="text-green-400 text-xs mt-1">+{token.priceChange24h.toFixed(2)}%</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                <div className="text-white/60 text-xs mb-1">Market Cap</div>
                                <div className="text-white font-bold">${(token.marketCap / 1000).toFixed(1)}K</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                <div className="text-white/60 text-xs mb-1">Liquidity</div>
                                <div className="text-white font-bold">$1085</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                <div className="text-white/60 text-xs mb-1">24h Volume</div>
                                <div className="text-white font-bold">$0</div>
                            </div>
                        </div>

                        {/* Buy/Sell Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setMode('buy')}
                                className={`py-3 rounded-lg font-bold transition-all ${mode === 'buy' ? 'bg-green-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => setMode('sell')}
                                className={`py-3 rounded-lg font-bold transition-all ${mode === 'sell' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                            >
                                Sell
                            </button>
                        </div>

                        {/* Settings Toggle */}
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="w-full flex items-center justify-between text-white/70 text-sm p-2 hover:bg-white/5 rounded transition-colors"
                        >
                            <span>⚙️ Settings</span>
                            <span>{showSettings ? '−' : '+'}</span>
                        </button>

                        {/* Settings Panel */}
                        {showSettings && (
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                                <label className="text-white/60 text-xs">Max Slippage</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={slippage}
                                        onChange={(e) => setSlippage(Number(e.target.value))}
                                        className="flex-1 rounded px-2 py-1 bg-white/10 border border-white/20 text-white text-xs"
                                    />
                                    <span className="text-white/60 text-xs">%</span>
                                </div>
                            </div>
                        )}

                        {/* Amount Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-white/60">
                                <label>Balance: 0</label>
                                <span>{mode === 'buy' ? 'BNB' : token.symbol}</span>
                            </div>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                type="number"
                                className="w-full rounded px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none"
                            />
                        </div>

                        {/* Quick Presets */}
                        <div className="grid grid-cols-4 gap-2">
                            {['1 BNB', '2 BNB', '5 BNB', '10 BNB'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setAmount(p.split(' ')[0])}
                                    className="text-xs px-2 py-1.5 rounded bg-white/10 text-white/70 hover:bg-white/20 font-semibold transition-all"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Action Button */}
                        <div>
                            {!account ? (
                                <WalletConnectButton />
                            ) : (
                                <button className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${mode === 'buy' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                                    {mode === 'buy' ? 'Buy' : 'Sell'}
                                </button>
                            )}
                        </div>

                        {/* Holders List */}
                        <div className="border-t border-white/10 pt-4">
                            <h4 className="text-white text-sm font-bold mb-3">Holders ({mockHolders.length})</h4>
                            <div className="space-y-2">
                                {mockHolders.slice(0, 5).map((holder, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs">
                                        <span className="text-white/70 font-mono">{holder.address}</span>
                                        <span className={`font-bold ${holder.percentage > 40 ? 'text-red-400' : holder.percentage > 10 ? 'text-yellow-400' : 'text-green-400'}`}>
                                            {holder.percentage.toFixed(2)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
