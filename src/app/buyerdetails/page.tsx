"use client";

import { useState, useRef } from "react";

export default function BuyerDetails() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    residence: "",
  });
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#F4F3EF] font-['Cormorant_Garamond',serif] flex flex-col">
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
      <main className="flex-1 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-10 md:py-14 max-w-5xl mx-auto w-full">

        {/* Header row */}
        <div className="mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#1B2B4B] leading-tight">
              Buyer <span className="text-[#4A6FA5] italic">Details</span>
            </h1>
            <p className="mt-3 dm text-sm text-[#6B6B60] leading-relaxed max-w-xs">
              Complete your profile to formalize the acquisition process. All data is encrypted and managed under strict fiduciary standards.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#E3E1D9] rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">

            {/* Full Legal Name */}
            <div className="flex flex-col gap-1.5">
              <label className="dm text-[10px] tracking-[0.2em] uppercase text-[#4A4A42] font-medium">
                Full Legal Name
              </label>
              <input
                type="text"
                placeholder="Johnathan Q. Architect"
                value={form.fullName}
                onChange={handleChange("fullName")}
                className="dm text-sm border border-[#E3E1D9] rounded-lg px-4 py-3 bg-[#FAFAF8] text-[#1B2B4B] placeholder-[#9E9D97] focus:outline-none focus:border-[#1B2B4B] focus:ring-1 focus:ring-[#1B2B4B] transition-all"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="dm text-[10px] tracking-[0.2em] uppercase text-[#4A4A42] font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange("phone")}
                className="dm text-sm border border-[#E3E1D9] rounded-lg px-4 py-3 bg-[#FAFAF8] text-[#1B2B4B] placeholder-[#9E9D97] focus:outline-none focus:border-[#1B2B4B] focus:ring-1 focus:ring-[#1B2B4B] transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="dm text-[10px] tracking-[0.2em] uppercase text-[#4A4A42] font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="j.architect@trust.com"
                value={form.email}
                onChange={handleChange("email")}
                className="dm text-sm border border-[#E3E1D9] rounded-lg px-4 py-3 bg-[#FAFAF8] text-[#1B2B4B] placeholder-[#9E9D97] focus:outline-none focus:border-[#1B2B4B] focus:ring-1 focus:ring-[#1B2B4B] transition-all"
              />
            </div>

            {/* Residence */}
            <div className="flex flex-col gap-1.5">
              <label className="dm text-[10px] tracking-[0.2em] uppercase text-[#4A4A42] font-medium">
                Primary Residence
              </label>
              <input
                type="text"
                placeholder="123 Drafting Lane, NY"
                value={form.residence}
                onChange={handleChange("residence")}
                className="dm text-sm border border-[#E3E1D9] rounded-lg px-4 py-3 bg-[#FAFAF8] text-[#1B2B4B] placeholder-[#9E9D97] focus:outline-none focus:border-[#1B2B4B] focus:ring-1 focus:ring-[#1B2B4B] transition-all"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-8">
            <label className="dm text-[10px] tracking-[0.2em] uppercase text-[#4A4A42] font-medium block mb-2">
              Identity Verification (ID Proof)
            </label>
            <div
              className={`upload-zone border-2 border-dashed rounded-xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer bg-[#FAFAF8] ${dragActive ? "active border-[#1B2B4B] bg-[#EAE9E3]" : "border-[#D0CEC6]"}`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#1B2B4B] flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="dm text-sm text-[#1B2B4B] font-medium">{uploadedFile.name}</p>
                  <p className="dm text-xs text-[#9E9D97]">{(uploadedFile.size / 1024).toFixed(1)} KB · Click to replace</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-[#1B2B4B] flex items-center justify-center mb-3">
                    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="dm text-sm text-[#1B2B4B] font-medium">Click to upload or drag and drop</p>
                  <p className="dm text-xs text-[#9E9D97] mt-1">PDF, JPG or PNG (Max 10MB)</p>
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
                className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${agreed ? "bg-[#1B2B4B] border-[#1B2B4B]" : "border-[#D0CEC6] bg-white group-hover:border-[#1B2B4B]"}`}
              >
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="dm text-xs text-[#6B6B60] leading-relaxed">
                I confirm that all provided information is accurate and I agree to the{" "}
                <a href="#" className="text-[#1B2B4B] underline underline-offset-2 hover:text-[#4A6FA5]">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#1B2B4B] underline underline-offset-2 hover:text-[#4A6FA5]">Privacy Policy</a>{" "}
                of The Architectural Trust.
              </span>
            </label>

            {/* Continue */}
            <button
              className="continue-btn dm flex-shrink-0 bg-[#1B2B4B] text-white text-sm font-medium px-7 py-3.5 rounded-xl flex items-center gap-2.5 w-full sm:w-auto justify-center"
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
  );
}