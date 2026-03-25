"use client";

import AppShell from "../../../components/Admin/AppShell";

export default function SettingsPage() {
  return (
    <AppShell topbarProps={{ title: "Settings", subtitle: "Manage your account preferences" }}>
      <div className="flex items-center justify-center h-64 text-gray-500 text-sm bg-[#16213e] rounded-2xl border border-[#1e2a47]">
        Settings page — coming soon
      </div>
    </AppShell>
  );
}