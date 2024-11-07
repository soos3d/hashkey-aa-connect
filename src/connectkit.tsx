"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";
import { EntryPosition, wallet } from "@particle-network/connectkit/wallet";
import { aa } from "@particle-network/connectkit/aa";
import { sei, seiTestnet } from "@particle-network/connectkit/chains";

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  walletConnectors: [
    authWalletConnectors({}), // Social logins

    // Default Web3 logins
    evmWalletConnectors({
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // optional, retrieved from https://cloud.walletconnect.com
    }),
  ],

  plugins: [
    // embedded wallet start
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR,
    }),
    // embedded wallet end

    // aa config start
    aa({
      name: "SIMPLE",
      version: "2.0.0",
    }),
    // aa config end
  ],

  chains: [sei, seiTestnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
