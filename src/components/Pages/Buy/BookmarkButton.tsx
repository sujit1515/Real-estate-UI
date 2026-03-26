// BookmarkButton.tsx
"use client";
import { useState } from "react";

export default function BookmarkButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={() => setSaved(!saved)}
      aria-label={saved ? "Unsave" : "Save"}
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-300
        ${saved
          ? "border-purple-500 bg-purple-600 text-white hover:bg-purple-700"
          : "border-purple-900/30 bg-[#252544] text-gray-400 hover:border-purple-500 hover:text-purple-400"
        }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}