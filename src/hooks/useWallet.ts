import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "connectedAccount";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  const isMetaMaskAvailable = useMemo(
    () => typeof window !== "undefined" && !!window.ethereum?.request,
    [],
  );

  const formatAccount = useCallback((address: string) => {
    if (address.length <= 10) {
      return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedAccount = window.localStorage.getItem(STORAGE_KEY);
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum?.on) {
      return;
    }

    const handleAccountsChanged = (accounts: unknown) => {
      if (!Array.isArray(accounts) || accounts.length === 0) {
        setAccount(null);
        window.localStorage.removeItem(STORAGE_KEY);
        return;
      }

      const nextAccount = accounts[0];
      if (typeof nextAccount === "string") {
        setAccount(nextAccount);
        window.localStorage.setItem(STORAGE_KEY, nextAccount);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable) {
      setWalletError("MetaMask is not available in this browser.");
      return false;
    }

    try {
      setWalletError(null);
      setIsConnecting(true);

      if (account) {
        try {
          await window.ethereum?.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
        } catch (permissionError) {
          const code = (permissionError as { code?: number }).code;
          if (code === 4001) {
            throw permissionError;
          }
          // Swallow unsupported method errors and continue with the fallback request.
        }
      }

      const accounts = (await window.ethereum?.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (!Array.isArray(accounts) || accounts.length === 0) {
        setWalletError("No accounts found in MetaMask.");
        setAccount(null);
        window.localStorage.removeItem(STORAGE_KEY);
        return false;
      }

      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      window.localStorage.setItem(STORAGE_KEY, selectedAccount);
      return true;
    } catch (error) {
      const code = (error as { code?: number }).code;
      if (code === 4001) {
        setWalletError("Connection request was rejected.");
      } else {
        setWalletError("Failed to connect to MetaMask.");
      }
      setAccount(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [account, isMetaMaskAvailable]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setWalletError(null);
  }, []);

  const resetWalletError = useCallback(() => {
    setWalletError(null);
  }, []);

  return {
    account,
    isConnecting,
    walletError,
    isMetaMaskAvailable,
    formatAccount,
    connectWallet,
    disconnectWallet,
    resetWalletError,
  };
}

