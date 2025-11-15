import { sampleToken } from '../../utils/mockTokenData';
import { FaRegCopy } from 'react-icons/fa';
import type { Token } from '../../types/token';
import { useEffect, useState } from 'react';
import { fetchJsonFromIpfs } from '@/utils/ipfs';

interface BannerProps {
  token?: Token;
}

export default function Banner({ token: initialToken }: BannerProps) {
  const [token, setToken] = useState<Token | undefined>(initialToken);

  useEffect(() => {
    let mounted = true;
    async function loadFromIpfs() {
      if (!initialToken?.ipfsCid) return;
      try {
        const data = await fetchJsonFromIpfs(initialToken.ipfsCid);
        if (!mounted) return;
        // merge IPFS metadata into token-like object
        setToken((prev) => ({
          ...(prev ?? sampleToken),
          name: data.name || prev?.name,
          symbol: data.symbol || prev?.symbol,
          description: data.description || prev?.description,
          imageUrl: data.image || prev?.imageUrl,
          twitter: data.twitter || prev?.twitter,
          telegram: data.telegram || prev?.telegram,
          website: data.website || prev?.website,
        } as Token));
      } catch (err) {
        console.error('Failed to load IPFS metadata', err);
      }
    }

    void loadFromIpfs();
    return () => { mounted = false; };
  }, [initialToken]);

  return (
    <div className="bg-[#0d0d0d] rounded-[12px] shadow-sm p-5">
      <div className="flex items-start gap-4">
        <img src={(token?.imageUrl) ?? sampleToken.imageUrl} alt={(token?.name) ?? sampleToken.name} className="w-16 h-16 rounded-full border-2 border-white/10" />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-xl font-bold">{(token?.name) ?? sampleToken.name}</h2>
            <span className="text-white/60">{(token?.symbol) ?? sampleToken.symbol}</span>
            <span className="ml-auto text-white/40 text-sm">mCap to the 500k</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
            <div>Creator: <span className="text-white/80">{(token?.creator) ?? sampleToken.creator}</span></div>
            <div>•</div>
            <div>Created: 1 year ago</div>
            <button className="ml-2 text-white/60 hover:text-white"><FaRegCopy /></button>
          </div>
          <p className="text-white/60 text-xs mt-3">{(token?.description) ?? sampleToken.description}</p>
        </div>
      </div>
    </div>
  );
}
