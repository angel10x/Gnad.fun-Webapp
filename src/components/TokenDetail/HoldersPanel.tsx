import { mockHolders } from '../../utils/mockTokenData';

export default function HoldersPanel() {
  return (
    <div className="bg-[#0d0d0d] rounded-[12px] shadow-sm p-3">
      <h4 className="text-white text-sm font-semibold mb-3">Holders: {mockHolders.length}</h4>
      <div className="space-y-2 max-h-48 overflow-auto pr-2">
        {mockHolders.map((h, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="text-white/70 font-mono">{h.address}</div>
            <div className="flex items-center gap-2">
              {idx === 0 && <span className="text-xs bg-[#00ff9a]/20 text-[#00ff9a] px-2 py-0.5 rounded">Classic Bonding Curve</span>}
              <div className="text-white font-bold">{h.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
