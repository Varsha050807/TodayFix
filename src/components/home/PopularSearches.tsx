"use client";

import React from "react";
import { TrendingUp, Truck, Zap, Droplet, Scissors, Wrench, ShieldAlert, Heart, Home } from "lucide-react";

export default function PopularSearches() {
  const popularSearches = [
    { name: "Packers & Movers", icon: Truck, color: "text-blue-500 bg-blue-50 border-blue-100" },
    { name: "Electricians", icon: Zap, color: "text-amber-500 bg-amber-50 border-amber-100" },
    { name: "Plumbers", icon: Droplet, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
    { name: "AC & Appliance Repair", icon: Wrench, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
    { name: "Pest Control", icon: ShieldAlert, color: "text-red-500 bg-red-50 border-red-100" },
    { name: "Salons & Spa", icon: Scissors, color: "text-pink-500 bg-pink-50 border-pink-100" },
    { name: "Clinics & Doctors", icon: Heart, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
    { name: "Interior Designers", icon: Home, color: "text-purple-500 bg-purple-50 border-purple-100" },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Header title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-base font-bold text-brand-dark tracking-tight">Trending Searches</h2>
              <p className="text-xs text-brand-gray">What people are looking for today</p>
            </div>
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 overflow-hidden">
            {popularSearches.map((search) => {
              const Icon = search.icon;
              return (
                <button
                  key={search.name}
                  onClick={() => alert(`Initiating search for: ${search.name}`)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border hover-border-glow transition-all-custom cursor-pointer hover:-translate-y-0.5 ${search.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{search.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
