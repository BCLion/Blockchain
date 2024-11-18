'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { baseGoerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [baseGoerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Meme Minter',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <body>{children}</body>
        </RainbowKitProvider>
      </WagmiConfig>
    </html>
  )
}