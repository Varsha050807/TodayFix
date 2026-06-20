"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Search, MapPin, Sparkles, CheckCircle, TrendingUp } from "lucide-react";

export default function Hero() {
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const popularCities = ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(
      `/search?q=${encodeURIComponent(
        keyword
      )}&city=${encodeURIComponent(selectedCity)}`
    );
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-accent/70 via-accent/30 to-white overflow-hidden">

      {/* Background blur decorative element */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

        {/* Floating badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="h-3.5 w-3.5" />
          <span>India&apos;s Smartest Local Business Directory</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-dark mb-6 leading-[1.15] max-w-4xl mx-auto">
          Find Trusted <span className="text-primary bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">Local Services</span> & Experts Near You
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Get connected with verified plumbers, electricians, developers, and local stores. Verified ratings. Zero hassle.
        </p>

        {/* Search Panel Card */}
        <div className="max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-2 md:p-3 flex flex-col md:flex-row items-center gap-2"
          >

            {/* Location input */}
            <div className="relative w-full md:w-1/3 flex items-center gap-2.5 px-3 py-2 md:py-1 hover:bg-slate-50 rounded-xl transition-colors shrink-0">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-wider -mb-0.5">Location</label>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full text-left text-sm font-semibold text-brand-dark flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{selectedCity}</span>
                </button>
              </div>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <div className="absolute left-0 right-0 mt-36 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-20 text-left max-h-60 overflow-y-auto">
                    <p className="px-4 py-1 text-[10px] font-bold text-brand-gray uppercase tracking-wider">Serving Cities</p>
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${selectedCity === city ? "text-primary font-semibold bg-primary/5" : "text-brand-dark"
                          }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Separator line for desktop */}
            <div className="hidden md:block h-8 w-px bg-slate-200" />

            {/* Keyword Search Input */}
            <div className="w-full md:flex-1 flex items-center gap-2.5 px-3 py-2 md:py-1 hover:bg-slate-50 rounded-xl transition-colors">
              <Search className="h-5 w-5 text-brand-gray shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-wider -mb-0.5">Find Services</label>
                <input
                  type="text"
                  placeholder="e.g. Plumber, Pest Control, CA, Web Agency"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-dark placeholder-slate-400 focus:outline-none border-0 p-0 focus:ring-0"
                />
              </div>
            </div>

            {/* Action Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 md:py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all-custom flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
            >
              <Search className="h-4.5 w-4.5" />
              <span>Search Now</span>
            </button>

          </form>
        </div>

        {/* Feature quick badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-gray">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-100" />
            <span>100% Verified Providers</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-100" />
            <span>Direct Phone Call Contact</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-100" />
            <span>Zero Brokerage Fees</span>
          </div>
        </div>

      </div>
    </section>
  );
}
