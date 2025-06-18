import { http, createConfig } from 'wagmi';
import { mainnet, base } from 'wagmi/chains'; // ✅ import base too
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(), // ✅ add transport for base too
  },
});
