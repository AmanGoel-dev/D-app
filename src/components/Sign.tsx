import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519.js";
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

const Sign = () => {
  const wallet = useWallet();
  const onclick = async () => {
    if (!wallet.publicKey) {
      toast.error("Login to wallet");
      return;
    }
    // sgin message is a optional funcitonality so we need to check if it exists or not in this wallet
    if (wallet.signMessage === undefined) {
      toast.error("Wallet does not support message signing");
      return;
    }
    const message = (document.getElementById("message") as HTMLInputElement)
      .value;

    if (!message) {
      toast.error("Enter the message to sign");
    }
    const encodemsg = new TextEncoder().encode(message);
    const signedmessage = await wallet.signMessage(encodemsg);
    const verification = ed25519.verify(
      signedmessage,
      encodemsg,
      wallet.publicKey.toBytes()
    );
    if (verification) {
      toast.success("Message signed and verified successfully");
    } else {
      toast.error("Message verification failed");
    }
    (document.getElementById("message") as HTMLInputElement).value = "";
  };
  return (
    <div className=" flex items-center justify-center min-h-[calc(100vh-64px)]">
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
          <CardTitle> Verify using Sign </CardTitle>
          <CardDescription>Sign the message</CardDescription>
          <CardAction>
            <Button
              className=" text-black cursor-pointer"
              onClick={onclick}
              variant="outline"
            >
              Sign Message
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  type="text"
                  placeholder="Enter the Message"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default Sign;
