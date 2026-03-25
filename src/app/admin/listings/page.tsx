"use client";

import AppShell from "../../../components/Admin/AppShell";

export default function ListingsPage() {
  return (
    <AppShell topbarProps={{ title: "Listings", subtitle: "All your property listings" }}>
      <div className="flex items-center justify-center h-64 text-gray-500 text-sm bg-[#16213e] rounded-2xl border border-[#1e2a47]">
        Listings page — coming soon
      </div>
    </AppShell>
  );
}