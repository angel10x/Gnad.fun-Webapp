import { mockTransactions } from '../../utils/mockTokenData';

export default function Transactions() {
  return (
    <div className="bg-[#0d0d0d] rounded-[12px] shadow-sm p-4">
      <h3 className="text-lg text-white font-semibold mb-3">Transactions</h3>
      <div className="overflow-auto max-h-64 rounded">
        <table className="w-full text-sm" style={{textAlign: "left", fontSize: "14px"}}>
          <thead className=''>
            <tr className="text-white/60">
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">USD</th>
              <th className="px-3 py-2">Token Qty</th>
              <th className="px-3 py-2">MON</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">Tx</th>
            </tr>
          </thead>
          <tbody className=''>
            {mockTransactions.map((tx, idx) => (
              <tr key={tx.id} className={`${idx % 2 === 0 ? 'bg-white/2' : ''} hover:bg-white/5 transition-colors`}> 
                <td className="px-3 py-2 text-white/80">{tx.time}</td>
                <td className="px-3 py-2"><span className={`py-0.5 rounded text-xs font-semibold ${tx.type === 'Sell' ? 'bg-[#ff4d4d] text-white' : 'bg-[#00ff9a] text-black'}`}>{tx.type.toUpperCase()}</span></td>
                <td className="px-3 py-2 text-white/80">{tx.usd}</td>
                <td className="px-3 py-2 text-white/80">{tx.tokens}</td>
                <td className="px-3 py-2 text-white/80">{tx.bnb}</td>
                <td className="px-3 py-2 text-white/60 font-mono">{tx.address}</td>
                <td className="px-3 py-2 text-white/60">↗</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
