import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { useBalance } from "@/context/Balancecontext";

const SendMoney = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { fetchBalance } = useBalance();
  async function sendSol() {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet");
      return;
    }
    let to = (document.getElementById("to") as HTMLInputElement)?.value;
    const amount = (document.getElementById("amount") as HTMLInputElement)
      ?.value;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: Number(amount) * 1e9,
      })
    );
    const signature = await wallet.sendTransaction(transaction, connection);
    const val = await connection.confirmTransaction(signature, "confirmed");
    if (val.value.err) {
      toast.error("Transaction failed");
    }
    await fetchBalance();
    toast.success("Transaction successful");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Card
        className="w-full max-w-sm 
    bg-black/40
    backdrop-blur-xl
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
    rounded-2xl
    text-gray-200"
      >
        <CardHeader>
          <CardTitle>Send SOL </CardTitle>
          <CardDescription>
            Send Solana tokens to another wallet address
          </CardDescription>
          <CardAction>
            <Button
              className=" text-black cursor-pointer"
              onClick={sendSol}
              variant="outline"
            >
              Send
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  type="text"
                  placeholder="Enter the address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="amount">Amount</Label>
                </div>
                <Input id="amount" type="number" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default SendMoney;
