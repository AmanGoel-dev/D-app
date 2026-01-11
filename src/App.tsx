import { Route, RouterProvider } from "react-router-dom";
import Drop from "./components/Drop";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Balance from "./components/Balance";
import SendMoney from "./components/SendMoney";
import Sign from "./components/Sign";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Drop />} />

          <Route path="send" element={<SendMoney />} />
          <Route path="sign" element={<Sign />} />
        </Route>
      </>
    )
  );
  return (
    <div className=" bg-black h-screen ">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="">
              <Toaster position="top-center" />
              <RouterProvider router={router} />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
