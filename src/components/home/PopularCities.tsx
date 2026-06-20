"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MapPin } from "lucide-react";
import { cities } from "@/data/mockData"; export default function PopularCities() {
    return (
        <section id="cities" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark">
                            Popular Cities
                        </h2>
                        <p className="mt-2 text-sm text-brand-gray">
                            Find verified local service professionals near you, wherever you are.
                        </p>
                    </div>
                    <Link
                        href="/city"
                        className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors shrink-0 group hover:underline cursor-pointer"
                    >
                        <span>View All Cities</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {cities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/city/${city.slug}`}
                            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all-custom cursor-pointer h-44 block hover:-translate-y-1"
                        >
                            {/* Background Image */}
                            <Image
                                src={city.bannerImage}
                                alt={city.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 text-left">
                                <div className="flex items-center gap-1.5 text-white">
                                    <MapPin className="h-4 w-4" />
                                    <h3 className="text-base font-bold tracking-tight">
                                        {city.name}
                                    </h3>
                                </div>
                                <span className="text-[11px] text-white/80 font-semibold uppercase tracking-wide">
                                    {city.state}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
