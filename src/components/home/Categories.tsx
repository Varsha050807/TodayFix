"use client";
import Link from "next/link";
import React from "react";
import {
  Zap, Droplet, ShieldCheck, Truck, Sparkles, LucideIcon,
} from "lucide-react";
import { categories as mockCategories } from "@/data/mockData";
// Map iconName strings from mockData -> actual lucide-react components
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Droplet,
  ShieldCheck,
  Truck,
  Sparkles,
};

// Visual styling per category slug (mockData has no color info, so we keep it here)
const styleMap: Record<
  string,
  { bg: string; text: string; lightBg: string; count: string }
> = {
  "interior-designers": { bg: "bg-violet-500", text: "text-violet-500", lightBg: "bg-violet-50", count: "130+ Services" },
  "packers-movers": { bg: "bg-sky-500", text: "text-sky-500", lightBg: "bg-sky-50", count: "35+ Services" },
  "pest-control": { bg: "bg-red-500", text: "text-red-500", lightBg: "bg-red-50", count: "40+ Services" },
  electricians: { bg: "bg-amber-500", text: "text-amber-500", lightBg: "bg-amber-50", count: "120+ Services" },
  plumbers: { bg: "bg-cyan-500", text: "text-cyan-500", lightBg: "bg-cyan-50", count: "95+ Services" },
};

const fallbackStyle = { bg: "bg-slate-500", text: "text-slate-500", lightBg: "bg-slate-50", count: "50+ Services" };

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark">
              Explore Popular Categories
            </h2>
            <p className="mt-2 text-sm text-brand-gray">
              Direct connection with local service professionals. No middleman, no fees.
            </p>
          </div>
          <Link
            href="/category"
            className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors shrink-0 group hover:underline cursor-pointer"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {mockCategories.map((cat) => {
            const Icon = iconMap[cat.iconName] ?? Sparkles;
            const style = styleMap[cat.slug] ?? fallbackStyle;

            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group p-5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-md transition-all-custom cursor-pointer text-center flex flex-col items-center hover:-translate-y-1"
              >
                {/* Icon Container with color scheme */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${style.lightBg} ${style.text}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-bold text-brand-dark tracking-tight mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>

                {/* Service Count */}
                <span className="text-[11px] text-brand-gray font-semibold uppercase tracking-wide">
                  {style.count}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
