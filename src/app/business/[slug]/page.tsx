import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ShieldCheck, Award, MapPin, Phone, MessageSquare, 
  Globe, Mail, Clock, Calendar, Check, ChevronRight,
  ArrowLeft, Star
} from "lucide-react";
import { businesses } from "@/data/mockData";
import RatingBadge from "@/components/shared/RatingBadge";
import BusinessGallery from "@/components/shared/BusinessGallery";
import EnquiryForm from "@/components/shared/EnquiryForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BusinessDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Find business by slug
  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      <div className="bg-slate-50 min-h-screen pt-24 pb-16">
        
        {/* Breadcrumb section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-brand-gray font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/city/${business.citySlug}`} className="hover:text-primary transition-colors">{business.city}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/category/${business.categorySlug}`} className="hover:text-primary transition-colors">{business.category}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-brand-dark truncate max-w-[200px]">{business.name}</span>
          </div>
        </div>

        {/* Hero Cover Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* Business Name, Tags & Rating overlay */}
              <div className="text-white flex flex-col gap-3">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-lg">
                    {business.category}
                  </span>
                  {business.isAssured && (
                    <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      <Award className="h-3.5 w-3.5" />
                      <span>Assured</span>
                    </span>
                  )}
                  {business.isVerified && (
                    <span className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  {business.name}
                </h1>

                {/* City & Rating Details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{business.area}, {business.city}</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span>{business.experience}</span>
                  <span className="text-slate-500">•</span>
                  
                  {/* Rating Stars Overlay */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 bg-amber-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-white" />
                      <span>{business.rating}</span>
                    </div>
                    <span>({business.reviewsCount} reviews)</span>
                  </div>
                </div>

              </div>

              {/* Action Trigger Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${business.phone}`}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/30 transition-all-custom hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all-custom hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Main Details Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Area (Grid 8) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* About Section Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
                <h2 className="text-lg font-bold text-brand-dark pb-2.5 border-b border-slate-100">
                  About Business
                </h2>
                <p className="text-sm text-brand-gray leading-relaxed font-normal">
                  {business.aboutText}
                </p>

                {/* Features / Services Bullet Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4 pt-4 border-t border-slate-100">
                  {business.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-brand-dark font-bold">
                      <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 bg-emerald-50 rounded-full p-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
                <h2 className="text-lg font-bold text-brand-dark pb-2.5 border-b border-slate-100">
                  Photo Gallery
                </h2>
                <BusinessGallery images={business.gallery} />
              </div>

              {/* Reviews Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-brand-dark">
                    Customer Reviews
                  </h2>
                  <span className="text-xs text-brand-gray font-semibold">
                    Showing {business.reviews.length} reviews
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {business.reviews.map((rev) => (
                    <div key={rev.id} className="pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                      
                      {/* Review User Info & Date */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 font-bold text-slate-600 flex items-center justify-center text-xs">
                            {rev.userName.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-dark">{rev.userName}</h4>
                            <span className="text-[10px] text-brand-gray font-medium">{rev.date}</span>
                          </div>
                        </div>

                        {/* Stars Review Score */}
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal pl-13">
                        &ldquo;{rev.comment}&ldquo;
                      </p>

                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar (Grid 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              
              {/* Lead/Enquiry Form Component */}
              <EnquiryForm businessName={business.name} />

              {/* Contact Information & Specific details Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold text-brand-dark pb-2 border-b border-slate-100">
                  Business Details
                </h3>

                <div className="flex flex-col gap-4 text-xs font-semibold text-brand-dark">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">Address</p>
                      <p className="leading-relaxed text-brand-dark font-medium">{business.address}, {business.area}, {business.city}, {business.state}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">Contact Phone</p>
                      <a href={`tel:${business.phone}`} className="text-primary hover:underline font-bold">{business.phone}</a>
                    </div>
                  </div>

                  {/* Email */}
                  {business.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">Email Address</p>
                        <a href={`mailto:${business.email}`} className="text-brand-dark hover:text-primary transition-colors font-medium">{business.email}</a>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {business.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-4.5 w-4.5 text-primary shrink-0" />
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">Website</p>
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                          {business.website.replace("https://", "").replace("http://", "")}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Working Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-4.5 w-4.5 text-primary shrink-0" />
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">Working Hours</p>
                      <p className="text-brand-dark font-medium">{business.workingHours}</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
