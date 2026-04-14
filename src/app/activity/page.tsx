// app/activity/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  Heart, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  TrendingUp,
  FileText,
  MessageCircle,
  Filter,
  Search,
  ChevronDown
} from "lucide-react";

interface Activity {
  id: string;
  type: "view" | "save" | "inquiry" | "valuation" | "contact" | "share";
  title: string;
  propertyName?: string;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "cancelled";
  icon: any;
  color: string;
}

export default function ActivityPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      const mockActivities: Activity[] = [
        {
          id: "1",
          type: "view",
          title: "Viewed Property",
          propertyName: "Villa Mariposa",
          description: "You viewed Villa Mariposa in Bel Air, Los Angeles",
          timestamp: "2024-03-15T10:30:00",
          status: "completed",
          icon: Eye,
          color: "blue"
        },
        {
          id: "2",
          type: "save",
          title: "Saved Property",
          propertyName: "The Glass House",
          description: "You saved The Glass House to your favorites",
          timestamp: "2024-03-14T15:45:00",
          status: "completed",
          icon: Heart,
          color: "pink"
        },
        {
          id: "3",
          type: "inquiry",
          title: "Inquiry Sent",
          propertyName: "Obsidian Villa",
          description: "You sent an inquiry about Obsidian Villa",
          timestamp: "2024-03-13T09:20:00",
          status: "pending",
          icon: MessageCircle,
          color: "yellow"
        },
        {
          id: "4",
          type: "valuation",
          title: "Valuation Request",
          propertyName: "Modern Coastal Estate",
          description: "You requested a valuation for Modern Coastal Estate",
          timestamp: "2024-03-12T14:15:00",
          status: "completed",
          icon: TrendingUp,
          color: "green"
        },
        {
          id: "5",
          type: "contact",
          title: "Contact Form Submitted",
          description: "You submitted a contact form for general inquiry",
          timestamp: "2024-03-11T11:00:00",
          status: "completed",
          icon: Mail,
          color: "purple"
        },
        {
          id: "6",
          type: "share",
          title: "Shared Property",
          propertyName: "The Geometrica",
          description: "You shared The Geometrica with a friend",
          timestamp: "2024-03-10T16:30:00",
          status: "completed",
          icon: Heart,
          color: "pink"
        },
        {
          id: "7",
          type: "view",
          title: "Viewed Property",
          propertyName: "Oceanfront Paradise",
          description: "You viewed Oceanfront Paradise in Malibu",
          timestamp: "2024-03-09T13:45:00",
          status: "completed",
          icon: Eye,
          color: "blue"
        },
        {
          id: "8",
          type: "inquiry",
          title: "Inquiry Sent",
          propertyName: "Sunset Heights",
          description: "You sent an inquiry about Sunset Heights",
          timestamp: "2024-03-08T10:15:00",
          status: "cancelled",
          icon: MessageCircle,
          color: "red"
        }
      ];
      setActivities(mockActivities);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500/20 text-blue-400",
      pink: "bg-pink-500/20 text-pink-400",
      yellow: "bg-yellow-500/20 text-yellow-400",
      green: "bg-green-500/20 text-green-400",
      purple: "bg-purple-500/20 text-purple-400",
      red: "bg-red-500/20 text-red-400"
    };
    return colors[color] || "bg-gray-500/20 text-gray-400";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return formatDate(dateString);
  };

  const filterOptions = [
    { value: "all", label: "All Activities", icon: ActivityIcon },
    { value: "view", label: "Views", icon: Eye },
    { value: "save", label: "Saved", icon: Heart },
    { value: "inquiry", label: "Inquiries", icon: MessageCircle },
    { value: "valuation", label: "Valuations", icon: TrendingUp },
    { value: "contact", label: "Contacts", icon: Mail }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || activity.type === filter;
    const matchesSearch = searchTerm === "" || 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: activities.length,
    completed: activities.filter(a => a.status === "completed").length,
    pending: activities.filter(a => a.status === "pending").length,
    views: activities.filter(a => a.type === "view").length,
    saves: activities.filter(a => a.type === "save").length,
    inquiries: activities.filter(a => a.type === "inquiry").length
  };

  function ActivityIcon() {
    return <Clock className="w-4 h-4" />;
  }

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
          }}
        />
        <div className="fixed inset-0 bg-black/60" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading your activity...</p>
          </div>
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
              My <span className="text-purple-400">Activity</span>
            </h1>
            <p className="text-gray-300 mt-2">Track all your interactions and activities</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-300">Total Activities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              <p className="text-xs text-gray-300">Completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              <p className="text-xs text-gray-300">Pending</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-blue-400">{stats.views}</p>
              <p className="text-xs text-gray-300">Property Views</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-pink-400">{stats.saves}</p>
              <p className="text-xs text-gray-300">Saved Properties</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-purple-400">{stats.inquiries}</p>
              <p className="text-xs text-gray-300">Inquiries</p>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === option.value
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    <Icon />
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredActivities.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No activities found</h3>
                <p className="text-gray-300">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all group cursor-pointer"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(activity.color)}`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                            <h3 className="text-base font-semibold text-white">
                              {activity.title}
                              {activity.propertyName && (
                                <span className="text-purple-400">: {activity.propertyName}</span>
                              )}
                            </h3>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(activity.status)}
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {getTimeAgo(activity.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{activity.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </motion.div>

          {/* Load More */}
          {filteredActivities.length > 0 && filteredActivities.length < activities.length && (
            <div className="text-center mt-8">
              <button className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
                Load More Activities
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Activity Details Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-purple-600 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">Activity Details</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(selectedActivity.color)}`}>
                    <selectedActivity.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedActivity.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(selectedActivity.timestamp)}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{selectedActivity.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedActivity.status)}
                    <span className="text-sm capitalize">{selectedActivity.status}</span>
                  </div>
                  {selectedActivity.propertyName && (
                    <button
                      onClick={() => {
                        setSelectedActivity(null);
                        router.push(`/property/${selectedActivity.id}`);
                      }}
                      className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
                    >
                      View Property →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}