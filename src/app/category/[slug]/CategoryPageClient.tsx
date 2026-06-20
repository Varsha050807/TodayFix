"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Info, Sparkles, Building, AlertTriangle, PlusCircle } from "lucide-react";
import { Category, businesses, Business } from "@/data/mockData";
import BusinessCard from "@/components/shared/BusinessCard";
import FilterSidebar, { FilterState } from "@/components/shared/FilterSidebar";

interface CategoryPageClientProps {
  category: Category;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    city: "All",
    verifiedOnly: false,
    minRating: 0,
    sortBy: "rating",
  });

  // Search input state
  const [searchTerm, setSearchTerm] = useState("");
  // Mobile drawer filter toggle state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    // 1. Get listings inside this category
    let list = businesses.filter((b) => b.categorySlug === category.slug);

    // 2. Filter by search term (name, area, features)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.area.toLowerCase().includes(term) ||
          b.features.some((f) => f.toLowerCase().includes(term))
      );
    }

    // 3. Filter by city
    if (filters.city !== "All") {
      list = list.filter((b) => b.city.toLowerCase() === filters.city.toLowerCase());
    }

    // 4. Filter by verification
    if (filters.verifiedOnly) {
      list = list.filter((b) => b.isVerified);
    }

    // 5. Filter by rating score
    if (filters.minRating > 0) {
      list = list.filter((b) => b.rating >= filters.minRating);
    }

    // 6. Sort listings
    list.sort((a, b) => {
      if (filters.sortBy === "reviews") {
        return b.reviewsCount - a.reviewsCount;
      }
      if (filters.sortBy === "experience") {
        const getExpYears = (exp: string) => parseInt(exp.replace(/\D/g, "")) || 0;
        return getExpYears(b.experience) - getExpYears(a.experience);
      }
      // Default: sort by rating
      return b.rating - a.rating;
    });

    return list;
  }, [category.slug, searchTerm, filters]);

  const resetAllFilters = () => {
    setFilters({
      city: "All",
      verifiedOnly: false,
      minRating: 0,
      sortBy: "rating",
    });
    setSearchTerm("");
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-16">
      
      {/* Category Hero Header */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-8 relative overflow-hidden">
        {/* Background blurs */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1 bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>Verified Directory Service</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-dark mb-4">
              Best {category.name} Near You
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed mb-6 font-medium">
              {category.description} Connect directly with verified agencies and top rated local experts.
            </p>

            {/* SEO expandable block */}
            <div className="flex gap-2.5 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-brand-gray max-w-3xl leading-relaxed">
              <Info className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <p className="font-medium">{category.seoText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main List & Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Search Panel & Mobile Filter Button */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3 mb-6">
          {/* Quick Search */}
          <div className="relative w-full flex-1 flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-colors">
            <Search className="h-4.5 w-4.5 text-brand-gray mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder={`Search ${category.name} by name, area (e.g. Koramangala, Bandra)...`}
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

          {/* Mobile filter buttons */}
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
          
          {/* Desktop Filter Sidebar (Grid 3) */}
          <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Business Directory list (Grid 9) */}
          <div className="lg:col-span-9 flex flex-col gap-5">
            
            {/* List count summary */}
            <div className="flex items-center justify-between text-xs text-brand-gray font-semibold px-1">
              <span>Showing {filteredAndSortedListings.length} results</span>
              {filters.city !== "All" && (
                <span>Filtering in **{filters.city}**</span>
              )}
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
                    We couldn&apos;t find any service providers matching your search criteria. Try modifying your keywords or resetting filters.
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-60 h-60 rounded-full bg-primary/10 blur-2xl -z-10" />
          
          <div className="flex flex-col gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Are you a service provider?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-medium leading-relaxed">
              List your {category.name} agency on TodayFix.in for free. Reach local clients, receive verified phone call inquiries, and grow your local footprint today.
            </p>
          </div>
          
          <button
            onClick={() => alert("Opening listing onboarding wizard...")}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all-custom shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>List Business Free</span>
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
            
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>
        </>
      )}

    </div>
  );
}
