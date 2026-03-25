"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { LucideIcon } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
}

interface AppShellProps {
  children: React.ReactNode;
  topbarProps: TopbarProps;
}

export default function AppShell({ children, topbarProps }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#1a1a2e]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar {...topbarProps} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}