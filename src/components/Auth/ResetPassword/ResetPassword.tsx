"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowLeft, 
  Key,
  RefreshCw 
} from "lucide-react";
import { resetPassword } from "@/api/auth";

interface ResetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  email: string;
}

export default function ResetPasswordPopup({
  isOpen,
  onClose,
  onSwitchToLogin,
  email,
}: ResetPasswordPopupProps) {
  const [step, setStep] = useState<"otp" | "password">("otp");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    otp?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent pasting multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrors({ otp: "Please enter complete 6-digit OTP" });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, verify OTP with backend
      console.log("OTP verified for:", email);
      setStep("password");
    } catch (err) {
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setTimer(60);
    setIsLoading(true);

    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("OTP resent to:", email);
    } catch (err) {
      setErrors({ otp: "Failed to resend OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (pass: string) => {
    const requirements = [];
    if (pass.length < 8) requirements.push("at least 8 characters");
    if (!/[A-Z]/.test(pass)) requirements.push("one uppercase letter");
    if (!/[a-z]/.test(pass)) requirements.push("one lowercase letter");
    if (!/[0-9]/.test(pass)) requirements.push("one number");
    if (!/[!@#$%^&*]/.test(pass)) requirements.push("one special character (!@#$%^&*)");
    
    return requirements;
  };

 const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: typeof errors = {};
  const passwordReqs = validatePassword(password);

  if (passwordReqs.length > 0) {
    newErrors.password = `Password must contain ${passwordReqs.join(", ")}`;
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setIsLoading(true);

  try {
    const otpString = otp.join("");

    const res = await resetPassword({
      email,
      otp: otpString,
      password,
    });

    if (res.success) {
      setIsSubmitted(true);
    }

  } catch (err: any) {
    setErrors({
      password:
        err?.response?.data?.message ||
        "Failed to reset password. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    setStep("otp");
    setOtp(["", "", "", "", "", ""]);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsSubmitted(false);
    setErrors({});
    setTimer(60);
    setCanResend(false);
    onClose();
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-400' : 'text-gray-400'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-green-400' : 'bg-gray-400'}`} />
      {text}
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6 xs:mb-8">
                      <div className="bg-purple-600/20 w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {step === "otp" ? (
                          <Key className="text-purple-400" size={32} />
                        ) : (
                          <Lock className="text-purple-400" size={32} />
                        )}
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2"
                      >
                        {step === "otp" ? "Verify OTP" : "Reset Password"}
                      </Dialog.Title>
                      <p className="text-gray-400 text-sm xs:text-base">
                        {step === "otp" 
                          ? `We sent a 6-digit code to ${email}`
                          : "Create a new password for your account"}
                      </p>
                    </div>

                    {step === "otp" ? (
                      /* OTP Verification Step */
                      <div className="space-y-6">
                        {/* OTP Input Fields */}
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-4 text-center">
                            Enter 6-digit OTP
                          </label>
                          <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => {
                                  inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="w-12 h-12 xs:w-14 xs:h-14 text-center text-xl font-bold bg-[#1a1a2e] border border-purple-900/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                                disabled={isLoading}
                              />
                            ))}
                          </div>
                          {errors.otp && (
                            <p className="text-red-400 text-xs mt-2 text-center">{errors.otp}</p>
                          )}
                        </div>

                        {/* Timer and Resend */}
                        <div className="text-center">
                          {!canResend ? (
                            <p className="text-gray-400 text-sm">
                              Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                            </p>
                          ) : (
                            <button
                              onClick={handleResendOtp}
                              disabled={isLoading}
                              className="text-purple-400 hover:text-purple-300 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
                            >
                              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                              Resend OTP
                            </button>
                          )}
                        </div>

                        {/* Verify Button */}
                        <button
                          onClick={handleVerifyOtp}
                          disabled={isLoading || otp.join("").length !== 6}
                          className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            "Verify OTP"
                          )}
                        </button>
                      </div>
                    ) : (
                      /* Password Reset Step */
                      <form onSubmit={handleResetPassword} className="space-y-5">
                        {/* New Password */}
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({});
                              }}
                              placeholder="Enter new password"
                              className="w-full pl-11 pr-12 py-3 bg-[#1a1a2e] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                              required
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                              size={20}
                            />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors({});
                              }}
                              placeholder="Confirm new password"
                              className="w-full pl-11 pr-12 py-3 bg-[#1a1a2e] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                              required
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            >
                              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-[#1a1a2e] p-4 rounded-lg space-y-2">
                          <p className="text-gray-300 text-sm font-medium mb-2">Password must contain:</p>
                          <PasswordRequirement 
                            met={password.length >= 8} 
                            text="At least 8 characters" 
                          />
                          <PasswordRequirement 
                            met={/[A-Z]/.test(password)} 
                            text="One uppercase letter" 
                          />
                          <PasswordRequirement 
                            met={/[a-z]/.test(password)} 
                            text="One lowercase letter" 
                          />
                          <PasswordRequirement 
                            met={/[0-9]/.test(password)} 
                            text="One number" 
                          />
                          <PasswordRequirement 
                            met={/[!@#$%^&*]/.test(password)} 
                            text="One special character (!@#$%^&*)" 
                          />
                          <PasswordRequirement 
                            met={password === confirmPassword && password !== ""} 
                            text="Passwords match" 
                          />
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
                              Resetting Password...
                            </>
                          ) : (
                            "Reset Password"
                          )}
                        </button>
                      </form>
                    )}

                    {/* Back to Sign In */}
                    <button
                      onClick={onSwitchToLogin}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition mt-6 text-sm xs:text-base w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft size={18} />
                      Back to Sign In
                    </button>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center">
                    <div className="bg-green-600/20 w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-400" size={32} />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2"
                    >
                      Password Reset!
                    </Dialog.Title>
                    <p className="text-gray-400 text-sm xs:text-base mb-6">
                      Your password has been successfully reset
                    </p>
                    <p className="text-purple-400 font-medium text-sm xs:text-base mb-8">
                      You can now sign in with your new password
                    </p>
                    <button
                      onClick={onSwitchToLogin}
                      className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px]"
                    >
                      <ArrowLeft size={18} />
                      Go to Sign In
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}