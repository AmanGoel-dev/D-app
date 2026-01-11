// Navbar.jsx
import { useBalance } from "@/context/Balancecontext";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

export default function Navbar() {
  const { connected } = useWallet();
  const { balance, fetchBalance } = useBalance();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.publicKey && wallet.connected) {
      fetchBalance();
    }
  }, [connected, fetchBalance]);

  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Solana dApp
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium 
            bg-gray-900 text-gray-200 hover:bg-gray-800 transition"
          >
            {connected && balance !== null && (
              <span className=" text-green-400">{balance.toFixed(3)} SOL</span>
            )}
          </div>

          <button
            className="px-4 py-2 rounded-lg text-sm font-medium 
            bg-gray-900 text-gray-200 hover:bg-gray-800 transition"
          >
            Send
          </button>

          <button
            className="px-4 py-2 rounded-lg text-sm font-medium 
            bg-gray-900 text-gray-200 hover:bg-gray-800 transition"
          >
            Sign Message
          </button>

          {/* Wallet Connect */}
          <WalletMultiButton className="bg-purple-600 hover:bg-purple-700" />
        </div>
      </div>
    </nav>
  );
}
