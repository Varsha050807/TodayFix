import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Shield, Send } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Plumbers & Pipefitters", href: "#" },
    { name: "Electricians & Wiring", href: "#" },
    { name: "Pest Control Services", href: "#" },
    { name: "Web Developers & IT", href: "#" },
    { name: "Appliance Repairs", href: "#" },
    { name: "AC & HVAC Maintenance", href: "#" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "How it Works", href: "#" },
    { name: "Pricing & Advertising", href: "#" },
    { name: "Verified Badges", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const cities = [
    { name: "New Delhi", href: "#" },
    { name: "Mumbai", href: "#" },
    { name: "Bangalore", href: "#" },
    { name: "Hyderabad", href: "#" },
    { name: "Chennai", href: "#" },
    { name: "Pune", href: "#" },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-all-custom">
                <Shield className="h-5 w-5 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  Today<span className="text-primary">Fix</span>
                  <span className="text-slate-500 text-sm font-medium">.in</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                  Verified Local Directory
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TodayFix.in connects you with local verified service experts and professional businesses in your city. From home services to technical solutions, we verify so you don&apos;t have to.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              <Link href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all-custom" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all-custom" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all-custom" aria-label="Instagram">
                <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all-custom" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Newsletter</h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Subscribe to get updates on top-rated local deals & verification events.
              </p>
              <form className="flex rounded-xl bg-slate-800/80 border border-slate-700/80 p-1 focus-within:border-primary transition-colors">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent border-0 px-3 text-xs flex-1 focus:ring-0 focus:outline-none text-slate-100 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition-colors cursor-pointer"
                  aria-label="Submit newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Sector 62, Noida, UP, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 120 456 7890</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@todayfix.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cities List Row */}
        <div className="py-8 border-b border-slate-800 text-xs text-slate-500">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <span className="font-semibold text-slate-400 uppercase tracking-wider mr-2">Serving Cities:</span>
            {cities.map((city, idx) => (
              <React.Fragment key={city.name}>
                <Link href={city.href} className="hover:text-primary transition-colors">
                  {city.name}
                </Link>
                {idx < cities.length - 1 && <span className="text-slate-800">•</span>}
              </React.Fragment>
            ))}
            <span className="text-slate-800">•</span>
            <Link href="#" className="text-primary hover:underline">
              More Cities
            </Link>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} TodayFix.in. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>ISO 9001:2015 Certified Local Search Engine</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
