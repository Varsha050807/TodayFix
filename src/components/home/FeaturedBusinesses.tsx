"use client";

import React, { useState } from "react";
import { Star, ShieldAlert, Check, Phone, ShieldCheck, MapPin, Award, Clock } from "lucide-react";

export default function FeaturedBusinesses() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Home Services", "Technical Services", "Health & Wellness"];

  const businesses = [
    {
      name: "Apex Plumbing & Leak Fixers",
      category: "Home Services",
      rating: 4.9,
      reviews: 142,
      location: "Sector 62, Noida",
      phone: "+91 98765 43210",
      isVerified: true,
      isAssured: true,
      experience: "8 Yrs Exp",
      status: "Open Now",
      features: ["Emergency plumber", "24/7 Service", "No visit charges"],
    },
    {
      name: "QuickVolt Electrical Services",
      category: "Home Services",
      rating: 4.8,
      reviews: 96,
      location: "HSR Layout, Bangalore",
      phone: "+91 87654 32109",
      isVerified: true,
      isAssured: true,
      experience: "5 Yrs Exp",
      status: "Open Now",
      features: ["Wiring & Short circuits", "Licensed staff", "100% Safety Guarantee"],
    },
    {
      name: "PixelCraft Digital Web Agency",
      category: "Technical Services",
      rating: 4.9,
      reviews: 188,
      location: "Bandra West, Mumbai",
      phone: "+91 76543 21098",
      isVerified: true,
      isAssured: false,
      experience: "10 Yrs Exp",
      status: "Open Now",
      features: ["Web Design", "App Development", "SEO & Marketing"],
    },
    {
      name: "Elite Pest Shield Solutions",
      category: "Home Services",
      rating: 4.7,
      reviews: 64,
      location: "Salt Lake, Kolkata",
      phone: "+91 65432 10987",
      isVerified: true,
      isAssured: true,
      experience: "6 Yrs Exp",
      status: "Open Now",
      features: ["Eco-friendly sprays", "Termite control", "Free inspection"],
    },
    {
      name: "CareFirst Dental Clinic",
      category: "Health & Wellness",
      rating: 4.9,
      reviews: 215,
      location: "Indiranagar, Bangalore",
      phone: "+91 54321 09876",
      isVerified: true,
      isAssured: true,
      experience: "12 Yrs Exp",
      status: "Open Now",
      features: ["Certified Dentists", "Modern Clinic", "Prior Appointments"],
    },
    {
      name: "FitLife Personal Training Studio",
      category: "Health & Wellness",
      rating: 4.6,
      reviews: 82,
      location: "Saket, New Delhi",
      phone: "+91 43210 98765",
      isVerified: true,
      isAssured: false,
      experience: "4 Yrs Exp",
      status: "Closed",
      features: ["Certified Trainers", "Custom Diet Plans", "Modern Gym Equipment"],
    },
  ];

  const filteredBusinesses = activeTab === "All"
    ? businesses
    : businesses.filter(b => b.category === activeTab);

  const handleCall = (name: string, phone: string) => {
    alert(`Calling ${name} at ${phone}`);
  };

  const handleQuote = (name: string) => {
    alert(`Requesting free quote from ${name}`);
  };

  return (
    <section id="featured" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>Top Featured Businesses</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark">
            TodayFix Assured Service Partners
          </h2>
          <p className="mt-3 text-sm text-brand-gray">
            These professionals are selected, vetted, and backed by our TodayFix quality trust stamp.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${activeTab === tab
                ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
                : "bg-white border-slate-200 text-brand-dark hover:bg-slate-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Directory Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Body */}
              <div className="p-6">

                {/* Header Row: Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-lg">
                    {biz.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {biz.isAssured && (
                      <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        <Award className="h-3 w-3" />
                        <span>Assured</span>
                      </span>
                    )}
                    {biz.isVerified && (
                      <span className="flex items-center gap-0.5 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Business Name */}
                <h3 className="text-lg font-bold text-brand-dark hover:text-primary transition-colors line-clamp-1 mb-2">
                  {biz.name}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-white" />
                    <span>{biz.rating}</span>
                  </div>
                  <span className="text-xs text-brand-gray font-semibold">
                    ({biz.reviews} Verified Reviews)
                  </span>
                </div>

                {/* Address & Status Info */}
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-brand-gray font-medium">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{biz.location}</span>
                    <span className="text-slate-300">•</span>
                    <span>{biz.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-gray font-medium">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className={biz.status === "Open Now" ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
                      {biz.status}
                    </span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {biz.features.map((feat) => (
                    <span key={feat} className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md flex items-center gap-1">
                      <Check className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 pb-6 pt-3 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => handleCall(biz.name, biz.phone)}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-xs font-bold transition-all-custom flex items-center justify-center gap-1.5 shadow-md shadow-primary/15 cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Partner</span>
                </button>
                <button
                  onClick={() => handleQuote(biz.name)}
                  className="flex-1 bg-white hover:bg-slate-50 text-brand-dark border border-slate-200 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span>Get Quote</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
