import type { Metadata } from "next";
import Link from "next/link";
import {
    ShieldCheck,
    PhoneCall,
    Search,
    MapPinned,
    Building2,
    MessageSquareText,
    MapPin,
    LayoutGrid,
    Target,
    Users,
    Handshake,
    Sparkles,
    SearchCheck,
    ListChecks,
    ClipboardCheck,
    ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "About Us | TodayFix.in",
    description:
        "TodayFix.in connects customers with verified businesses, suppliers, contractors, and service providers across India through a modern, trusted business directory platform.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface FeatureCard {
    title: string;
    description: string;
    icon: typeof ShieldCheck;
}

const WHY_CHOOSE_CARDS: FeatureCard[] = [
    {
        title: "Verified Businesses",
        description:
            "Every listed business goes through a verification process, so you can connect with confidence.",
        icon: ShieldCheck,
    },
    {
        title: "Direct Contact",
        description:
            "Reach businesses directly with no middlemen, no extra fees, and no unnecessary delays.",
        icon: PhoneCall,
    },
    {
        title: "Fast Search & Discovery",
        description:
            "Find the right supplier, contractor, or service provider in seconds with smart category search.",
        icon: Search,
    },
    {
        title: "Nationwide Coverage",
        description:
            "From metro cities to growing towns, discover trusted businesses across hundreds of locations in India.",
        icon: MapPinned,
    },
];

interface StatCard {
    value: string;
    label: string;
    icon: typeof Building2;
}

const STATS: StatCard[] = [
    { value: "2.4L+", label: "Verified Businesses", icon: Building2 },
    { value: "18L+", label: "Monthly Enquiries", icon: MessageSquareText },
    { value: "500+", label: "Cities Covered", icon: MapPin },
    { value: "100+", label: "Categories", icon: LayoutGrid },
];

interface Step {
    step: string;
    title: string;
    description: string;
    icon: typeof SearchCheck;
}

const HOW_IT_WORKS: Step[] = [
    {
        step: "Step 1",
        title: "Search Services",
        description:
            "Browse by category or search for the exact product, supplier, or service you need.",
        icon: SearchCheck,
    },
    {
        step: "Step 2",
        title: "Compare Businesses",
        description:
            "Review profiles, ratings, and details to compare verified businesses near you.",
        icon: ListChecks,
    },
    {
        step: "Step 3",
        title: "Contact Directly",
        description:
            "Call, message, or enquire directly with the business — no middlemen involved.",
        icon: PhoneCall,
    },
    {
        step: "Step 4",
        title: "Get Work Done",
        description:
            "Finalize the deal and get your work completed quickly and reliably.",
        icon: ClipboardCheck,
    },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-1">
                {/* ============================================================ */}
                {/* 1. Hero Section                                              */}
                {/* ============================================================ */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#0B5ED7] via-[#0a52bd] to-[#073b8a] px-4 py-20 sm:py-28">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
                    />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5" />
                            India&apos;s Trusted Business Directory
                        </span>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            About TodayFix.in
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-blue-50 sm:text-xl">
                            Find Trusted Suppliers, Products &amp; Services Across India
                        </p>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-blue-50/90 sm:text-base">
                            TodayFix connects customers with verified businesses, suppliers,
                            contractors, and service providers across India through a
                            modern and trusted business directory platform.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                                <Building2 className="h-4 w-4" />
                                <span>Verified Suppliers</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                                <Handshake className="h-4 w-4" />
                                <span>No Middlemen</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                                <MapPinned className="h-4 w-4" />
                                <span>Pan-India Reach</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 2. Our Mission Section                                       */}
                {/* ============================================================ */}
                <section className="bg-[#F5F8FF] px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            <div>
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                    Our Mission
                                </h2>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                    Our mission is to make local discovery simple, transparent,
                                    and reliable for everyone — whether you&apos;re a customer
                                    looking for the right service or a business trying to grow.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0B5ED7]/10 text-[#0B5ED7]">
                                        <Handshake className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm text-slate-600 sm:text-[15px]">
                                        Connecting customers with trusted, verified businesses
                                        across every category and city.
                                    </p>
                                </div>

                                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0B5ED7]/10 text-[#0B5ED7]">
                                        <MessageSquareText className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm text-slate-600 sm:text-[15px]">
                                        Helping businesses generate quality enquiries that
                                        actually convert into customers.
                                    </p>
                                </div>

                                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0B5ED7]/10 text-[#0B5ED7]">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm text-slate-600 sm:text-[15px]">
                                        Eliminating middlemen so customers and businesses can
                                        deal with each other directly.
                                    </p>
                                </div>

                                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0B5ED7]/10 text-[#0B5ED7]">
                                        <Search className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm text-slate-600 sm:text-[15px]">
                                        Making local discovery simple, fast, and completely
                                        transparent for everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 3. Why Choose TodayFix Section                               */}
                {/* ============================================================ */}
                <section className="bg-white px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                Why Choose TodayFix
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                A platform built to make local business discovery effortless
                                and trustworthy.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {WHY_CHOOSE_CARDS.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className="group rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/40"
                                    >
                                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-900">
                                            {card.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                            {card.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 4. Statistics Section                                        */}
                {/* ============================================================ */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#0B5ED7] via-[#0a52bd] to-[#073b8a] px-4 py-16 sm:py-20">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                    />

                    <div className="relative mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                Trusted by Businesses Across India
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-blue-50 sm:text-base">
                                Numbers that reflect the trust customers and businesses place
                                in TodayFix every day.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                            {STATS.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="group rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                                    >
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold text-white sm:text-3xl">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-blue-50 sm:text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 5. How It Works Section                                      */}
                {/* ============================================================ */}
                <section className="bg-[#F5F8FF] px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                How It Works
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                Four simple steps to find and connect with the right business
                                for your needs.
                            </p>
                        </div>

                        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div
                                aria-hidden="true"
                                className="absolute left-0 right-0 top-7 hidden h-px bg-blue-200 lg:block"
                            />

                            {HOW_IT_WORKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.step} className="relative flex flex-col items-center text-center">
                                        <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 hover:scale-110">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-semibold uppercase tracking-wide text-[#0B5ED7]">
                                            {item.step}
                                        </span>
                                        <h3 className="mt-1.5 text-base font-semibold text-slate-900">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 6. Call To Action Section                                    */}
                {/* ============================================================ */}
                <section className="px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B5ED7] via-[#0a52bd] to-[#073b8a] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                            />

                            <div className="relative">
                                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                    Ready to Grow Your Business?
                                </h2>
                                <p className="mx-auto mt-3 max-w-xl text-sm text-blue-50 sm:text-base">
                                    Join thousands of businesses already generating customer
                                    enquiries through TodayFix.
                                </p>

                                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link
                                        href="/list-your-business"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0B5ED7] shadow-lg transition-transform duration-200 hover:scale-105 sm:w-auto"
                                    >
                                        List Your Business
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/20 sm:w-auto"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
