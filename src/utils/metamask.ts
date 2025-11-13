export function isMetaMaskInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.ethereum?.isMetaMask;
}

export function getMetaMaskDeepLink(): string | null {
  if (typeof navigator === "undefined") return null;

  const userAgent = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "https://metamask.app.link/connect";
  } else if (/Android/.test(userAgent)) {
    return "https://metamask.app.link/connect";
  }
  return null;
}

export function getMetaMaskDownloadUrl(): string {
  return "https://metamask.io/download/";
}

export async function requestAccounts(): Promise<string[]> {
  if (!window.ethereum) throw new Error("MetaMask not available");

  try {
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    return accounts;
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code === 4001) {
      throw new Error("User rejected the connection request");
    }
    throw error;
  }
}

export async function getCurrentChainId(): Promise<string> {
  if (!window.ethereum) throw new Error("MetaMask not available");

  const chainId = (await window.ethereum.request({
    method: "eth_chainId",
  })) as string;

  return chainId;
}

export async function getCurrentAccounts(): Promise<string[]> {
  if (!window.ethereum) throw new Error("MetaMask not available");

  const accounts = (await window.ethereum.request({
    method: "eth_accounts",
  })) as string[];

  return accounts;
}

export async function switchNetwork(chainId: string): Promise<void> {
  if (!window.ethereum) throw new Error("MetaMask not available");

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code === 4902) {
      throw new Error("Chain not added to MetaMask");
    }
    throw error;
  }
}
