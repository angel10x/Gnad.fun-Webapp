import { bondingCurveData } from '../../utils/mockTokenData';
import { useState } from 'react';

export default function BondingPanel() {
  const data = bondingCurveData;
  const [mode, setMode] = useState<'buy'|'sell'>('buy');
  const [amount, setAmount] = useState('');

  return (
    <div className="bg-[#0d0d0d] rounded-[12px] border border-white/8 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Classic Bonding Curve</h3>
        <span className="text-white/60 text-xs">ℹ️</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">Progress</span>
          <span className="text-[#00ff9a] font-bold">{data.progressPercent}%</span>
        </div>
        <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
          <div className="bg-[#00ff9a] h-full" style={{ width: `${data.progressPercent}%` }} />
        </div>
        <div className="text-white/60 text-xs flex justify-between">
          <span>{data.tokenLeft} left</span>
          <span>{data.bnbCollected} BNB collected</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded bg-white/5 text-center">
          <div className="text-white/60 text-xs">Price</div>
          <div className="text-white font-bold">0.0{(778).toString()}</div>
        </div>
        <div className="p-3 rounded bg-white/5 text-center">
          <div className="text-white/60 text-xs">Market Cap</div>
          <div className="text-white font-bold">$7297.94</div>
        </div>
        <div className="p-3 rounded bg-white/5 text-center">
          <div className="text-white/60 text-xs">Virtual Liquidity</div>
          <div className="text-white font-bold">$29.82</div>
        </div>
        <div className="p-3 rounded bg-white/5 text-center">
          <div className="text-white/60 text-xs">24h Volume</div>
          <div className="text-white font-bold">$0</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setMode('buy')} className={`${mode === 'buy' ? 'bg-[#00ff9a] text-black' : 'bg-white/6 text-white'} py-2 rounded`}>Buy</button>
        <button onClick={() => setMode('sell')} className={`${mode === 'sell' ? 'bg-[#ff4d4d] text-white' : 'bg-white/6 text-white'} py-2 rounded`}>Sell</button>
      </div>

      <div className="bg-white/5 p-3 rounded">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center">LP</div>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="flex-1 bg-transparent outline-none text-white" />
          <div className="text-white/60 text-xs">Balance: 0</div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          {['10%','25%','50%','100%'].map((p) => (
            <button key={p} className="text-xs px-3 py-1 rounded bg-white/6 text-white">{p}</button>
          ))}
        </div>
      </div>

      <button className="w-full py-3 rounded bg-[#ff4d4d] text-white/90 font-bold opacity-60" disabled>Connect Wallet</button>

      <div className="flex items-center gap-2 text-white/60 text-sm">
        <span>⚙️</span>
        <span className="text-xs">Settings</span>
      </div>
    </div>
  );
}
