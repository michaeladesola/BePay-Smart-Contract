import React, { useEffect, useMemo, useState } from "react";
import {
  WagmiConfig,
  http,
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  createConfig,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { parseUnits, formatUnits } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* -------------------- Addresses -------------------- */
const ADDRESSES = {
  SHR: "0x9De859E849a198D27DcA5F7Ba2f836d49BA4F676",
  PUSD: "0xDd7639e3920426de6c59A1009C7ce2A9802d0920",
  IDO: "0xa1E0D64349c5b9e6Ed133F8288B2574Ec4FE3150",
};

/* -------------------- ABIs -------------------- */
const ERC20_ABI = [
  { type: "function", name: "name", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { type: "function", name: "symbol", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "allowance", stateMutability: "view", inputs: [{ type: "address" }, { type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "approve", stateMutability: "nonpayable", inputs: [{ type: "address" }, { type: "uint256" }], outputs: [{ type: "bool" }] },
];

const IDO_ABI = [
  { type: "function", stateMutability: "nonpayable", name: "buy", inputs: [{ type: "uint256", name: "amountA" }], outputs: [] },
  { type: "function", stateMutability: "nonpayable", name: "buyWithExactB", inputs: [{ type: "uint256", name: "amountB" }], outputs: [] },
  { type: "function", stateMutability: "view", name: "priceBPerA", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", stateMutability: "view", name: "availableTokenA", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", stateMutability: "view", name: "isOpen", inputs: [], outputs: [{ type: "bool" }] },
  { type: "function", stateMutability: "view", name: "remainingForWallet", inputs: [{ type: "address", name: "wallet" }], outputs: [{ type: "uint256" }] },
  { type: "function", stateMutability: "view", name: "perWalletCapA", inputs: [], outputs: [{ type: "uint256" }] },
];

/* -------------------- Wagmi + Query -------------------- */
const rpcUrl = import.meta.env.VITE_RPC_URL;
const config = createConfig({
  chains: [sepolia],
  connectors: [injected({ shimDisconnect: true })],
  transports: { [sepolia.id]: http(rpcUrl || undefined) },
});
const queryClient = new QueryClient();

/* -------------------- UI Helpers -------------------- */
function Section({ title, children }) {
  return (
    <div className="card p-5 dark:bg-slate-900/80 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-3 dark:text-slate-100">{title}</h2>
      {children}
    </div>
  );
}

function ConnectBar() {
  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <div className="flex items-center justify-between gap-3 p-3 border rounded-xl bg-white/90 dark:bg-slate-900/80 dark:border-slate-700">
      <div>
        <div className="text-sm text-gray-500 dark:text-slate-400">Network</div>
        <div className="font-medium dark:text-slate-100">{chainId === sepolia.id ? "Sepolia" : `Chain ID ${chainId ?? "?"}`}</div>
      </div>
      <div className="flex-1" />
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="text-sm dark:text-slate-200">{address}</div>
          <button className="btn dark:border-slate-600 dark:text-slate-100" onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      ) : (
        connectors.map((c) => (
          <button
            key={c.uid}
            className="btn dark:border-slate-600 dark:text-slate-100"
            onClick={() => connect({ connector: c })}
            disabled={isPending}
          >
            {isPending ? "Connecting…" : `Connect ${c.name}`}
          </button>
        ))
      )}
    </div>
  );
}

/* --- ERC20 info (Total Supply removed from UI per request) --- */
function useErc20Info(address) {
  const { address: user } = useAccount();
  const name = useReadContract({ address, abi: ERC20_ABI, functionName: "name" });
  const symbol = useReadContract({ address, abi: ERC20_ABI, functionName: "symbol" });
  const decimals = useReadContract({ address, abi: ERC20_ABI, functionName: "decimals" });
  const balance = useReadContract({
    address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [user ?? "0x0000000000000000000000000000000000000000"],
  });

  const dec = decimals.data ?? 18;
  return {
    name: name.data?.toString() ?? "—",
    symbol: symbol.data?.toString() ?? "—",
    decimals: Number(dec),
    balance: balance.data ? formatUnits(balance.data, dec) : "0",
  };
}

function TokenPanel({ label, address }) {
  const info = useErc20Info(address);
  return (
    <Section title={`${label} (${address.slice(0, 6)}…${address.slice(-4)})`}>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><div className="text-gray-500 dark:text-slate-400">Name</div><div className="font-medium dark:text-slate-100">{info.name}</div></div>
        <div><div className="text-gray-500 dark:text-slate-400">Symbol</div><div className="font-medium dark:text-slate-100">{info.symbol}</div></div>
        <div><div className="text-gray-500 dark:text-slate-400">Decimals</div><div className="font-medium dark:text-slate-100">{info.decimals}</div></div>
        <div><div className="text-gray-500 dark:text-slate-400">Your Balance</div><div className="font-medium dark:text-slate-100">{info.balance}</div></div>
      </div>
    </Section>
  );
}

function IdoPanel() {
  const [pusdAmount, setPusdAmount] = useState("0");
  const [status, setStatus] = useState(null); // can hold JSX
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const chainId = useChainId();

  // Reads
  const pusdDecimals = useReadContract({ address: ADDRESSES.PUSD, abi: ERC20_ABI, functionName: "decimals" });
  const shrDecimals  = useReadContract({ address: ADDRESSES.SHR,  abi: ERC20_ABI, functionName: "decimals" });
  const price        = useReadContract({ address: ADDRESSES.IDO,  abi: IDO_ABI,   functionName: "priceBPerA" });
  const available    = useReadContract({ address: ADDRESSES.IDO,  abi: IDO_ABI,   functionName: "availableTokenA" });
  const isOpen       = useReadContract({ address: ADDRESSES.IDO,  abi: IDO_ABI,   functionName: "isOpen" });
  const allowance    = useReadContract({
    address: ADDRESSES.PUSD,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address ?? "0x0000000000000000000000000000000000000000", ADDRESSES.IDO],
  });
  const capA         = useReadContract({ address: ADDRESSES.IDO, abi: IDO_ABI, functionName: "perWalletCapA" });
  const remainingForYou = useReadContract({
    address: ADDRESSES.IDO, abi: IDO_ABI, functionName: "remainingForWallet",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  // Fallback: SHR.balanceOf(IDO) if availableTokenA() is not usable
  const idoShrBalance = useReadContract({
    address: ADDRESSES.SHR,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [ADDRESSES.IDO],
  });

  // Format "Available Token A (SHR)" using IDO view first, otherwise SHR.balanceOf(IDO)
  const availableFormatted = useMemo(() => {
    const dA = Number(shrDecimals.data ?? 18);
    const raw =
      available.data !== undefined && available.data !== null
        ? available.data
        : (idoShrBalance.data ?? 0n);
    try {
      return formatUnits(raw, dA);
    } catch {
      return raw?.toString?.() ?? "—";
    }
  }, [shrDecimals.data, available.data, idoShrBalance.data]);

  // Per-user cap progress
  const { capUsedPct, capText } = useMemo(() => {
    const cap = BigInt(capA.data ?? 0n);
    const rem = BigInt(remainingForYou.data ?? 0n);
    if (cap === 0n) return { capUsedPct: 0, capText: "—" };
    const used = cap - rem;
    const pct = Number((used * 10000n) / cap) / 100; // 2dp
    return { capUsedPct: isFinite(pct) ? pct : 0, capText: `${pct.toFixed(2)}%` };
  }, [capA.data, remainingForYou.data]);

  function estimateA() {
    try {
      const dB = Number(pusdDecimals.data ?? 18);
      const dA = Number(shrDecimals.data ?? 18);
      const amtB = parseUnits(pusdAmount || "0", dB);
      const p = BigInt(price.data ?? 0n);
      if (p === 0n) return "0";
      const aBase = (amtB * (10n ** BigInt(dA))) / p;
      const asFloat = Number(aBase) / (10 ** dA);
      if (!isFinite(asFloat)) return "0";
      return asFloat.toString();
    } catch {
      return "0";
    }
  }

  const shrEstimate = estimateA();

  async function buyWithPUSD() {
    setStatus("Preparing transaction…");
    if (!isConnected) { setStatus("Connect wallet first."); return; }
    if (chainId !== sepolia.id) { setStatus("Please switch to Sepolia."); return; }

    try {
      const d = Number(pusdDecimals.data ?? 18);
      const amountB = parseUnits(pusdAmount || "0", d);

      // Approve only if needed
      const current = BigInt(allowance.data ?? 0n);
      if (current < amountB) {
        await writeContractAsync({
          address: ADDRESSES.PUSD,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [ADDRESSES.IDO, amountB],
        });
      }

      const hash = await writeContractAsync({
        address: ADDRESSES.IDO,
        abi: IDO_ABI,
        functionName: "buyWithExactB",
        args: [amountB],
      });

      setStatus(
        <span>
          Tx submitted:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-brand-600 dark:text-brand-400"
          >
            View on Etherscan
          </a>
        </span>
      );
    } catch (e) {
      console.error(e);
      setStatus(e?.shortMessage || e?.message || "Transaction failed");
    }
  }

  return (
    <Section title="IDO Purchase">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          {/* Amount in PUSD (editable) */}
          <div>
            <label className="label dark:text-slate-300">Amount (PUSD)</label>
            <input
              className="input dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 w-full"
              value={pusdAmount}
              onChange={(e) => setPusdAmount(e.target.value)}
              placeholder="100"
            />
            <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Available Token A (SHR):{" "}
              <span className="font-medium dark:text-slate-100">{availableFormatted}</span>
            </div>
          </div>

          {/* Amount in SHR (read-only, live estimate) */}
          <div>
            <label className="label dark:text-slate-300">Amount (SHR)</label>
            <input
              className="input dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 w-full"
              value={shrEstimate}
              readOnly
            />
            <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Calculated from PUSD input at current price.
            </div>
          </div>
        </div>

        <button onClick={buyWithPUSD} className="btn btn-primary">Buy</button>

        {/* Per-wallet cap progress */}
      

        <div className="grid md:grid-cols-3 grid-cols-2 gap-3 text-sm border-t pt-3 dark:border-slate-700">
          <div className="card p-3 dark:bg-slate-900/80 dark:border-slate-700">
            <span className="text-gray-500 dark:text-slate-400">Price B per A</span>
            <div className="font-medium dark:text-slate-100">{price.data?.toString() ?? "—"}</div>
          </div>
          <div className="card p-3 dark:bg-slate-900/80 dark:border-slate-700">
            <span className="text-gray-500 dark:text-slate-400">Available Token A</span>
            <div className="font-medium dark:text-slate-100">{availableFormatted}</div>
          </div>
          <div className="card p-3 dark:bg-slate-900/80 dark:border-slate-700">
            <span className="text-gray-500 dark:text-slate-400">Sale Open?</span>
            <div className="font-medium dark:text-slate-100">{String(isOpen.data) ?? "—"}</div>
          </div>
        </div>

        {status && (
          <div className="text-sm p-3 rounded-xl bg-gray-50 border dark:bg-slate-900/60 dark:border-slate-700 dark:text-slate-100">
            {status}
          </div>
        )}
      </div>
    </Section>
  );
}

function Layout({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header className="card px-4 py-3 flex items-center justify-between dark:bg-slate-900/80 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 text-white grid place-items-center font-bold">S</div>
            <div>
              <h1 className="text-xl font-bold leading-tight dark:text-slate-100">BePAY IDO Dashboard</h1>
              <div className="text-xs text-gray-500 dark:text-slate-400">SHR · PUSD · IDO</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn dark:border-slate-600 dark:text-slate-100"
              onClick={() => setDark((v) => !v)}
              title="Toggle dark mode"
            >
              {dark ? "Light" : "Dark"} mode
            </button>
           
          </div>
        </header>

        {children}

        <footer className="text-xs text-gray-500 pt-6 dark:text-slate-400">
          Ensure wallet is on Sepolia (11155111). Uses approve → buyWithExactB in PUSD.
        </footer>
      </div>
    </div>
  );
}

function AppInner() {
  const { address, isConnected } = useAccount();
  const balance = useBalance({ address, chainId: sepolia.id });

  return (
    <Layout>
      <ConnectBar />
    

      <IdoPanel />
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <AppInner />
      </WagmiConfig>
    </QueryClientProvider>
  );
}
