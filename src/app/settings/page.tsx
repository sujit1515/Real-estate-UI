// app/settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  Shield,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Edit2,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
  Smartphone,
  Laptop,
  Tablet,
  Fingerprint,
  Key,
  BellRing,
  BellOff,
  MessageCircle,
  Heart,
  Home,
  TrendingUp,
  FileText
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  occupation: string;
  company: string;
  bio: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  propertyAlerts: boolean;
  priceDrops: boolean;
  newListings: boolean;
  inquiryUpdates: boolean;
  newsletter: boolean;
  marketingEmails: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  sessionTimeout: number;
  trustedDevices: Device[];
}

interface Device {
  id: string;
  name: string;
  type: "mobile" | "tablet" | "desktop";
  lastActive: string;
  location: string;
  current: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Suryakanta Das",
    email: "suryakanta@luminor.com",
    phone: "+91 9348185822",
    location: "Bhubaneswar, Odisha",
    dateOfBirth: "1990-01-01",
    occupation: "Real Estate Consultant",
    company: "Luminor Real Estate",
    bio: "Real estate enthusiast with a passion for helping people find their dream homes."
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    propertyAlerts: true,
    priceDrops: true,
    newListings: true,
    inquiryUpdates: true,
    newsletter: false,
    marketingEmails: false
  });

  // Security Settings State
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    biometricLogin: true,
    sessionTimeout: 30,
    trustedDevices: [
      {
        id: "1",
        name: "MacBook Pro",
        type: "desktop",
        lastActive: "2024-03-15T10:30:00",
        location: "Bhubaneswar, India",
        current: true
      },
      {
        id: "2",
        name: "iPhone 15 Pro",
        type: "mobile",
        lastActive: "2024-03-14T18:45:00",
        location: "Bhubaneswar, India",
        current: false
      }
    ]
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard }
  ];

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    // API call to save profile
    console.log("Profile saved:", profile);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    setShowPasswordModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    console.log("Password changed");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // API call to delete account
    console.log("Account deleted");
    router.push("/");
  };

  const handleRemoveDevice = (deviceId: string) => {
    setSecurity({
      ...security,
      trustedDevices: security.trustedDevices.filter(d => d.id !== deviceId)
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Laptop className="w-4 h-4" />;
    }
  };

  if (showSuccess) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')` }} />
        <div className="fixed inset-0 bg-black/60" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Settings Saved!</h3>
            <p className="text-gray-300">Your changes have been saved successfully.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Settings
            </h1>
            <p className="text-gray-300 mt-2">Manage your account preferences and security</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden sticky top-24">
                <nav className="p-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                          activeTab === tab.id
                            ? "bg-purple-600/20 text-purple-400"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-600/20 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-gray-300 border border-gray-400 rounded-lg hover:bg-white/10 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <User className="w-4 h-4 text-gray-400" />
                            {profile.fullName}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {profile.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {profile.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={profile.location}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {profile.location}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profile.dateOfBirth}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-white">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(profile.dateOfBirth).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Occupation
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="occupation"
                            value={profile.occupation}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          />
                        ) : (
                          <div className="text-white">{profile.occupation}</div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleProfileChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                          />
                        ) : (
                          <p className="text-gray-300">{profile.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Communication Channels */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Communication Channels</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Email Notifications</p>
                            <p className="text-sm text-gray-300">Receive updates via email</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.emailNotifications}
                              onChange={() => handleNotificationChange("emailNotifications")}
                              className="sr-only peer"
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
                              checked={notifications.smsNotifications}
                              onChange={() => handleNotificationChange("smsNotifications")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Push Notifications</p>
                            <p className="text-sm text-gray-300">Browser push notifications</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.pushNotifications}
                              onChange={() => handleNotificationChange("pushNotifications")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Property Alerts */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Property Alerts</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Property Alerts</p>
                            <p className="text-sm text-gray-300">Get alerts for matching properties</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.propertyAlerts}
                              onChange={() => handleNotificationChange("propertyAlerts")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Price Drops</p>
                            <p className="text-sm text-gray-300">Get notified when prices drop</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.priceDrops}
                              onChange={() => handleNotificationChange("priceDrops")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">New Listings</p>
                            <p className="text-sm text-gray-300">Get notified about new properties</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.newListings}
                              onChange={() => handleNotificationChange("newListings")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Marketing Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Newsletter</p>
                            <p className="text-sm text-gray-300">Weekly real estate insights</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.newsletter}
                              onChange={() => handleNotificationChange("newsletter")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="font-medium text-white">Marketing Emails</p>
                            <p className="text-sm text-gray-300">Special offers and promotions</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.marketingEmails}
                              onChange={() => handleNotificationChange("marketingEmails")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Password</h3>
                        <p className="text-sm text-gray-300">Change your password</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-600/20 transition-all"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Fingerprint className="w-5 h-5 text-purple-400" />
                          <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-sm text-gray-300">Add an extra layer of security</p>
                      </div>
                      <label className="relative">
                        <input
                          type="checkbox"
                          checked={security.twoFactorAuth}
                          onChange={() => setSecurity({ ...security, twoFactorAuth: !security.twoFactorAuth })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>

                  {/* Session Timeout */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Session Timeout</h3>
                    <div className="flex items-center gap-4">
                      <select
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({ ...security, sessionTimeout: parseInt(e.target.value) })}
                        className="px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 outline-none"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                      </select>
                      <p className="text-sm text-gray-300">Automatically log out after inactivity</p>
                    </div>
                  </div>

                  {/* Trusted Devices */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Trusted Devices</h3>
                    <div className="space-y-3">
                      {security.trustedDevices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getDeviceIcon(device.type)}
                            <div>
                              <p className="text-white font-medium">{device.name}</p>
                              <p className="text-xs text-gray-400">{device.location} • {new Date(device.lastActive).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {device.current && (
                              <span className="text-xs text-green-400">Current Device</span>
                            )}
                            {!device.current && (
                              <button
                                onClick={() => handleRemoveDevice(device.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setTheme("light")}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            theme === "light"
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-gray-300 hover:bg-white/20"
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          Light Mode
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            theme === "dark"
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-gray-300 hover:bg-white/20"
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          Dark Mode
                        </button>
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
                      <select className="px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 outline-none">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="or">Odia</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Currency</h3>
                      <select className="px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 outline-none">
                        <option value="usd">USD ($)</option>
                        <option value="inr">INR (₹)</option>
                        <option value="eur">EUR (€)</option>
                      </select>
                    </div>

                    {/* Units */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Unit of Measurement</h3>
                      <select className="px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 outline-none">
                        <option value="sqft">Square Feet (sq ft)</option>
                        <option value="sqm">Square Meters (sq m)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === "billing" && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Billing Information</h2>
                  
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
                        <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                          + Add Payment Method
                        </button>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300">No payment methods added</p>
                        <p className="text-sm text-gray-400">Add a payment method to make purchases</p>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
                      <div className="bg-white/5 rounded-lg p-8 text-center">
                        <p className="text-gray-300">No billing history available</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              {activeTab === "profile" && (
                <div className="mt-6 bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/30 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">Once you delete your account, there is no going back.</p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-purple-600 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">Change Password</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-red-600 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">Delete Account</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                  <p className="text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Yes, Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}