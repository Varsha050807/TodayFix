"use client";

import React from "react";
import { PlusCircle, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export default function CallToAction() {
  const benefits = [
    "Zero registration fees for basic listings",
    "Get discovered by 1.5M+ monthly searchers",
    "Showcase verified customer reviews & ratings",
    "ISO verified badging to build customer trust",
  ];

  const handleRegister = () => {
    alert("Opening merchant registration wizard...");
  };

  return (
    <section id="list-business" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-primary via-primary to-blue-700 text-white p-8 md:p-14 shadow-2xl shadow-primary/25 overflow-hidden">
          
          {/* Background decorative vectors */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white/10 blur-2xl -z-10" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-white/5 blur-2xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Copy & Checklist */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit">
                <Sparkles className="h-3.5 w-3.5 fill-white/20 text-white" />
                <span>For Local Service Providers</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Grow Your Business & Reach Local Leads
              </h2>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
                List your business on TodayFix.in today. Get verified, display your contact details, and start receiving direct inquiries from active customers.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="h-4.5 w-4.5 text-white bg-white/20 rounded-full p-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: CTA Buttons & Quick stats */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end gap-6">
              
              {/* Interactive panel */}
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col gap-4 text-center">
                
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <span className="text-sm font-bold uppercase tracking-wider">Join 18,000+ Partners</span>
                </div>
                
                <button
                  onClick={handleRegister}
                  className="w-full bg-white hover:bg-slate-50 text-primary py-4 rounded-xl font-extrabold text-sm tracking-wide shadow-xl shadow-blue-900/10 transition-all-custom hover:-translate-y-0.5 cursor-pointer"
                >
                  List Your Business Now
                </button>
                
                <p className="text-[10px] text-white/75 font-medium leading-relaxed">
                  Takes less than 2 minutes. Free onboarding & validation badge inclusion included.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
