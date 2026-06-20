"use client";

import React from "react";
import { Filter, Star, CheckSquare, ShieldCheck } from "lucide-react";

export interface FilterState {
  city: string;
  verifiedOnly: boolean;
  minRating: number;
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showCityFilter?: boolean;
}

export default function FilterSidebar({ filters, onFilterChange, showCityFilter = true }: FilterSidebarProps) {
  const citiesList = ["All", "Bangalore", "Chennai", "Hyderabad", "Mumbai", "Pune"];
  const sortOptions = [
    { value: "rating", label: "Top Rated (Highest)" },
    { value: "reviews", label: "Most Reviewed" },
    { value: "experience", label: "Most Experienced" },
  ];

  const handleCityChange = (city: string) => {
    onFilterChange({ ...filters, city });
  };

  const handleVerifiedToggle = () => {
    onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: rating === filters.minRating ? 0 : rating });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy });
  };

  const resetFilters = () => {
    onFilterChange({
      city: "All",
      verifiedOnly: false,
      minRating: 0,
      sortBy: "rating",
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="h-4.5 w-4.5 text-primary" />
          <h3 className="text-sm font-bold text-brand-dark">Filters & Sort</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-brand-dark font-medium cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* City Filter */}
      {showCityFilter && (
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Filter by City</label>
          <div className="flex flex-col gap-1.5">
            {citiesList.map((city) => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-colors ${
                  filters.city === city
                    ? "bg-primary/5 border-primary text-primary font-bold"
                    : "bg-white border-transparent text-brand-dark hover:bg-slate-50"
                }`}
              >
                {city === "All" ? "All Cities" : city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verification Status Filter */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2.5">Verification</label>
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-brand-dark font-semibold select-none group">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={handleVerifiedToggle}
            className="rounded text-primary focus:ring-primary border-slate-300 h-4 w-4 cursor-pointer"
          />
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
            <span>Verified Partners Only</span>
          </span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Customer Rating</label>
        <div className="flex flex-col gap-1.5">
          {[4.7, 4.4, 4.0].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-colors flex items-center justify-between ${
                filters.minRating === star
                  ? "bg-primary/5 border-primary text-primary font-bold"
                  : "bg-white border-transparent text-brand-dark hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className={`h-3.5 w-3.5 fill-current ${filters.minRating === star ? "text-primary" : "text-amber-500"}`} />
                <span>{star.toFixed(1)} & Above</span>
              </div>
              <span className="text-[10px] text-brand-gray font-semibold">({star >= 4.7 ? "Excellent" : star >= 4.4 ? "Very Good" : "Good"})</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
