// app/contact-agent/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock,
  Send,
  CheckCircle,
  Home,
  Star,
  Shield,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: string;
  bestTime: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  image: string;
  specialties: string[];
  languages: string[];
}

// Separate component that uses useSearchParams
function ContactAgentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const propertyName = searchParams.get("propertyName") || "this property";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: `Inquiry about ${propertyName}`,
    message: "",
    preferredContact: "email",
    bestTime: "anytime"
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Mock agent data - replace with API call
  const agents: Agent[] = [
    {
      id: "1",
      name: "Suryakanta Das",
      role: "Senior Real Estate Consultant",
      experience: "15+ Years",
      rating: 4.9,
      reviews: 128,
      phone: "+91 9348185822",
      email: "suryakanta@luminor.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      specialties: ["Luxury Homes", "Investment Properties", "Beachfront Estates"],
      languages: ["English", "Hindi", "Odia"]
    },
    {
      id: "2",
      name: "Jyotirmayee Panda",
      role: "Property Valuation Expert",
      experience: "10+ Years",
      rating: 4.8,
      reviews: 96,
      phone: "+91 9348185823",
      email: "jyotirmayee@luminor.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      specialties: ["Property Valuation", "Market Analysis", "Investment Advisory"],
      languages: ["English", "Hindi", "Odia"]
    },
    {
      id: "3",
      name: "Satyabrata Rout",
      role: "Legal & Documentation Expert",
      experience: "12+ Years",
      rating: 4.9,
      reviews: 112,
      phone: "+91 9348185824",
      email: "satyabrata@luminor.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      specialties: ["Legal Compliance", "Documentation", "RERA Expert"],
      languages: ["English", "Hindi", "Odia"]
    }
  ];

  useEffect(() => {
    // Auto-select first agent or based on property type
    setSelectedAgent(agents[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", { ...formData, agent: selectedAgent });
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        router.push("/");
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
          }}
        />
        <div className="fixed inset-0 bg-black/60" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 max-w-md"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-gray-300 mb-4">
              Thank you for reaching out. Our agent will contact you shortly.
            </p>
            <p className="text-sm text-gray-400">Redirecting to home page...</p>
          </motion.div>
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
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Contact Our <span className="text-purple-400">Agent</span>
            </h1>
            <p className="text-gray-300 mt-2">
              Get expert assistance for your real estate needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agent Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden sticky top-24">
                <div className="p-6 text-center border-b border-white/20">
                  <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-purple-400">
                    {selectedAgent?.image ? (
                      <img src={selectedAgent.image} alt={selectedAgent.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-purple-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedAgent?.name}</h3>
                  <p className="text-purple-400 text-sm mt-1">{selectedAgent?.role}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm">{selectedAgent?.rating}</span>
                    <span className="text-gray-400 text-sm">({selectedAgent?.reviews} reviews)</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Experience</p>
                    <p className="text-white">{selectedAgent?.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent?.specialties.map((specialty, index) => (
                        <span key={index} className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent?.languages.map((language, index) => (
                        <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <a
                      href={`tel:${selectedAgent?.phone}`}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors mb-3"
                    >
                      <Phone className="w-4 h-4" />
                      {selectedAgent?.phone}
                    </a>
                    <a
                      href={`mailto:${selectedAgent?.email}`}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedAgent?.email}
                    </a>
                  </div>
                </div>

                {/* Agent Stats */}
                <div className="grid grid-cols-3 gap-4 p-6 border-t border-white/20 bg-white/5">
                  <div className="text-center">
                    <Home className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold">500+</p>
                    <p className="text-xs text-gray-400">Properties Sold</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold">100%</p>
                    <p className="text-xs text-gray-400">Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold">Top</p>
                    <p className="text-xs text-gray-400">Agent</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Best Time to Contact
                      </label>
                      <select
                        name="bestTime"
                        value={formData.bestTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      >
                        <option value="anytime">Anytime</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                    Your information will be kept confidential.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Other Agents Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold text-white mb-6 text-center">Our Expert Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.filter(a => a.id !== selectedAgent?.id).map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center overflow-hidden">
                      {agent.image ? (
                        <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{agent.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function ContactAgentLoading() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80')`,
        }}
      />
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading contact information...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ContactAgentPage() {
  return (
    <Suspense fallback={<ContactAgentLoading />}>
      <ContactAgentContent />
    </Suspense>
  );
}