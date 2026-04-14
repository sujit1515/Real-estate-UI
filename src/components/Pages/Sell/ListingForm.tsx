"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addProperty } from "@/api/sell";

const PROPERTY_TYPES = [
  "Single Family Estate",
  "Luxury Condo",
  "Penthouse",
  "Townhouse",
  "Villa",
  "Architectural Masterpiece",
] as const;

type PropertyType = (typeof PROPERTY_TYPES)[number];

interface FormFields {
  title: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: PropertyType;
  constructionYear: string;
  price: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

export default function ListingForm() {
  const [formData, setFormData] = useState<FormFields>({
    title: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "Single Family Estate",
    constructionYear: "",
    price: "",
  });

  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2.5);
  const [sqft, setSqft] = useState<string>("2850");

  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    Array.from(files)
      .slice(0, 4)
      .forEach((file) => {
        const slot = newPreviews.findIndex((s) => s === null);
        if (slot !== -1) {
          newFiles[slot] = file;
          newPreviews[slot] = URL.createObjectURL(file);
        }
      });

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]!);
    }

    newFiles[index] = null;
    newPreviews[index] = null;

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = new FormData();

    data.append(
      "title",
      formData.title || `${formData.propertyType} in ${formData.city}`
    );
    data.append("streetAddress", formData.streetAddress);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zipCode", formData.zipCode);
    data.append("propertyType", formData.propertyType);
    data.append("constructionYear", formData.constructionYear);
    data.append("price", formData.price);
    data.append("bedrooms", String(bedrooms));
    data.append("bathrooms", String(bathrooms));
    data.append("squareFeet", sqft.replace(/,/g, ""));

    imageFiles.forEach((file) => {
      if (file) {
        data.append("images", file);
      }
    });

    try {
      const response = await addProperty(data);
      console.log("Property added successfully:", response);
      setSubmitStatus({
        type: "success",
        message: "Property submitted for valuation successfully!",
      });

      setFormData({
        title: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        propertyType: "Single Family Estate",
        constructionYear: "",
        price: "",
      });
      setBedrooms(3);
      setBathrooms(2.5);
      setSqft("2850");
      setImageFiles([null, null, null, null]);
      setImagePreviews([null, null, null, null]);
    } catch (error: any) {
      console.error("Error submitting property:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to submit property. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block"
        >
          Sell Your Property
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mt-3 text-gray-900"
        >
          List Your Estate
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mt-3 max-w-2xl"
        >
          Provide your property details below and our team of experts will help
          you get the best market value.
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* Status Message */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 01. Location Details ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-5">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-purple-600 mr-2 inline-block"
            >
              01.
            </motion.span>{" "}
            Location Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                Property Title
              </label>
              <motion.input
                whileFocus="focus"
                variants={inputVariants}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Stunning Architectural Masterpiece"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                Street Address
              </label>
              <motion.input
                whileFocus="focus"
                variants={inputVariants}
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="742 Architectural Way"
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["City", "State", "ZIP Code"].map((label, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                    {label}
                  </label>
                  <motion.input
                    whileFocus="focus"
                    variants={inputVariants}
                    name={label.toLowerCase().replace(" ", "")}
                    value={
                      label === "City"
                        ? formData.city
                        : label === "State"
                        ? formData.state
                        : formData.zipCode
                    }
                    onChange={handleInputChange}
                    placeholder={label === "ZIP Code" ? "90210" : label === "City" ? "Los Angeles" : "CA"}
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 02. Property Details ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-5">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-purple-600 mr-2 inline-block"
            >
              02.
            </motion.span>{" "}
            Property Details
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                  Property Type
                </label>
                <motion.select
                  whileFocus="focus"
                  variants={inputVariants}
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </motion.select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                  Construction Year
                </label>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  name="constructionYear"
                  value={formData.constructionYear}
                  onChange={handleInputChange}
                  placeholder="2022"
                  type="number"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Bedrooms", "Bathrooms", "Square Footage"].map((label, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                >
                  <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                    {label}
                  </label>
                  {label === "Bedrooms" ? (
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                      >
                        −
                      </motion.button>
                      <motion.span
                        key={bedrooms}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {bedrooms}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setBedrooms(bedrooms + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  ) : label === "Bathrooms" ? (
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setBathrooms(Math.max(1, bathrooms - 0.5))}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                      >
                        −
                      </motion.button>
                      <motion.span
                        key={bathrooms}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {bathrooms}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setBathrooms(bathrooms + 0.5)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-14"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-400 tracking-wide">
                        SQ FT
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                Asking Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1,250,000"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 03. Property Images ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-5">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-purple-600 mr-2 inline-block"
            >
              03.
            </motion.span>{" "}
            Property Images
          </h3>

          {/* Drop Zone */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFiles(e.dataTransfer.files);
            }}
            animate={{
              borderColor: dragActive ? "#9333ea" : "#d1d5db",
              backgroundColor: dragActive ? "#faf5ff" : "#ffffff",
            }}
            transition={{ duration: 0.2 }}
            className={`border-2 border-dashed rounded-xl py-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                Upload Property Photos
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Drag and drop or click to browse (Max 4 images)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </motion.div>

          {/* Preview grid */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {imagePreviews.map((preview, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative
                  ${
                    preview
                      ? "border-purple-500"
                      : "border-gray-200 bg-gray-50"
                  }`}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt={`upload ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                      ×
                    </motion.button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Submit ── */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          className={`w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl
            ${isSubmitting ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}`}
        >
          {isSubmitting ? (
            <>
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </motion.svg>
              Submitting...
            </>
          ) : (
            <>
              Submit for Valuation
              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </motion.svg>
            </>
          )}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[10px] tracking-[0.1em] uppercase text-gray-400"
        >
          By submitting, you agree to our Terms of Service
        </motion.p>
      </form>
    </motion.div>
  );
}