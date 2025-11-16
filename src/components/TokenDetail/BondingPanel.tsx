import { bondingCurveData } from '../../utils/mockTokenData';
import { useState } from 'react';

export default function BondingPanel() {
  const data = bondingCurveData;
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  return (
    <div className="p-4 space-y-4">
      <div className='border border-white/70 md:space-y-2 p-3 rounded-md mb-4'>
        <div className="text-center">
          <h3 className="text-white font-semibold">Classic Bonding Curve</h3>
        </div>

        <div className="mb-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-md font-base-white/70">Progress</span>
            <span className="font-base-white/70 font-bold text-md">{data.progressPercent}%</span>
          </div>
          <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
            <div className="font-base-white/70 bg-[#00ff9a] h-full" style={{ width: `${data.progressPercent}%` }} />
          </div>
          <div className="font-base-white/70 text-md flex justify-between">
            <span>{data.tokenLeft} left</span>
            <span>{data.bnbCollected} BNB collected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-md bg-white/5 text-center">
          <div className="font-base-white/70 text-sm">Price</div>
          <div className="text-white font-bold text-lg">0.0{(778).toString()}</div>
        </div>
        <div className="p-3 rounded-md bg-white/5 text-center">
          <div className="font-base-white/70 text-sm">Market Cap</div>
          <div className="text-white font-bold text-lg">$7297.94</div>
        </div>
        <div className="p-3 rounded-md bg-white/5 text-center">
          <div className="font-base-white/70 text-sm">Virtual Liquidity</div>
          <div className="text-white font-bold text-lg">$29.82</div>
        </div>
        <div className="p-3 rounded-md bg-white/5 text-center">
          <div className="font-base-white/70 text-sm">24h Volume</div>
          <div className="text-white font-bold text-lg">$0</div>
        </div>
      </div>

      <div className='bg-white/10 p-4 rounded-md bg-gray-900'>
        <div className="grid grid-cols-2 mb-4">
          <button onClick={() => setMode('buy')} className={`${mode === 'buy' ? 'bg-btn-buy text-black' : 'bg-gray-900 text-white'} py-2 rounded-md cursor-pointer`}>Buy</button>
          <button onClick={() => setMode('sell')} className={`${mode === 'sell' ? 'bg-btn-sell text-white' : 'bg-gray-900 text-white'} py-2 rounded-md cursor-pointer`}>Sell</button>
        </div>
        <div className="inline-flex items-center bg-gray-500 gap-2 px-2 py-1 text-white/60 text-sm rounded-md cursor-pointer mb-1">
          <span>⚙️</span>
          <span className="text-xs text-white">Settings</span>
        </div>
        <div className="bg-white/5 p-3 rounded-md mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center">LP</div>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="flex-1 bg-transparent outline-none text-white" />
            <div className="text-white/60 text-xs">Balance: 0</div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {['10%', '25%', '50%', '100%'].map((p) => (
              <button key={p} className="text-xs px-3 py-1 rounded bg-white/6 text-white">{p}</button>
            ))}
          </div>
        </div>
        <button className="w-full py-3 rounded-md font-semibold" disabled style={{ backgroundColor: "#CCAE00", opacity: amount.length > 0 ? "1" : ".6" }}>Connect Wallet</button>
      </div>

    </div>
  );
}
