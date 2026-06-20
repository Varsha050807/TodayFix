"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Building2,
    User,
    Phone,
    Mail,
    MapPin,
    Globe,
    CheckCircle2,
} from "lucide-react";

export default function VerifyBusinessPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-28 pb-16">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-slate-900">
                            Verify Your Business
                        </h1>

                        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                            Join TodayFix and get discovered by thousands of customers
                            searching for trusted suppliers and service providers.
                        </p>
                    </div>

                    {!submitted ? (
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Business Name */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Business Name
                                    </label>

                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="ABC Interiors"
                                        />
                                    </div>
                                </div>

                                {/* Owner */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Owner Name
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Mobile Number
                                    </label>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            required
                                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                                            placeholder="business@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Business Category
                                    </label>

                                    <select
                                        required
                                        className="w-full border rounded-xl px-4 py-3"
                                    >
                                        <option>Interior Designers</option>
                                        <option>Packers & Movers</option>
                                        <option>Pest Control</option>
                                        <option>Electricians</option>
                                        <option>Plumbers</option>
                                    </select>
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        City
                                    </label>

                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                                            placeholder="Bangalore"
                                        />
                                    </div>
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Website (Optional)
                                    </label>

                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="url"
                                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Business Description
                                    </label>

                                    <textarea
                                        rows={5}
                                        className="w-full border rounded-xl px-4 py-3"
                                        placeholder="Tell customers about your services..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition"
                                >
                                    Submit For Verification
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />

                            <h2 className="text-3xl font-bold text-slate-900">
                                Request Submitted
                            </h2>

                            <p className="mt-3 text-slate-600">
                                Thank you for submitting your business.
                                Our team will review and verify your listing shortly.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}