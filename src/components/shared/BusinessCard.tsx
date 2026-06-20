"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  MapPin,
  Clock,
  Check,
  Phone,
  ArrowRight,
} from "lucide-react";
import RatingBadge from "./RatingBadge";

export interface Business {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  category: string;
  experience?: string;
  rating: number;
  reviewsCount: number;
  area: string;
  city: string;
  workingHours?: string;
  features?: string[];
  phone?: string;
  verified?: boolean;
  isAssured?: boolean;
}

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Calling ${business.name} at ${business.phone}`);
  };

  const handleQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Opening quick enquiry form for ${business.name}`);
  };

  return (
    <Link
      href={`/business/${business.slug}`}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image */}
      <div className="relative w-full md:w-56 h-48 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
        <img
          src={business.coverImage || "/placeholder.jpg"}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {business.isAssured && (
            <span className="flex items-center gap-1 bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
              <Award className="h-2.5 w-2.5" />
              Assured
            </span>
          )}

          {business.verified && (
            <span className="flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
              <ShieldCheck className="h-2.5 w-2.5" />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-4">
        <div>
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2.5 py-0.5 rounded-md">
              {business.category}
            </span>
            <span className="text-slate-300 text-[10px]">•</span>
            <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">
              {business.experience || "N/A"}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-brand-dark group-hover:text-primary transition-colors line-clamp-1 mb-2">
            {business.name}
          </h3>

          {/* Rating */}
          <div className="mb-4">
            <RatingBadge
              rating={business.rating}
              reviewsCount={business.reviewsCount}
              showText
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5 text-xs text-brand-gray font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate">
                {business.area}, {business.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{business.workingHours || "Not available"}</span>
            </div>
          </div>

          {/* Features (SAFE FIX) */}
          <div className="hidden sm:flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-slate-100">
            {(business.features ?? []).slice(0, 3).map((feat, i) => (
              <span
                key={feat + i}
                className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100/60 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium"
              >
                <Check className="h-2.5 w-2.5 text-emerald-500" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100/60 mt-2">
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <button
              onClick={handleCall}
              className="flex-1 sm:flex-initial bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-bold"
            >
              <Phone className="h-3.5 w-3.5 inline mr-1" />
              Call Now
            </button>

            <button
              onClick={handleQuote}
              className="flex-1 sm:flex-initial bg-white text-brand-dark border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold"
            >
              Get Quote
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-primary">
            View Profile
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}