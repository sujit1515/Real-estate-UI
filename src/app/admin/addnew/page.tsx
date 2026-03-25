"use client";

import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from "react";
import AppShell from "../../../components/Admin/AppShell";
import { ImagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addRoom } from "../../../api/admin"; 

interface FormState {
  title: string;
  location: string;
  rent: string;
  homeSize: string;
}

interface PhotoPreview {
  file: File;
  url: string;
}

const homeSizeOptions: string[] = [
  "Studio", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Villa", "Penthouse",
];

export default function AddNewPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({ title: "", location: "", rent: "", homeSize: "" });
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setPhotos((prev) => [...prev, ...valid.map((f) => ({ file: f, url: URL.createObjectURL(f) }))]);
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Convert frontend form → backend format
    const payload = {
      title: form.title,
      type: form.homeSize.replace(/\s+/g, ''), // "1 BHK" → "1BHK" (removes all spaces)
      price: Number(form.rent), // convert string → number
      location: form.location,
      description: "", // Add a description field if you have one, or make it optional
      // Add isAvailable if your backend expects it, but it's not in your example
    };

    const res = await addRoom(payload);

    alert("Listing saved successfully ✅");

    // Redirect after success
    router.push("/admin/dashboard");

  } catch (error: any) {
    console.error(error);
    alert(error?.response?.data?.message || "Error saving listing ❌");
  }
};

  return (
    <AppShell
      topbarProps={{
        title: "Add New Property",
        subtitle: "Enter the details of the property to create a new listing.",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-gray-500 mb-6">
          Enter the details of the property to create a new listing for prospective tenants.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="bg-[#16213e] rounded-2xl border border-[#1e2a47] shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold text-white mb-5">Property Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Property Title</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange}
                  placeholder="e.g. Modern Sunset Apartment" 
                  required
                  className="w-full bg-[#1e2a47] border border-[#2a3a5a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Location (Full Address)</label>
                <input 
                  name="location" 
                  value={form.location} 
                  onChange={handleChange}
                  placeholder="Street name, City, State, Zip Code" 
                  required
                  className="w-full bg-[#1e2a47] border border-[#2a3a5a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Monthly Rent ($)</label>
                  <div className="flex items-center bg-[#1e2a47] border border-[#2a3a5a] rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                    <span className="px-3 text-gray-500 text-sm bg-[#16213e] border-r border-[#2a3a5a] py-2.5">$</span>
                    <input 
                      name="rent" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={form.rent}
                      onChange={handleChange} 
                      placeholder="0.00" 
                      required
                      className="flex-1 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none bg-transparent" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Home Size</label>
                  <select 
                    name="homeSize" 
                    value={form.homeSize} 
                    onChange={handleChange} 
                    required
                    className="w-full bg-[#1e2a47] border border-[#2a3a5a] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none"
                  >
                    <option value="" disabled>Select configuration</option>
                    {homeSizeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#16213e] rounded-2xl border border-[#1e2a47] shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold text-white mb-5">Property Photos</h2>
            <div
              onDragOver={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 px-6 cursor-pointer transition-colors ${
                dragging 
                  ? "border-blue-500 bg-blue-500/10" 
                  : "border-[#2a3a5a] hover:border-blue-500/50 hover:bg-[#1e2a47]"
              }`}
            >
              <ImagePlus className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm text-gray-400">
                <span className="text-blue-400 font-medium">Upload files</span> or drag and drop
              </p>
              <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF up to 10MB each</p>
              <input 
                ref={fileRef} 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)} 
              />
            </div>
            
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square">
                    <img src={p.url} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="flex justify-end items-center gap-3 pb-4">
            <button 
              type="button" 
              onClick={() => router.push("/admin/dashboard")}
              className="text-sm text-gray-400 px-5 py-2.5 rounded-xl hover:bg-[#1e2a47] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Save Listing
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}