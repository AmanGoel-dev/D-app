import { createContext, useContext, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type BalanceContextType = {
  balance: number | null;
  fetchBalance: () => Promise<void>;
};
const BalanceContext = createContext<BalanceContextType | null>(null);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const lamports = await connection.getBalance(publicKey);
    setBalance(lamports / 1e9);
  }, [publicKey, connection]);

  return (
    <BalanceContext.Provider value={{ balance, fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const ctx = useContext(BalanceContext);

  if (!ctx) {
    throw new Error("useBalance must be used within BalanceProvider");
  }

  return ctx;
}
