import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { getMetaMaskDownloadUrl } from "@/utils/metamask";

export function WalletConnectButton() {
  const { account, isConnecting, isMetaMaskAvailable, connectWallet } =
    useGlobalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (account) {
    return null;
  }

  const handleConnect = async () => {
    await connectWallet();
  };

  const handleInstall = () => {
    if (!isMetaMaskAvailable) {
      window.open(getMetaMaskDownloadUrl(), "_blank");
    }
  };

  if (!isMetaMaskAvailable) {
    return (
      <Button
        onClick={handleInstall}
        variant="default"
        className="gap-2"
      >
        <Wallet className="size-4" />
        Install MetaMask
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      variant="default"
      className="gap-2 disabled:opacity-100"
    >
      {isConnecting ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="size-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
}
