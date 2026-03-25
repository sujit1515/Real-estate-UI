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
    <section className="pb-14">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-[#1f1f2a] rounded-xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-[#2a2a3a]">
          <div>
            <h3 className="font-serif text-[24px] font-bold text-white mb-2">
              Curated Inbox
            </h3>
            <p className="text-[13px] text-[#b0b0c0] max-w-xs leading-relaxed">
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
                className="bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg px-4 py-2.5 text-[13px] text-white placeholder:text-[#a0a0b0] outline-none focus:border-purple-500 transition-colors w-full sm:w-[220px]"
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