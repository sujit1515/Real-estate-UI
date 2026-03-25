"use client";

import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";

type AuthView = "login" | "signup" | "forgot-password" | "reset-password" | null;

interface AuthManagerProps {
  initialView?: AuthView;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthManager({
  initialView = "login",
  isOpen,
  onClose,
}: AuthManagerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [resetEmail, setResetEmail] = useState("");

  // Function to dispatch auth change event
  const dispatchAuthChange = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('authChange'));
      console.log("Auth change event dispatched"); // For debugging
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentView(initialView);
      setResetEmail("");
    }, 300);
  };

  const handleLoginSuccess = () => {
    console.log("Login success, dispatching authChange event");
    dispatchAuthChange();
    handleClose();
  };

  const handleSignupSuccess = () => {
    console.log("Signup success, dispatching authChange event");
    dispatchAuthChange();
    handleClose();
  };

  const switchToLogin = () => setCurrentView("login");
  const switchToSignup = () => setCurrentView("signup");
  const switchToForgotPassword = () => {
    setResetEmail("");
    setCurrentView("forgot-password");
  };
  const switchToResetPassword = (email: string) => {
    setResetEmail(email);
    setCurrentView("reset-password");
  };

  return (
    <>
      <Login
        isOpen={isOpen && currentView === "login"}
        onClose={handleClose}
        onSwitchToSignup={switchToSignup}
        onSwitchToForgotPassword={switchToForgotPassword}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignUp
        isOpen={isOpen && currentView === "signup"}
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
        onSignupSuccess={handleSignupSuccess}
      />

      <ForgotPassword
        isOpen={isOpen && currentView === "forgot-password"}
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
        onSwitchToResetPassword={switchToResetPassword}
      />

      <ResetPassword
        isOpen={isOpen && currentView === "reset-password"}
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
        email={resetEmail}
      />
    </>
  );
}