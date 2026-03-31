"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "bank">("credit");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("United States");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans">
      {/* ── NAV ── */}
      {/* <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-stone-900">
            Digital Architect
          </span>
          <button className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors border border-stone-300 rounded-full px-4 py-1.5 hover:border-stone-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to property
          </button>
        </div>
      </header> */}

      {/* ── BODY ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-14">

          {/* ── LEFT: FORM ── */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-1">
              Secure Checkout
            </h1>
            <p className="text-stone-500 text-sm mb-8">
              Complete your reservation for the Obsidian Villa by providing your payment details.
            </p>

            {/* Payment method tabs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {(["credit", "bank"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    paymentMethod === m
                      ? "border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/10"
                      : "border-stone-200 bg-white text-stone-600 hover:border-stone-400"
                  }`}
                >
                  {m === "credit" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.8} />
                      <path strokeLinecap="round" strokeWidth={1.8} d="M2 10h20" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                    </svg>
                  )}
                  {m === "credit" ? "Credit Card" : "Bank Transfer"}
                </button>
              ))}
            </div>

            {/* Card form */}
            {paymentMethod === "credit" && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-sm">
                {/* Cardholder */}
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alexander Vance"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition"
                  />
                </div>

                {/* Card number */}
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full px-4 py-3 pr-12 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition tracking-widest"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.6} />
                      <path strokeLinecap="round" strokeWidth={1.6} d="M2 10h20" />
                    </svg>
                  </div>
                </div>

                {/* Expiry + CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="···"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition tracking-widest"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank transfer placeholder */}
            {paymentMethod === "bank" && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm text-center text-stone-400 text-sm">
                Bank transfer instructions will be sent to your email after confirmation.
              </div>
            )}

            {/* Billing info */}
            <div className="mt-6">
              <h2 className="text-base font-semibold text-stone-900 mb-4">Billing Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition"
                    >
                      {["United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition"
                  />
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-6 flex gap-3 bg-stone-50 border border-stone-200 rounded-xl p-4">
              <svg className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-xs text-stone-500 leading-relaxed">
                Your transaction is secured with 256-bit SSL encryption. We do not store your full card details. By clicking &quot;Complete Purchase&quot;, you agree to our{" "}
                <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

            {/* CTA */}
            <button className="mt-6 w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white text-sm font-semibold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-stone-900/20 tracking-wide">
              Complete Purchase — $1,240,000
            </button>
          </div>

          {/* ── RIGHT: SUMMARY ── */}
          <div className="order-first lg:order-last">
            {/* Property card */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Image */}
              <div className="relative h-52 sm:h-64 lg:h-52 xl:h-64 bg-gradient-to-br from-stone-200 to-stone-300 overflow-hidden">
                {/* Placeholder image using a gradient that looks luxurious */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-stone-200 to-amber-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-stone-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span className="text-xs text-stone-400">Obsidian Villa</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-stone-900 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    Premium Asset
                  </span>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-xl font-bold text-stone-900">Obsidian Villa</h2>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-5">
                  <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Beverly Hills, CA 90210
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-stone-100">
                  {[
                    { label: "Bedrooms", value: "5" },
                    { label: "Bathrooms", value: "4.5" },
                    { label: "Sq Ft", value: "6,200" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-0.5">{s.label}</p>
                      <p className="text-base font-bold text-stone-900">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Base Property Price", amount: "$1,200,000" },
                    { label: "Closing Costs & Legal", amount: "$35,000" },
                    { label: "Digital Architect Fee", amount: "$5,000" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-stone-500">{item.label}</span>
                      <span className="text-stone-700 font-medium">{item.amount}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-stone-200 mb-5">
                  <span className="text-sm font-semibold text-stone-900">Total Due</span>
                  <span className="text-2xl font-bold text-stone-900">$1,240,000</span>
                </div>

                {/* Concierge */}
                <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl p-3.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-800">Need assistance?</p>
                    <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase">Concierge Sarah is online</p>
                  </div>
                  <button className="shrink-0 bg-stone-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-stone-700 transition-colors">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


     
    </div>
  );
}