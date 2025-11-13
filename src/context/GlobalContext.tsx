import { createContext, useContext, ReactNode, useCallback, useState } from "react";
import type { Token } from "../types/token";
import { useTokenStore } from "../store/tokenStore";
import { useWallet } from "../hooks/useWallet";

interface GlobalContextType {
  tokens: Token[];
  addToken: (token: Token) => void;
  setTokens: (tokens: Token[]) => void;
  account: string | null;
  chainId: string | null;
  isConnecting: boolean;
  walletError: string | null;
  isMetaMaskAvailable: boolean;
  formatAccount: (address: string) => string;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  resetWalletError: () => void;
  isTokenDialogOpen: boolean;
  setIsTokenDialogOpen: (open: boolean) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const { tokens, addToken, setTokens } = useTokenStore();
  const {
    account,
    chainId,
    isConnecting,
    walletError,
    isMetaMaskAvailable,
    formatAccount,
    connectWallet,
    disconnectWallet,
    resetWalletError,
  } = useWallet();

  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const value: GlobalContextType = {
    tokens,
    addToken,
    setTokens,
    account,
    chainId,
    isConnecting,
    walletError,
    isMetaMaskAvailable,
    formatAccount,
    connectWallet,
    disconnectWallet,
    resetWalletError,
    isTokenDialogOpen,
    setIsTokenDialogOpen,
    theme,
    setTheme,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
