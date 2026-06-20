"use client";

import React from "react";
import { Star, Quote, MessageSquare } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Varun Sharma",
      role: "Homeowner, New Delhi",
      comment: "I found a highly professional and licensed electrician within 15 minutes of searching on TodayFix.in. The work was completed perfectly without any hidden charges or broker commissions. Excellent platform!",
      rating: 5,
      avatarInitials: "VS",
      badgeColor: "bg-blue-500",
    },
    {
      name: "Anita Desai",
      role: "Founder, Anita's TechLab",
      comment: "Getting our web development agency listed and verified on TodayFix.in has been a game-changer. We received 3 high-quality corporate inquiries in our first week. The verification process is top-notch.",
      rating: 5,
      avatarInitials: "AD",
      badgeColor: "bg-emerald-500",
    },
    {
      name: "Rajesh Kumar",
      role: "Local Resident, Mumbai",
      comment: "Super easy to use. I needed urgent pest control for termites. Used the direct dial button, spoke with a verified partner directly, and they finished the job the same afternoon. Very convenient!",
      rating: 5,
      avatarInitials: "RK",
      badgeColor: "bg-purple-500",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>User Reviews</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark">
            What Our Users Say
          </h2>
          <p className="mt-3 text-sm text-brand-gray">
            Hear from homeowners and business owners who connect daily on TodayFix.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-slate-50/50 hover:bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all-custom relative flex flex-col justify-between"
            >
              
              {/* Quote Mark Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-200/80 -scale-x-100" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-brand-dark leading-relaxed mb-6 font-medium italic">
                &ldquo;{test.comment}&rdquo;
              </p>

              {/* User Identity Details */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100/80">
                {/* Initial Avatar */}
                <div className={`h-11 w-11 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-inner shrink-0 ${test.badgeColor}`}>
                  {test.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">{test.name}</h4>
                  <p className="text-xs text-brand-gray">{test.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
