import { sampleToken } from '../../utils/mockTokenData';
import { Copy } from 'lucide-react';
import type { Token } from '../../types/token';
import { useEffect, useState } from 'react';
import { fetchJsonFromIpfs } from '@/utils/ipfs';
import { useTranslation } from '@/hooks/useTranslation';
import { useWallet } from '@/hooks/useWallet';
import { toast } from 'sonner';

interface BannerProps {
  token?: Token;
}

export default function Banner({ token: initialToken }: BannerProps) {
  const [token, setToken] = useState<Token | undefined>(initialToken);
  console.log('Banner token:', token);
  const { formatAccount } = useWallet();
  const t = useTranslation();

  const handleCopyAddress = () => {
    if (token?.contractAddress) {
      navigator.clipboard.writeText(token.contractAddress);
      toast.success('Contract address copied to clipboard');
    }
  }; 

  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);

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
    <div className="bg-[#0d0d0d] rounded-[12px] shadow-sm p-6">
      <div className="flex items-start gap-4">
        <img src={(token?.imageUrl) ?? sampleToken.imageUrl} alt={(token?.name) ?? sampleToken.name} className="size-16 rounded-full border-2 border-white/10" />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold" style={{ fontSize: "22px" }}>{(token?.name) ?? sampleToken.name}</h2>
            <span className="text-white/60" style={{ fontSize: "22px", color: "#ffffffb2" }}>({(token?.symbol) ?? sampleToken.symbol})</span>
            <div className="flex items-center font-base-white/70 ">
              <span className='text-sm '>({formatAccount(token?.contractAddress ?? '')})</span>
              <button
                onClick={handleCopyAddress}
                className="p-1 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                title="Copy contract address"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          <p className="font-base-white/70 text-base-sm mt-3">{(token?.description) ?? sampleToken.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
            <div className='font-base-white/70'>{t.tokenCard.creator} <span className="text-white">{(token?.creator) ?? sampleToken.creator}</span></div>
            <div className='text-white'>•</div>
            <div className='font-base-sm bg-[#434344] text-white'>{t.tokenCard.created} 1 year ago</div>
            {/* <button className="ml-2 text-white/60 hover:text-white"><FaRegCopy /></button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
