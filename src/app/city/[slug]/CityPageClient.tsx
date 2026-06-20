"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, Building, AlertTriangle, PlusCircle, Check, Award, ShieldCheck, MapPin } from "lucide-react";
import { City, categories, businesses, Business } from "@/data/mockData";
import BusinessCard from "@/components/shared/BusinessCard";

interface CityPageClientProps {
  city: City;
}

export default function CityPageClient({ city }: CityPageClientProps) {
  // Local filter states
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter listings
  const filteredAndSortedListings = useMemo(() => {
    // 1. Get listings inside this city
    let list = businesses.filter((b) => b.citySlug === city.slug);

    // 2. Filter by category slug
    if (selectedCategorySlug !== "All") {
      list = list.filter((b) => b.categorySlug === selectedCategorySlug);
    }

    // 3. Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.area.toLowerCase().includes(term) ||
          b.features.some((f) => f.toLowerCase().includes(term))
      );
    }

    // 4. Filter by verification
    if (verifiedOnly) {
      list = list.filter((b) => b.isVerified);
    }

    // 5. Filter by rating
    if (minRating > 0) {
      list = list.filter((b) => b.rating >= minRating);
    }

    // 6. Sort
    list.sort((a, b) => {
      if (sortBy === "reviews") {
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === "experience") {
        const getExpYears = (exp: string) => parseInt(exp.replace(/\D/g, "")) || 0;
        return getExpYears(b.experience) - getExpYears(a.experience);
      }
      return b.rating - a.rating;
    });

    return list;
  }, [city.slug, selectedCategorySlug, searchTerm, verifiedOnly, minRating, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategorySlug("All");
    setVerifiedOnly(false);
    setMinRating(0);
    setSortBy("rating");
    setSearchTerm("");
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-16">
      
      {/* City Hero Header */}
      <section className="relative h-72 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden">
        <img
          src={city.bannerImage}
          alt={city.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                <span>Featured City Directory</span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                Verified Local Services in {city.name}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {city.description} Connect with background-checked local professionals without paying single broker fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Shortcut Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider mb-4">Popular Categories in {city.name}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {/* All button */}
          <button
            onClick={() => setSelectedCategorySlug("All")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              selectedCategorySlug === "All"
                ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                : "bg-white border-slate-200 text-brand-dark hover:bg-slate-50"
            }`}
          >
            All Services
          </button>
          
          {/* Categories buttons */}
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategorySlug(cat.slug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                selectedCategorySlug === cat.slug
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                  : "bg-white border-slate-200 text-brand-dark hover:bg-slate-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Search Panel & Mobile Filter Toggle */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="relative w-full flex-1 flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-colors">
            <Search className="h-4.5 w-4.5 text-brand-gray mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder={`Search verified listings in ${city.name} by service area, name...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-brand-dark placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="text-xs text-brand-gray hover:text-primary font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-brand-dark border border-slate-200 px-5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 lg:hidden cursor-pointer shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters & Sort</span>
          </button>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters (Grid 3) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-5">
              
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-brand-dark uppercase tracking-wider">Sort & Filters</h3>
                <button 
                  onClick={resetAllFilters}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Sort selector */}
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Sort Results</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-brand-dark font-medium cursor-pointer"
                >
                  <option value="rating">Top Rated Partners</option>
                  <option value="reviews">Most Reviewed Partners</option>
                  <option value="experience">Most Experienced Partners</option>
                </select>
              </div>

              {/* Verified filter */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-brand-dark font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={() => setVerifiedOnly(!verifiedOnly)}
                    className="rounded text-primary focus:ring-primary border-slate-300 h-4 w-4 cursor-pointer"
                  />
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4.5 text-emerald-500 shrink-0" />
                    <span>Verified Partners Only</span>
                  </span>
                </label>
              </div>

              {/* Rating filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Minimum Rating</label>
                <div className="flex flex-col gap-1">
                  {[4.7, 4.4, 4.0].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(star === minRating ? 0 : star)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl border transition-colors flex items-center justify-between ${
                        minRating === star
                          ? "bg-primary/5 border-primary text-primary font-bold"
                          : "bg-white border-transparent text-brand-dark hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">★ {star.toFixed(1)} & Above</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Directory Listings list (Grid 9) */}
          <div className="lg:col-span-9 flex flex-col gap-5">
            
            {/* List count summary */}
            <div className="flex items-center justify-between text-xs text-brand-gray font-semibold px-1">
              <span>Showing {filteredAndSortedListings.length} listings in {city.name}</span>
            </div>

            {/* Listings loop */}
            {filteredAndSortedListings.length > 0 ? (
              filteredAndSortedListings.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))
            ) : (
              /* Empty state layout */
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center gap-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="h-16 w-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-dark mb-1">No Listings Found</h3>
                  <p className="text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                    No business or service partners were found matching your search. Try resetting filters to display all local providers in **{city.name}**.
                  </p>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/10 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Floating CTA Listing Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-blue-700 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-60 h-60 rounded-full bg-white/10 blur-2xl -z-10" />
          
          <div className="flex flex-col gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Do you operate in {city.name}?</h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl font-medium leading-relaxed">
              Register your local service business on TodayFix.in today. Get verified, gain client trust, and acquire local leads directly.
            </p>
          </div>
          
          <button
            onClick={() => alert("Opening listing onboarding wizard...")}
            className="bg-white hover:bg-slate-50 text-primary px-6 py-3.5 rounded-xl text-xs font-extrabold shadow-lg transition-all-custom shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>Add Business Listing</span>
          </button>
        </div>
      </section>

      {/* Mobile Drawer Filter Overlay */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Filter Panel */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl z-50 p-6 overflow-y-auto animate-in slide-in-from-bottom duration-300 lg:hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-extrabold text-brand-dark">Search Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Done
              </button>
            </div>
            
            <div className="flex flex-col gap-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Category Filter</label>
                <select
                  value={selectedCategorySlug}
                  onChange={(e) => setSelectedCategorySlug(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-brand-dark font-medium"
                >
                  <option value="All">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-brand-dark font-medium"
                >
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>

              {/* Verified Checkbox */}
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-brand-dark font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={() => setVerifiedOnly(!verifiedOnly)}
                    className="rounded text-primary focus:ring-primary border-slate-300 h-4 w-4"
                  />
                  <span>Verified Partners Only</span>
                </label>
              </div>

              {/* Min rating */}
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Min Rating</label>
                <div className="flex items-center gap-2">
                  {[4.7, 4.4, 4.0].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(star === minRating ? 0 : star)}
                      className={`flex-1 px-3 py-2 text-xs border rounded-xl text-center font-bold transition-colors ${
                        minRating === star ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-brand-dark"
                      }`}
                    >
                      ★ {star.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
