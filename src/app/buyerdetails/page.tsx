"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  residence: string;
}

export default function BuyerDetails() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    residence: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="relative min-h-screen font-['Cormorant_Garamond',serif] flex flex-col">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex-1">
        {/* Google Fonts */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          
          .dm { font-family: 'DM Sans', sans-serif; }
          
          input::placeholder { color: #9E9D97; }

          .upload-zone {
            transition: border-color 0.2s, background 0.2s;
          }
          .upload-zone.active {
            border-color: #1B2B4B;
            background: #EAE9E3;
          }

          .continue-btn {
            transition: background 0.2s, transform 0.15s;
          }
          .continue-btn:hover {
            background: #243a62;
            transform: translateX(2px);
          }
        `}</style>

        {/* MAIN */}
        <main className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-10 md:py-14 max-w-5xl mx-auto w-full">

          {/* Header row */}
          <div className="mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Buyer <span className="text-purple-300 italic">Details</span>
              </h1>
              <p className="mt-3 dm text-sm text-gray-200 leading-relaxed max-w-xs">
                Complete your profile to formalize the acquisition process. All data is encrypted and managed under strict fiduciary standards.
              </p>
            </div>
          </div>

          {/* Form card - Glass morphism effect */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">

              {/* Full Legal Name */}
              <div className="flex flex-col gap-1.5">
                <label className="dm text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="Johnathan Q. Architect"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  className="dm text-sm border border-white/20 rounded-lg px-4 py-3 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="dm text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="dm text-sm border border-white/20 rounded-lg px-4 py-3 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="dm text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="j.architect@trust.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="dm text-sm border border-white/20 rounded-lg px-4 py-3 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>

              {/* Residence */}
              <div className="flex flex-col gap-1.5">
                <label className="dm text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium">
                  Primary Residence
                </label>
                <input
                  type="text"
                  placeholder="123 Drafting Lane, NY"
                  value={form.residence}
                  onChange={handleChange("residence")}
                  className="dm text-sm border border-white/20 rounded-lg px-4 py-3 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="mt-8">
              <label className="dm text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium block mb-2">
                Identity Verification (ID Proof)
              </label>
              <div
                className={`upload-zone border-2 border-dashed rounded-xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer bg-white/5 ${dragActive ? "active border-purple-400 bg-white/20" : "border-white/30"}`}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                      <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="dm text-sm text-white font-medium">{uploadedFile.name}</p>
                    <p className="dm text-xs text-gray-400">{(uploadedFile.size / 1024).toFixed(1)} KB · Click to replace</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-3">
                      <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="dm text-sm text-white font-medium">Click to upload or drag and drop</p>
                    <p className="dm text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 10MB)</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Footer row */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${agreed ? "bg-purple-600 border-purple-600" : "border-white/40 bg-white/10 group-hover:border-purple-400"}`}
                >
                  {agreed && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="dm text-xs text-gray-300 leading-relaxed">
                  I confirm that all provided information is accurate and I agree to the{" "}
                  <a href="#" className="text-purple-300 underline underline-offset-2 hover:text-purple-200">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-300 underline underline-offset-2 hover:text-purple-200">Privacy Policy</a>{" "}
                  of The Architectural Trust.
                </span>
              </label>

              {/* Continue */}
              <button
                className="continue-btn dm flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-7 py-3.5 rounded-xl flex items-center gap-2.5 w-full sm:w-auto justify-center transition-all"
              >
                Continue
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}