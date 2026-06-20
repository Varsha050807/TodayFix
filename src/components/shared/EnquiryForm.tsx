"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

interface EnquiryFormProps {
  businessName: string;
}

export default function EnquiryForm({ businessName }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }
    
    if (!formData.message.trim()) tempErrors.message = "Requirements details are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div>
          <h4 className="text-base font-bold text-brand-dark mb-1">Enquiry Sent Successfully</h4>
          <p className="text-xs text-brand-gray leading-relaxed max-w-xs mx-auto">
            Your lead details have been shared with **{businessName}**. They will get back to you shortly over call or email.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs font-bold text-primary hover:underline cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md">
      <h3 className="text-base font-bold text-brand-dark mb-1">Send Free Enquiry</h3>
      <p className="text-xs text-brand-gray mb-5">Fill in your requirements to receive direct quotes from this partner.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Varsha Sharma"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3.5 py-3 text-xs bg-slate-50 border rounded-xl placeholder-slate-400 focus:outline-none transition-colors ${
              errors.name ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/10" : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.name && <span className="block text-[10px] text-red-500 mt-1 font-semibold">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3.5 py-3 text-xs bg-slate-50 border rounded-xl placeholder-slate-400 focus:outline-none transition-colors ${
              errors.email ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/10" : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.email && <span className="block text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</span>}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="e.g. 9876543210"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3.5 py-3 text-xs bg-slate-50 border rounded-xl placeholder-slate-400 focus:outline-none transition-colors ${
              errors.phone ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/10" : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.phone && <span className="block text-[10px] text-red-500 mt-1 font-semibold">{errors.phone}</span>}
        </div>

        {/* Requirements Text Field */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">What are you looking for?</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Describe your requirements (e.g. Shifting 2 BHK home, Modular kitchen setup, Termite treatment for living room...)"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-3.5 py-3 text-xs bg-slate-50 border rounded-xl placeholder-slate-400 focus:outline-none transition-colors resize-none ${
              errors.message ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/10" : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.message && <span className="block text-[10px] text-red-500 mt-1 font-semibold">{errors.message}</span>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/70 text-white py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all-custom flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
