"use client";

import { useState } from "react";
import { Search, Menu, Bell, LucideIcon } from "lucide-react";

interface TopbarAction {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  action?: TopbarAction;
}

export default function Topbar({ title, subtitle, onMenuClick, action }: TopbarProps) {
  const [query, setQuery] = useState<string>("");

  return (
    <header className="h-16 bg-[#16213e] border-b border-[#1e2a47] flex items-center px-4 sm:px-6 gap-4 shrink-0">
      <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-gray-300 -ml-1">
        <Menu className="w-5 h-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl font-bold text-white leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 hidden sm:block truncate">{subtitle}</p>}
      </div>

      <div className="hidden md:flex items-center bg-[#1e2a47] border border-[#2a3a5a] rounded-xl px-3 py-2 gap-2 w-56 lg:w-72">
        <Search className="w-4 h-4 text-gray-500 shrink-0" />
        <input
          type="text"
          placeholder="Search data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full"
        />
      </div>

      <button className="relative text-gray-400 hover:text-gray-300 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shrink-0"
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          <span className="hidden sm:inline">{action.label}</span>
        </button>
      )}
    </header>
  );
}