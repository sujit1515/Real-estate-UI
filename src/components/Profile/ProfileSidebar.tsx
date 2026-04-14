// components/Profile/ProfileSidebar.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Calendar, Camera, LogOut, Clock, Heart, Settings } from "lucide-react";

interface ProfileSidebarProps {
  fullName: string;
  occupation: string;
  joinDate: string;
  avatar: string | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogout: () => void;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "activity", label: "Activity", icon: Clock },
  { id: "saved", label: "Saved Properties", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfileSidebar({
  fullName,
  occupation,
  joinDate,
  avatar,
  activeTab,
  onTabChange,
  onAvatarChange,
  onLogout
}: ProfileSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden sticky top-24">
        {/* Profile Summary */}
        <div className="p-6 text-center border-b border-white/20">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-purple-600/20 flex items-center justify-center overflow-hidden mx-auto mb-3 border-2 border-purple-400">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-purple-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
            </label>
          </div>
          <h3 className="text-lg font-semibold text-white">{fullName}</h3>
          <p className="text-sm text-gray-300">{occupation}</p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>Joined {joinDate}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                  activeTab === tab.id
                    ? "bg-purple-600/20 text-purple-400"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
          
          <hr className="my-4 border-white/20" />
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </motion.div>
  );
}