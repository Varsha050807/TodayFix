"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MapPin, Search, ChevronDown, PlusCircle, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-sm py-3" : "bg-white/95 border-b border-slate-100 py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo & Branding */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-all-custom">
                <Shield className="h-5 w-5 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-brand-dark">
                  Today<span className="text-primary">Fix</span>
                  <span className="text-slate-400 text-sm font-medium">.in</span>
                </span>
                <span className="text-[10px] text-brand-gray font-medium -mt-1 tracking-wider uppercase">
                  Verified Local Directory
                </span>
              </div>
            </Link>
          </div>

          {/* Location & Quick Search (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-inner-sm transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-dark hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate max-w-[100px]">{selectedCity}</span>
                <ChevronDown className={`h-3 w-3 text-brand-gray transition-transform duration-200 ${showCityDropdown ? "rotate-180" : ""}`} />
              </button>

              {/* City Dropdown Menu */}
              {showCityDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowCityDropdown(false)}
                  />
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="px-4 py-1 text-xs font-semibold text-brand-gray uppercase tracking-wider">Popular Cities</p>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${selectedCity === city ? "text-primary font-semibold bg-primary/5" : "text-brand-dark"
                          }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Split Line */}
            <div className="h-5 w-px bg-slate-300 mx-2" />

            {/* Keyword Search */}
            <div className="flex items-center flex-1 px-2">
              <Search className="h-4 w-4 text-brand-gray mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search Plumbers, Electricians, Web Developers, Doctors..."
                className="w-full bg-transparent text-sm text-brand-dark placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-brand-dark hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#categories" className="text-sm font-medium text-brand-dark hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/verify-business" className="text-sm font-medium text-brand-dark hover:text-primary transition-colors">
              List Your Business
            </Link>
            <Link href="/pricing">Pricing</Link>
            <Link
              href="/about"
              className="text-sm font-medium text-brand-dark hover:text-primary transition-colors whitespace-nowrap"
            >
              About Us
            </Link>

            <Link
              href="#list-business"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all-custom hover:-translate-y-0.5"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Free Listing</span>
            </Link>
            <Link href="/contact">
              Contact
            </Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>

          {/* Mobile Menu & Search Actions (Tablet / Mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="#list-business"
              className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-primary-hover shadow-md shadow-primary/10 transition-all-custom"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Listing</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-dark hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay & Content */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Shield className="h-4.5 w-4.5 fill-white/10" />
                  </div>
                  <span className="text-lg font-bold text-brand-dark">
                    Today<span className="text-primary">Fix</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-brand-dark hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search & Location fields */}
              <div className="flex flex-col gap-3 mb-8">
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Search Directory</p>

                {/* Location Select (Mobile) */}
                <div className="relative">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-brand-dark focus:outline-none cursor-pointer"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Keyword search (Mobile) */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <Search className="h-4.5 w-4.5 text-brand-gray shrink-0" />
                  <input
                    type="text"
                    placeholder="Search services or businesses..."
                    className="w-full bg-transparent text-sm text-brand-dark focus:outline-none placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Quick Navigation</p>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-brand-dark hover:text-primary transition-colors py-2"
                >
                  Home
                </Link>
                <Link
                  href="#categories"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-brand-dark hover:text-primary transition-colors py-2"
                >
                  Categories
                </Link>
                <Link
                  href="#featured"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-brand-dark hover:text-primary transition-colors py-2"
                >
                  Verified Directory
                </Link>
                <Link
                  href="#testimonials"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-brand-dark hover:text-primary transition-colors py-2"
                >
                  Testimonials
                </Link>
              </div>
            </div>

            {/* Drawer Footer listing button */}
            <div className="mt-auto pt-6 border-t border-slate-100">
              <Link
                href="#list-business"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-white w-full py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Your Business Free</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
