// components/Profile/ActivityTab.tsx
"use client";

import React from "react";

interface Activity {
  id: number;
  action: string;
  property: string;
  date: string;
  status: "completed" | "pending";
}

interface ActivityTabProps {
  activities: Activity[];
}

export default function ActivityTab({ activities }: ActivityTabProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.status === "completed" ? "bg-green-500" : "bg-yellow-500"
            }`} />
            <div className="flex-1">
              <p className="font-medium text-white">{activity.action}</p>
              <p className="text-sm text-gray-300">{activity.property}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activity.status === "completed" 
                ? "bg-green-500/20 text-green-400" 
                : "bg-yellow-500/20 text-yellow-400"
            }`}>
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}