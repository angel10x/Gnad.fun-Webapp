import { mockTransactions } from '../../utils/mockTokenData';

export default function Transactions() {
  return (
    <div className="bg-[#0d0d0d] rounded-[12px] shadow-sm p-4">
      <h3 className="text-white font-semibold mb-4" style={{fontSize: "1.5em", fontWeight: "700"}}>Transactions</h3>
      <div className="overflow-auto max-h-64 rounded">
        <table className="w-full text-sm" style={{textAlign: "left", fontSize: "15px"}}>
          <thead className='text-white' >
            <tr className="text-white/60" style={{color: "#FFFFFFB3"}}>
              <th className="py-2">Time</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">USD</th>
              <th className="px-3 py-2">Token Qty</th>
              <th className="px-3 py-2">MON</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">Tx</th>
            </tr>
          </thead>
          <tbody className='text-white'>
            {mockTransactions.map((tx, idx) => (
              <tr key={tx.id} className={`${idx % 2 === 0 ? 'bg-white/2' : ''} hover:bg-white/5 transition-colors`}> 
                <td className="py-2 text-white/80">{tx.time}</td>
                <td className="px-3 py-2"><span className={`py-1 rounded-full text-xs font-bold ${tx.type === 'Sell' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{tx.type.toUpperCase()}</span></td>
                <td className="px-3 py-2 text-white/80">{tx.usd}</td>
                <td className="px-3 py-2 text-white/80">{tx.tokens}</td>
                <td className="px-3 py-2 text-white/80">{tx.bnb}</td>
                <td className="px-3 py-2 text-white/60 font-mono">{tx.address}</td>
                <td className="px-3 py-2 text-white/60" style={{cursor: "pointer"}}>↗</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
