import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2440] via-[#0B2C56] to-[#0A2440] text-white">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center text-white font-bold">
            B
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">BePAY</div>
            <div className="text-xs text-white/60">Secure · Fast · Borderless</div>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-white/80">About</a>
          <a href="#token" className="hover:text-white/80">Token</a>
          <a href="#ido" className="hover:text-white/80">IDO</a>
        </nav>
        <Link
          to="/app"
          className="inline-flex items-center justify-center rounded-xl bg-white text-[#0A2440] px-4 py-2 text-sm font-semibold shadow hover:opacity-90"
        >
          Enter IDO App
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-10 md:pt-16 md:pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-3">
              Tokenized IDO on Ethereum Sepolia
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              BePAY — Africa’s Decentralized
              <span className="block">Payments & Remittance Platform</span>
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg">
              Fast, low-cost cross-border payments for individuals and SMEs. Join our public sale of
              <span className="font-semibold"> SHR</span> to help bring secure, borderless finance to millions.
            </p>

            {/* Stat badges */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">Company Valuation</div>
                <div className="text-xl font-bold">₦2,000,000,000</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">IDO Target</div>
                <div className="text-xl font-bold">₦1,000,000,000</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">Token Price</div>
                <div className="text-xl font-bold">₦200 / SHR</div>
              </div>
            </div>

            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">Total Supply</div>
                <div className="text-xl font-bold">10,000,000 SHR</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">IDO Allocation</div>
                <div className="text-xl font-bold">5,000,000 SHR</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/70">Network</div>
                <div className="text-xl font-bold">Ethereum Sepolia</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center justify-center rounded-xl bg-white text-[#0A2440] px-5 py-3 text-sm font-semibold shadow hover:opacity-90"
              >
                Enter IDO App
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/0 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right card */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-white/20 to-white/5 rounded-3xl blur-lg"></div>
            <div className="relative rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="text-sm text-white/70">BePAY · SHR Sale Overview</div>
              <div className="mt-4 space-y-3 text-sm">
                <Row label="Raise (₦)" value="1,000,000,000" />
                <Row label="For Sale" value="5,000,000 SHR" />
                <Row label="Price" value="₦200 / SHR" />
                <Row label="Supply" value="10,000,000 SHR" />
                <Row label="Use of Funds" value="Product, Compliance, Liquidity, Expansion" />
              </div>
              <Link
                to="/app"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white text-[#0A2440] px-5 py-3 text-sm font-semibold shadow hover:opacity-90"
              >
                Participate Now
              </Link>
              <p className="mt-3 text-[11px] leading-5 text-white/60">
                * Demo on Sepolia for evaluation purposes. Please switch your wallet network to Sepolia to continue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info sections */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold">About BePAY</h2>
        <p className="mt-3 text-white/80 max-w-3xl">
          BePAY is building low-cost, high-speed cross-border payments for Africa. Our SHR token powers
          fee discounts, rewards, and community programs that accelerate adoption across individuals and SMEs.
        </p>
      </section>

      

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-xs text-white/60">© {new Date().getFullYear()} BePAY — All rights reserved.</div>
      </footer>
    </div>
  );
}

/* ---- small UI helpers ---- */
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-white/70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function InfoCard({ k, v }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/70">{k}</div>
      <div className="text-lg font-bold">{v}</div>
    </div>
  );
}

 