import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TradePanel() {
  const t = useTranslation();
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('0.00');
  const [total, setTotal] = useState('0');
  const [slip, setSlip] = useState('1');

  const handlePercentage = (percent: number) => {
    if (percent === 0) {
      setAmount('0.00');
      setTotal('0');
    } else {
      setAmount((percent / 100).toString());
      setTotal((percent / 100).toString());
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setTotal(value);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[12px] shadow-sm p-6 space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setMode('buy')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
            mode === 'buy'
              ? 'bg-[#00ff9a] text-black'
              : 'bg-white/10 text-white hover:bg-white/15'
          }`}
        >
          {t.trading.buy}
        </button>
        <button
          onClick={() => setMode('sell')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
            mode === 'sell'
              ? 'bg-[#ff6b6b] text-white'
              : 'bg-white/10 text-white hover:bg-white/15'
          }`}
        >
          {t.trading.sell}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">{t.common.balance} 0 {mode === 'buy' ? 'ETH' : 'MANYU Musk'}</span>
        <button className="text-white/60 hover:text-white text-xs underline">{t.trading.slip} {slip}%</button>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className="w-full bg-transparent text-white text-lg outline-none placeholder-white/40"
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        <button
          onClick={() => handlePercentage(0)}
          className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
        >
          0
        </button>
        <button
          onClick={() => handlePercentage(10)}
          className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
        >
          10%
        </button>
        <button
          onClick={() => handlePercentage(25)}
          className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
        >
          25%
        </button>
        <button
          onClick={() => handlePercentage(50)}
          className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
        >
          50%
        </button>
        <button
          onClick={() => handlePercentage(100)}
          className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
        >
          {t.common.max}
        </button>
      </div>

      <div className="text-center py-2">
        <span className="text-white/60 text-sm">{t.trading.total}</span>
        <div className="text-white text-xl font-bold">{total}</div>
      </div>

      <button
        className={`w-full py-3 rounded-lg font-bold text-black transition-all duration-200 ${
          amount === '0.00' || amount === ''
            ? 'bg-[#7cb342] opacity-60 cursor-not-allowed'
            : 'bg-[#7cb342] hover:bg-[#9ccc65] opacity-100'
        }`}
        disabled={amount === '0.00' || amount === ''}
      >
        {t.common.enterAmount}
      </button>
    </div>
  );
}
