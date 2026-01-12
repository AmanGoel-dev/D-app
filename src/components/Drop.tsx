import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useState } from "react";
import toast from "react-hot-toast";

const Drop = () => {
  const [value, setvalue] = useState(0);
  const wallet = useWallet();

  const { connection } = useConnection();
  const handleAirdrop = async () => {
    const userpublickkey = wallet.publicKey;
    if (!userpublickkey) {
      toast.error("Please connect to yout wallet");

      return;
    }
    const signature = await connection.requestAirdrop(
      userpublickkey,
      value * 1e9
    );
    console.log(signature);
    if (signature) {
      toast.success(`Airdroped ${value} sol to your wallet`);
    } else {
      toast.error("Airdrop failed");
    }
    setvalue(0);
  };
  return (
    <div className=" flex flex-col items-center space-y-3 justify-center mt-20 h-60">
      <p className=" text-xl font-medium text-cyan-300">
        Sol Faucet : Get Solana tokens for your devnet wallet
      </p>
      <div className=" flex flex-row space-x-1 ">
        <input
          onChange={(e) => {
            setvalue(Number(e.target.value));
          }}
          type="text"
          name="amount"
          id="amount"
          placeholder="Amount"
          className=" bg-white border-2 border-gray-500 rounded-md p-2"
        />{" "}
        <button
          onClick={handleAirdrop}
          className="bg-green-500 p-2  rounded-md cursor-pointer text-gray-500 font-bold hover:bg-green-700"
        >
          Airdrop sol
        </button>
      </div>
    </div>
  );
};

export default Drop;
