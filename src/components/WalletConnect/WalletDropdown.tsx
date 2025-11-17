import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Copy, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDisconnect } from "wagmi";

export function WalletDropdown() {
  const { account, formatAccount, disconnectWallet, connectWallet, isConnecting } =
  useGlobalContext();
  const { disconnect } = useDisconnect()
  const t = useTranslation();
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
        {isConnecting ? t.header.connecting : t.header.connectWallet}
      </Button>
    );
  }

  const displayAddress = formatAccount(account);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account);
    toast.success(t.wallet.addressCopied);
    setIsOpen(false);
  };

  // const handleDisconnect = () => {
  //   disconnect(); // wagmi disconnect
  //   disconnectWallet();
  //   setIsOpen(false);
  //   toast.info(t.wallet.disconnected);
  // };

  const handleChangeAccount = async () => {
    const success = await connectWallet();
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="cursor-pointer gap-2 px-4 py-2 border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white  transition-all duration-200"
        >
          <span className="text-sm font-medium">{displayAddress}</span>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-slate-950/98 border border-purple-500/30 backdrop-blur-lg rounded-xl shadow-2xl p-3 space-y-2"
      >

        <DropdownMenuSeparator className="bg-purple-500/10 my-3" />

        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="cursor-pointer px-4 py-3 text-white/80 hover:text-white focus:text-white hover:bg-purple-500/20 focus:bg-purple-500/20 rounded-lg mx-0 transition-all duration-200 flex items-center gap-3 group"
        >
          <Copy className="size-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span className="font-medium">{t.wallet.copyAddress}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-purple-500/10 my-3" />

        <DropdownMenuItem
          onClick={handleChangeAccount}
          className="cursor-pointer px-4 py-3 text-white/80 hover:text-white focus:text-white hover:bg-purple-500/20 focus:bg-purple-500/20 rounded-lg mx-0 transition-all duration-200 flex items-center gap-3 group"
        >
          <Wallet className="size-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span className="font-medium">{t.wallet.changeAccount}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-purple-500/10 my-3" />

        <DropdownMenuItem
          onClick={() => {
            disconnect(); // wagmi disconnect
            // disconnectWallet();
            // setIsOpen(false);
            // toast.info(t.wallet.disconnected);
          }}
          className="cursor-pointer px-4 py-3 text-red-400/90 hover:text-red-300 focus:text-red-300 hover:bg-red-500/20 focus:bg-red-500/20 rounded-lg mx-0 transition-all duration-200 flex items-center gap-3 group"
        >
          <LogOut className="size-4 text-red-400 group-hover:text-red-300 transition-colors" />
          <span className="font-medium">{t.wallet.disconnect}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
