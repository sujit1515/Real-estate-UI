"use client";

import AppShell from "../../../components/Admin/AppShell";
import StatCard from "../../../components/Admin/StatCard";
import { Building2, CheckCircle2, Clock, Download } from "lucide-react";
import Link from "next/link";

interface Listing {
  id: number;
  name: string;
  location: string;
  status: "Available" | "Occupied";
  price: string;
  img: string;
}

interface ActivityItem {
  id: number;
  color: string;
  text: string;
  time: string;
}

const listings: Listing[] = [
  { 
    id: 1, 
    name: "Modern Villa", 
    location: "Beverly Hills, CA", 
    status: "Available", 
    price: "$4,500/mo", 
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&h=60&fit=crop" 
  },
  { 
    id: 2, 
    name: "Skyline Loft", 
    location: "Manhattan, NY", 
    status: "Occupied", 
    price: "$3,200/mo", 
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=80&h=60&fit=crop" 
  },
  { 
    id: 3, 
    name: "Cozy Cottage", 
    location: "Austin, TX", 
    status: "Available", 
    price: "$2,100/mo", 
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&h=60&fit=crop" 
  },
];

const activity: ActivityItem[] = [
  { id: 1, color: "bg-blue-500", text: 'New inquiry for "Modern Villa"', time: "2 minutes ago" },
  { id: 2, color: "bg-emerald-500", text: "Payment received from Unit 4B", time: "45 minutes ago" },
  { id: 3, color: "bg-amber-500", text: "Maintenance scheduled: 12 Oak St.", time: "3 hours ago" },
];

const statusStyle: Record<Listing["status"], string> = {
  Available: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Occupied: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};

export default function DashboardPage() {
  return (
    <AppShell
      topbarProps={{
        title: "Dashboard Overview",
        subtitle: "Welcome back, Alex. Here's what's happening today.",
        action: { 
          label: "Export Report", 
          icon: Download,
          onClick: () => alert("Exporting report...")
        },
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard 
          label="Total Listings" 
          value="128" 
          meta="↑ +12% this month" 
          metaType="positive" 
          icon={Building2} 
        />
        <StatCard 
          label="Active Rentals" 
          value="94" 
          meta="Stable since last week" 
          metaType="neutral" 
          icon={CheckCircle2} 
        />
        <StatCard 
          label="Pending Inquiries" 
          value="12" 
          meta="Requires attention" 
          metaType="warning" 
          icon={Clock} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#16213e] rounded-2xl border border-[#1e2a47] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a47]">
            <h2 className="font-semibold text-white">Recent Listings</h2>
            <Link href="/listings" className="text-sm text-blue-400 hover:text-blue-300">
              View All →
            </Link>
          </div>
          
          <div className="hidden sm:grid grid-cols-4 px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-[#1e2a47]">
            <span className="col-span-2">Property</span>
            <span className="text-center">Status</span>
            <span className="text-right">Price</span>
          </div>
          
          {listings.map((l) => (
            <div 
              key={l.id} 
              className="flex sm:grid sm:grid-cols-4 items-center gap-3 sm:gap-0 px-5 py-3.5 border-b border-[#1e2a47] last:border-0 hover:bg-[#1e2a47] transition-colors"
            >
              <div className="flex items-center gap-3 col-span-2">
                <img 
                  src={l.img} 
                  alt={l.name} 
                  className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-[#2a3a5a]" 
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{l.name}</p>
                  <p className="text-xs text-gray-500 truncate">{l.location}</p>
                </div>
              </div>
              
              <div className="hidden sm:flex justify-center">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[l.status]}`}>
                  {l.status}
                </span>
              </div>
              
              <p className="text-sm font-bold text-white text-right ml-auto sm:ml-0">{l.price}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#16213e] rounded-2xl border border-[#1e2a47] shadow-sm p-5 flex flex-col">
          <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
          
          <div className="space-y-4 flex-1">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 group">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${a.color} group-hover:scale-110 transition-transform`} />
                <div>
                  <p className="text-sm text-gray-300 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-5 w-full text-sm text-gray-400 border border-[#1e2a47] rounded-xl py-2.5 hover:bg-[#1e2a47] hover:text-gray-300 transition-colors">
            See all activity
          </button>
        </div>
      </div>
    </AppShell>
  );
}