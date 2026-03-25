"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, PlusCircle, Settings, X, LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Add New", href: "/admin/addnew", icon: PlusCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 z-30 h-full w-60 bg-[#16213e] border-r border-[#1e2a47] flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1e2a47] shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">RentWise</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active 
                    ? "bg-blue-600/20 text-blue-400" 
                    : "text-gray-400 hover:bg-[#1e2a47] hover:text-gray-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-blue-400" : "text-gray-500"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-[#1e2a47] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-400 font-semibold text-sm shrink-0">
              AS
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Alex Sterling</p>
              <p className="text-xs text-gray-500 truncate">Property Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}