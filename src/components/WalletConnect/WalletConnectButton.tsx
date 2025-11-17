import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export function WalletConnectButton() {
  const { account, formatAccount, isConnecting, connectWallet } =
    useGlobalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (account) {
    return (
      <Button
        disabled
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
            {formatAccount(account)}
          </>
        )}
      </Button>
    );
  }

  const handleConnect = async () => {
    await connectWallet();
  };

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
