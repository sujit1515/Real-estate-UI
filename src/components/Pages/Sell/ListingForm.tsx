"use client";
import { useState, useRef, FormEvent } from "react";
import { addRoom } from "@/api/sell"; // Adjust the import path as needed

const PROPERTY_TYPES = [
  "Single Family Estate",
  "Luxury Condo",
  "Penthouse",
  "Townhouse",
  "Villa",
  "Architectural Masterpiece",
];

export default function ListingForm() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "Single Family Estate",
    constructionYear: "",
    price: "",
  });
  
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2.5);
  const [sqft, setSqft] = useState("2850");
  const [images, setImages] = useState([null, null, null, null]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImgs = [...images];
    Array.from(files).slice(0, 4).forEach((file, i) => {
      const url = URL.createObjectURL(file);
      const slot = newImgs.findIndex((s) => s === null);
      if (slot !== -1) newImgs[slot] = url;
    });
    setImages(newImgs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Clean sqft value (remove commas if any)
    const cleanSqft = parseInt(sqft.replace(/,/g, ''));

    // Prepare data for API
    const propertyData = {
      title: formData.title || `${formData.propertyType} in ${formData.city}`, // Fallback title
      location: `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      streetAddress: formData.streetAddress,
      squareFeet: cleanSqft,
      price: parseFloat(formData.price) || 0,
      isAvailable: true,
      // Note: bedrooms, bathrooms, propertyType, constructionYear, and images
      // are not in the current API schema. You may need to update your backend
      // or store these in a metadata field
    };

    try {
      const response = await addRoom(propertyData);
      console.log('Property added successfully:', response);
      setSubmitStatus({
        type: 'success',
        message: 'Property submitted for valuation successfully!'
      });
      
      // Optionally reset form here
      // resetForm();
      
    } catch (error) {
      console.error('Error submitting property:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit property. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Status Message */}
      {submitStatus && (
        <div className={`p-4 rounded-lg ${
          submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {/* ── 01. Location Intelligence ── */}
      <section>
        <SectionTitle number="01" title="Location Intelligence" />
        <div className="flex flex-col gap-4 mt-5">
          <div>
            <FieldLabel>Property Title</FieldLabel>
            <Input 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Stunning Architectural Masterpiece" 
            />
          </div>
          <div>
            <FieldLabel>Property Street Address</FieldLabel>
            <Input 
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="e.g. 742 Architectural Way" 
              required
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-[1fr_100px_100px] gap-3">
            <div>
              <FieldLabel>City</FieldLabel>
              <Input 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Los Angeles" 
                required
              />
            </div>
            <div>
              <FieldLabel>State</FieldLabel>
              <Input 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="CA" 
                required
              />
            </div>
            <div>
              <FieldLabel>ZIP</FieldLabel>
              <Input 
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="90210" 
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. Architectural Blueprint ── */}
      <section>
        <SectionTitle number="02" title="Architectural Blueprint" />
        <div className="flex flex-col gap-5 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Property Typology</FieldLabel>
              <div className="relative">
                <select 
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg px-4 py-3 text-[14px] text-[#111118] appearance-none outline-none focus:border-[#111118] transition-colors pr-10"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6b6f7a]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <FieldLabel>Construction Year</FieldLabel>
              <Input 
                name="constructionYear"
                value={formData.constructionYear}
                onChange={handleInputChange}
                placeholder="2022" 
                type="number" 
              />
            </div>
          </div>

          {/* Bedrooms / Bathrooms / Sqft */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Bedrooms */}
            <div>
              <FieldLabel>Bedrooms</FieldLabel>
              <div className="flex items-center justify-between bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg px-3 py-2.5">
                <button type="button" onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} className="w-7 h-7 flex items-center justify-center text-[#111118] text-lg font-light hover:bg-white rounded-md transition-colors">−</button>
                <span className="text-[15px] font-semibold text-[#111118]">{bedrooms}</span>
                <button type="button" onClick={() => setBedrooms(bedrooms + 1)} className="w-7 h-7 flex items-center justify-center text-[#111118] text-lg font-light hover:bg-white rounded-md transition-colors">+</button>
              </div>
            </div>
            {/* Bathrooms */}
            <div>
              <FieldLabel>Bathrooms</FieldLabel>
              <div className="flex items-center justify-between bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg px-3 py-2.5">
                <button type="button" onClick={() => setBathrooms(Math.max(1, bathrooms - 0.5))} className="w-7 h-7 flex items-center justify-center text-[#111118] text-lg font-light hover:bg-white rounded-md transition-colors">−</button>
                <span className="text-[15px] font-semibold text-[#111118]">{bathrooms}</span>
                <button type="button" onClick={() => setBathrooms(bathrooms + 0.5)} className="w-7 h-7 flex items-center justify-center text-[#111118] text-lg font-light hover:bg-white rounded-md transition-colors">+</button>
              </div>
            </div>
            {/* Sqft */}
            <div>
              <FieldLabel>Total Square Footage</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="w-full bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg px-4 py-3 text-[14px] text-[#111118] outline-none focus:border-[#111118] transition-colors pr-14"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#6b6f7a] tracking-wide">SQ FT</span>
              </div>
            </div>
          </div>

          {/* Price Field */}
          <div>
            <FieldLabel>Asking Price ($)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#6b6f7a]">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="1,250,000"
                className="w-full bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg pl-8 pr-4 py-3 text-[14px] text-[#111118] placeholder:text-[#b0b3be] outline-none focus:border-[#111118] transition-colors"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. Visual Narrative ── */}
      <section>
        <SectionTitle number="03" title="Visual Narrative" />
        <div className="flex flex-col gap-4 mt-5">
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
            className={`border-2 border-dashed rounded-xl py-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
              ${dragActive ? "border-[#111118] bg-gray-50" : "border-[#d4d6de] bg-[#f9f9fb] hover:border-[#aeb0ba]"}`}
          >
            <div className="w-10 h-10 rounded-full bg-[#111118] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[14px] font-semibold text-[#111118]">Upload High-Resolution Assets</p>
              <p className="text-[12px] text-[#6b6f7a] mt-0.5">Drag and drop or click to browse (Min 3000px wide recommended)</p>
            </div>
            <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all
                  ${img ? "border-[#111118]" : "border-[#e2e4ea] bg-[#f5f6f8]"}`}
              >
                {img ? (
                  <img src={img} alt={`upload ${i}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#d4d6de]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#111118] text-white font-semibold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 transition-colors
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a2a38]'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit for Valuation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
          <p className="text-center text-[10px] tracking-[0.1em] uppercase text-[#6b6f7a] mt-3">
            By submitting, you agree to the Architectural Integrity Terms.
          </p>
        </div>
      </section>
    </form>
  );
}

function SectionTitle({ number, title }) {
  return (
    <h2 className="font-serif text-[20px] font-bold text-[#111118]">
      <span className="text-[#6b6f7a] font-normal mr-1">{number}.</span> {title}
    </h2>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6b6f7a] mb-1.5">
      {children}
    </label>
  );
}

function Input({ placeholder, type = "text", name, value, onChange, required = false }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#f5f6f8] border border-[#e2e4ea] rounded-lg px-4 py-3 text-[14px] text-[#111118] placeholder:text-[#b0b3be] outline-none focus:border-[#111118] transition-colors"
    />
  );
}