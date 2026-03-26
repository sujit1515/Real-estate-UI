// Newsletter.tsx
"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="pb-14 bg-[#1a1a2e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-[#252544] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300">
          <div>
            <h3 className="font-serif text-[24px] font-bold text-white mb-2">
              Curated Inbox
            </h3>
            <p className="text-[13px] text-gray-400 max-w-xs leading-relaxed">
              Get exclusive access to off-market properties and new collection releases
              before they go public.
            </p>
          </div>

          {submitted ? (
            <p className="text-[14px] text-purple-400 font-medium">
              ✓ You're on the list. Watch your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-[#1f1f2a] border border-purple-900/30 rounded-lg px-4 py-2.5 text-[13px] text-white placeholder:text-gray-400 outline-none focus:border-purple-500 transition-colors w-full sm:w-[220px]"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white rounded-lg px-5 py-2.5 text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}