import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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
  switchToMonad: () => Promise<boolean>;
  availableAccounts: string[];
  selectAccount: (address: string) => Promise<boolean>;
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
    switchToMonad,
    availableAccounts,
    selectAccount,
  } = useWallet();

  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
    return savedTheme || "dark";
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const htmlElement = document.documentElement;
    if (theme === 'light') {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    } else {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
    }
  }, [theme]);

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
    switchToMonad,
    availableAccounts,
    selectAccount,
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
