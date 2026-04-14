"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, Settings, UserCircle, ChevronDown, Home, Heart, Clock } from "lucide-react";
import AuthManager from "@/components/Auth/AuthManager/AuthManager";
import { logout as logoutAPI } from "@/api/auth";

// Custom auth hook with event listeners for real-time updates
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "userData") {
        checkAuth();
      }
    };

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const logout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUser(null);
      window.dispatchEvent(new Event("authChange"));
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUser(null);
      window.dispatchEvent(new Event("authChange"));
    }
  };

  return { isLoggedIn, user, logout, isLoading };
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | "forgot-password">("login");
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/buy" },
    { label: "Sell", href: "/sell" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Service", href: "/service" },
  ];

  const userMenuItems = [
    { label: "My Profile", href: "/profile", icon: UserCircle },
    { label: "Saved Properties", href: "/saved", icon: Heart },
    { label: "My Activity", href: "/activity", icon: Clock },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        userButtonRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const openLogin = () => {
    setAuthView("login");
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const openSignup = () => {
    setAuthView("signup");
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const renderAuthSection = () => {
    if (isLoading) {
      return (
        <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      );
    }

    if (!isLoggedIn) {
      return (
        <button 
          onClick={openLogin}
          className={`px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-all cursor-pointer active:scale-95 rounded-md ${
            isScrolled
              ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
              : "text-white border border-white/30 hover:bg-white/10"
          }`}
        >
          Login
        </button>
      );
    }

    return (
      <div className="relative">
        <button
          ref={userButtonRef}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
            isScrolled
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm font-medium">
            {user?.name?.split(" ")[0] || "User"}
          </span>
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* User Dropdown Menu */}
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              ref={userMenuRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <Icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderMobileAuthButton = () => {
    if (isLoading) {
      return (
        <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
      );
    }

    if (!isLoggedIn) {
      return (
        <button 
          onClick={openLogin}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer active:scale-95 rounded-md ${
            isScrolled
              ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
              : "text-white border border-white/30 hover:bg-white/10"
          }`}
        >
          Login
        </button>
      );
    }

    return (
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10"
      >
        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
          <User size={12} className="text-white" />
        </div>
        <span className="text-xs font-medium text-white">
          {user?.name?.split(" ")[0] || "User"}
        </span>
      </button>
    );
  };

  const renderMobileMenuContent = () => {
    if (isLoading) {
      return (
        <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      );
    }

    if (!isLoggedIn) {
      return (
        <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
          <button 
            onClick={openSignup}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 cursor-pointer active:scale-95"
          >
            Create Account
          </button>
        </div>
      );
    }

    return (
      <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
        <div className="mb-3 px-3 py-2 rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>
          </div>
        </div>
        
        {userMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
        
        <button 
          onClick={handleLogout}
          className="w-full mt-2 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-0"
            : "bg-transparent py-0"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
          }`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`flex items-center space-x-2 font-bold transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-800 hover:text-gray-600"
                    : "text-white hover:text-white/80"
                }`}
              >
                <div className="flex items-center">
                  <div className={`rounded-lg border flex items-center justify-center transition-all duration-300 ${
                    isScrolled
                      ? "h-6 w-6 sm:h-7 sm:w-7 border-gray-300 bg-gray-800"
                      : "h-7 w-7 sm:h-8 sm:w-8 border-white/30"
                  }`}>
                    <span className={`font-bold text-xs sm:text-sm ${
                      isScrolled ? "text-white" : "text-white"
                    }`}>
                      L
                    </span>
                  </div>
                  <span className={`ml-2 text-lg sm:text-xl transition-all duration-300 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}>
                    <span className="hidden xs:inline">Luminor</span>
                    <span className="xs:hidden"></span>
                    <span className="hidden sm:inline">Luminor </span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-0 lg:space-x-1">
              <div className="flex items-center space-x-0 lg:space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={`h-5 lg:h-6 w-px mx-1 lg:mx-2 ${
                isScrolled ? "bg-gray-300" : "bg-white/30"
              }`}></div>

              {renderAuthSection()}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
              {renderMobileAuthButton()}
              <button
                className={`inline-flex items-center justify-center rounded-md p-1.5 sm:p-2 transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white hover:text-white/80 hover:bg-white/10"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <Menu size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-14 sm:top-16 bg-white shadow-lg transition-all duration-300 ease-in-out border-t border-gray-200 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]"
              : "opacity-0 -translate-y-4 invisible h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-3 sm:py-4 h-full overflow-y-auto">
            <div className="space-y-1 sm:space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {renderMobileMenuContent()}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible top-14 sm:top-16"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Auth Popups */}
      <AuthManager
        initialView={authView}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};

export default Navbar;