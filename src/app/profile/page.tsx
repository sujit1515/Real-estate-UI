// app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import StatsCards from "@/components/Profile/StatsCards";
import ProfileTab from "@/components/Profile/ProfileTab";
import ActivityTab from "@/components/Profile/ActivityTab";
import SavedTab from "@/components/Profile/SavedTab";
import SettingsTab from "@/components/Profile/SettingsTab";
import { getProfile, updateProfile } from "@/api/profile"; // ✅ added updateProfile
import { Home, Heart, Clock, Award } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    bio: "",
    occupation: "",
    company: "",
  });

  // ✅ Backup to restore on Cancel
  const [originalData, setOriginalData] = useState(formData);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view profile");
          router.push("/login");
          return;
        }

        const response = await getProfile();
        const userData = response.user || response.data || response;

        const mapped = {
          fullName: userData.name || "",
          email: userData.email || "",
          phone: userData.phoneNo || "",
          location: userData.location || "",
          joinDate: userData.createdAt
            ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "January 2024",
          bio: userData.bio || "",
          occupation: userData.occupation || "",
          company: userData.company || "",
        };

        setFormData(mapped);
        setOriginalData(mapped); // ✅ save backup after fetch
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast.error(error?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const stats = [
    { label: "Properties Viewed", value: "128", icon: Home },
    { label: "Saved Properties", value: "24", icon: Heart },
    { label: "Inquiries Made", value: "12", icon: Clock },
    { label: "Properties Sold", value: "8", icon: Award },
  ];

  const recentActivities = [
    { id: 1, action: "Viewed property", property: "Villa Mariposa", date: "2 hours ago", status: "completed" as const },
    { id: 2, action: "Saved property", property: "The Glass House", date: "Yesterday", status: "completed" as const },
    { id: 3, action: "Inquiry sent", property: "Obsidian Villa", date: "2 days ago", status: "pending" as const },
    { id: 4, action: "Property valuation", property: "Modern Coastal Estate", date: "3 days ago", status: "completed" as const },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Snapshot before editing
  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  // ✅ Restore on Cancel
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  // ✅ Actually calls the API now
  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.fullName,
        phoneNo: formData.phone,
        location: formData.location,
        occupation: formData.occupation,
        company: formData.company,
        bio: formData.bio,
      });

      setOriginalData(formData); // update backup with saved data
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handlePasswordChange = () => {
    console.log("Change password clicked");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }}
        />
        <div className="fixed inset-0 bg-black/60" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }}
      />
      <div className="fixed inset-0 bg-black/60" />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              My <span className="text-purple-400">Profile</span>
            </h1>
            <p className="text-gray-300 mt-2">Manage your account and preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProfileSidebar
              fullName={formData.fullName}
              occupation={formData.occupation}
              joinDate={formData.joinDate}
              avatar={avatar}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onAvatarChange={handleAvatarChange}
              onLogout={handleLogout}
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <StatsCards stats={stats} />

              {activeTab === "profile" && (
                <ProfileTab
                  formData={formData}
                  isEditing={isEditing}
                  onEdit={handleEdit}       // ✅ snapshots before edit
                  onCancel={handleCancel}   // ✅ restores on cancel
                  onSave={handleSave}       // ✅ calls API
                  onInputChange={handleInputChange}
                />
              )}

              {activeTab === "activity" && (
                <ActivityTab activities={recentActivities} />
              )}

              {activeTab === "saved" && <SavedTab />}

              {activeTab === "settings" && (
                <SettingsTab onPasswordChange={handlePasswordChange} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}