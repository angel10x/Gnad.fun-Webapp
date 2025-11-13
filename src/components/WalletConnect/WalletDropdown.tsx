import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { openExplorer } from "@/utils/explorer";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

export function WalletDropdown() {
  const { account, formatAccount, disconnectWallet, connectWallet, chainId, isConnecting } =
    useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!account) {
    return (
      <Button
        onClick={() => void connectWallet()}
        disabled={isConnecting}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
      >
        <Wallet className="size-4 mr-2" />
        {isConnecting ? 'Connecting…' : 'Connect Wallet'}
      </Button>
    );
  }

  const displayAddress = formatAccount(account);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account);
    toast.success("Address copied!");
    setIsOpen(false);
  };

  const handleViewExplorer = () => {
    if (chainId) {
      openExplorer(chainId, account);
    }
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsOpen(false);
    toast.info("Wallet disconnected");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="gap-2 px-4 py-2 border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center size-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white text-xs font-bold">
            M
          </div>
          <span className="text-sm font-medium">{displayAddress}</span>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-72 bg-gray-900/95 border border-white/10 backdrop-blur-md rounded-lg shadow-2xl"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-white/70 uppercase tracking-wider">
          Wallet Account
        </DropdownMenuLabel>
        
        <div className="px-3 py-2.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-md mx-1 border border-white/5">
          <p className="text-xs text-white/50 mb-1">Address</p>
          <p className="text-sm font-mono text-white break-all">{account}</p>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem 
          onClick={handleCopyAddress} 
          className="cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10 rounded-md mx-1 px-3"
        >
          <Copy className="size-4 mr-2" />
          <span>Copy Address</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleViewExplorer}
          className="cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10 rounded-md mx-1 px-3"
        >
          <ExternalLink className="size-4 mr-2" />
          <span>View on Explorer</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 rounded-md mx-1 px-3"
        >
          <LogOut className="size-4 mr-2" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
