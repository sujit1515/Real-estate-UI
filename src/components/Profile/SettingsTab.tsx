// components/Profile/SettingsTab.tsx
"use client";

import React, { useState } from "react";
import { Shield } from "lucide-react";

interface SettingsTabProps {
  onPasswordChange?: () => void;
}

export default function SettingsTab({ onPasswordChange }: SettingsTabProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-300">Receive updates about your inquiries and saved properties</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">SMS Notifications</p>
                <p className="text-sm text-gray-300">Get instant alerts on your phone</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-white">Show my profile publicly</p>
              <p className="text-sm text-gray-300">Allow other users to view your profile</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={publicProfile}
                onChange={() => setPublicProfile(!publicProfile)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
          </label>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <button 
            onClick={onPasswordChange}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}