// components/Profile/StatsCards.tsx
"use client";

import React from "react";
import { Home, Heart, Clock, Award } from "lucide-react";

interface StatsCardsProps {
  stats: Array<{
    label: string;
    value: string;
    icon: any;
  }>;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-5 h-5 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-xs text-gray-300">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}