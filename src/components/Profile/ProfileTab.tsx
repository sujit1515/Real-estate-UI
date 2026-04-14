// components/Profile/ProfileTab.tsx
"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

interface ProfileTabProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    occupation: string;
    company: string;
    bio: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProfileTab({
  formData,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onInputChange
}: ProfileTabProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-600/20 transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 border border-gray-400 rounded-lg hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 text-white">
                <User className="w-4 h-4 text-gray-400" />
                {formData.fullName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4 text-gray-400" />
                {formData.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-4 h-4 text-gray-400" />
                {formData.phone}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-gray-400" />
                {formData.location}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Occupation</label>
            {isEditing ? (
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="text-white">{formData.occupation}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            {isEditing ? (
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
              />
            ) : (
              <div className="text-white">{formData.company}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={onInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
              />
            ) : (
              <p className="text-gray-300">{formData.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}