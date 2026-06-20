import React from "react";
import { CheckSquare, Users, Star, Layers } from "lucide-react";

export default function Statistics() {
  const stats = [
    {
      value: "18,400+",
      label: "Verified Businesses",
      description: "Manually checked & active listings",
      icon: CheckSquare,
      iconColor: "text-primary bg-primary/10",
    },
    {
      value: "1.5 Million+",
      label: "Happy Users Monthly",
      description: "Direct connections and service calls",
      icon: Users,
      iconColor: "text-blue-600 bg-blue-100/50",
    },
    {
      value: "4.8 / 5.0",
      label: "Average Service Rating",
      description: "Based on real user reviews",
      icon: Star,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      value: "120+",
      label: "Service Categories",
      description: "From household repairs to B2B solutions",
      icon: Layers,
      iconColor: "text-indigo-600 bg-indigo-100/50",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark">
            Why Millions Trust TodayFix
          </h2>
          <p className="mt-3 text-sm text-brand-gray leading-relaxed">
            We bridge the gap between local experts and customers through transparency, trust, and absolute zero hidden broker charges.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Icon wrapper */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all-custom ${stat.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                {/* Value */}
                <span className="text-3xl font-extrabold text-brand-dark tracking-tight mb-1">
                  {stat.value}
                </span>
                
                {/* Label */}
                <h3 className="text-sm font-bold text-brand-dark mb-1">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-brand-gray leading-normal max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
