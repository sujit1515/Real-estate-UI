"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { forgotPassword } from "@/api/auth"; 

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToResetPassword: (email: string) => void; // Updated to pass email
}

export default function ForgotPasswordPopup({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToResetPassword,
}: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const res = await forgotPassword(email);

    if (res.success) {
      // Move to reset password popup
      onSwitchToResetPassword(email);
    }
  } catch (err: any) {
    setError(
      err?.response?.data?.message || "Failed to send OTP. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#252544] p-6 xs:p-8 sm:p-10 shadow-2xl transition-all border border-purple-900/30">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <div className="text-center mb-6 xs:mb-8">
                  <div className="bg-purple-600/20 w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-purple-400" size={32} />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2"
                  >
                    Forgot Password?
                  </Dialog.Title>
                  <p className="text-gray-400 text-sm xs:text-base">
                    Enter your email and we'll send you an OTP to reset your password
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3 bg-[#1a1a2e] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Sign In */}
                <button
                  onClick={onSwitchToLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition mt-6 text-sm xs:text-base w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={18} />
                  Back to Sign In
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}