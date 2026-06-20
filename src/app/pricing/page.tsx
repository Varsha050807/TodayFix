import type { Metadata } from "next";
import Link from "next/link";
import {
    CheckCircle2,
    XCircle,
    ShieldCheck,
    BadgeCheck,
    Sparkles,
    TrendingUp,
    Users,
    Search,
    Headphones,
    Star,
    Rocket,
    Building2,
    ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Pricing Plans | TodayFix.in",
    description:
        "Simple, transparent pricing for every business. Compare Basic, Premium, and Featured listing plans on TodayFix and start generating more customer enquiries today.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    icon: typeof Rocket;
    features: string[];
    highlighted?: boolean;
    badge?: string;
    ctaLabel: string;
}

const PRICING_PLANS: PricingPlan[] = [
    {
        name: "Basic Listing",
        price: "Free",
        period: "",
        description: "Get your business discovered, at no cost.",
        icon: Building2,
        features: [
            "Business Profile",
            "Contact Details",
            "Category Listing",
            "Standard Visibility",
        ],
        ctaLabel: "Get Started",
    },
    {
        name: "Premium Listing",
        price: "₹999",
        period: "/month",
        description: "Stand out and win more customer enquiries.",
        icon: Rocket,
        features: [
            "Everything in Basic",
            "Verified Badge",
            "Higher Search Ranking",
            "Priority Support",
            "More Photos",
        ],
        highlighted: true,
        badge: "Most Popular",
        ctaLabel: "Upgrade to Premium",
    },
    {
        name: "Featured Listing",
        price: "₹2499",
        period: "/month",
        description: "Maximum exposure for serious business growth.",
        icon: Star,
        features: [
            "Everything in Premium",
            "Homepage Placement",
            "Featured Business Badge",
            "Maximum Visibility",
            "Top Search Placement",
            "Dedicated Account Assistance",
        ],
        badge: "Best Value",
        ctaLabel: "Get Featured",
    },
];

interface ComparisonRow {
    label: string;
    basic: boolean;
    premium: boolean;
    featured: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
    { label: "Business Profile", basic: true, premium: true, featured: true },
    { label: "Contact Details", basic: true, premium: true, featured: true },
    { label: "Category Listing", basic: true, premium: true, featured: true },
    { label: "Verified Badge", basic: false, premium: true, featured: true },
    { label: "Search Priority", basic: false, premium: true, featured: true },
    { label: "Homepage Placement", basic: false, premium: false, featured: true },
    { label: "Featured Badge", basic: false, premium: false, featured: true },
    { label: "Priority Support", basic: false, premium: true, featured: true },
    { label: "Photo Gallery", basic: false, premium: true, featured: true },
    { label: "Lead Visibility", basic: false, premium: true, featured: true },
];

interface BenefitCard {
    title: string;
    description: string;
    icon: typeof TrendingUp;
}

const BENEFIT_CARDS: BenefitCard[] = [
    {
        title: "More Visibility",
        description:
            "Get seen by more customers searching for businesses like yours in your city.",
        icon: TrendingUp,
    },
    {
        title: "More Customer Enquiries",
        description:
            "Verified and featured listings consistently convert into more leads and calls.",
        icon: Users,
    },
    {
        title: "Better Search Ranking",
        description:
            "Premium and Featured plans push your business higher in category search results.",
        icon: Search,
    },
    {
        title: "Trusted Verification",
        description:
            "A verified badge builds instant credibility and trust with potential customers.",
        icon: ShieldCheck,
    },
];

const TRUST_BADGES: { label: string; icon: typeof BadgeCheck }[] = [
    { label: "10,000+ Businesses Listed", icon: Building2 },
    { label: "Verified Listings", icon: BadgeCheck },
    { label: "Trusted Across Cities", icon: ShieldCheck },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
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
                            Plans built for growing businesses
                        </span>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Simple Pricing for Every Business
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base text-blue-50 sm:text-lg">
                            Choose the perfect plan to promote your business and generate
                            more customer enquiries.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            {TRUST_BADGES.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <div
                                        key={badge.label}
                                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
                                    >
                                        <Icon className="h-4 w-4 text-white" />
                                        <span>{badge.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 2. Pricing Cards Section                                     */}
                {/* ============================================================ */}
                <section className="bg-[#F5F8FF] px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {PRICING_PLANS.map((plan) => {
                                const Icon = plan.icon;
                                return (
                                    <article
                                        key={plan.name}
                                        className={`group relative flex flex-col rounded-3xl border bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${plan.highlighted
                                            ? "border-[#0B5ED7] shadow-lg shadow-blue-200/60 lg:scale-[1.03]"
                                            : "border-blue-100 hover:shadow-blue-200/40"
                                            }`}
                                    >
                                        {plan.badge && (
                                            <span
                                                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white shadow-md ${plan.highlighted
                                                    ? "bg-[#0B5ED7]"
                                                    : "bg-slate-800"
                                                    }`}
                                            >
                                                {plan.badge}
                                            </span>
                                        )}

                                        <div
                                            className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${plan.highlighted
                                                ? "bg-[#0B5ED7] shadow-blue-600/30"
                                                : "bg-slate-800 shadow-slate-800/20"
                                                }`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900">
                                            {plan.name}
                                        </h3>
                                        <p className="mt-1.5 text-sm text-slate-500">
                                            {plan.description}
                                        </p>

                                        <div className="mt-6 flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-slate-900">
                                                {plan.price}
                                            </span>
                                            {plan.period && (
                                                <span className="text-sm font-medium text-slate-500">
                                                    {plan.period}
                                                </span>
                                            )}
                                        </div>

                                        <ul className="mt-7 flex-1 space-y-3.5">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-2.5 text-sm text-slate-600"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0B5ED7]" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/contact"
                                            className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${plan.highlighted
                                                ? "bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30 hover:bg-[#094bb8] hover:shadow-xl hover:shadow-blue-600/40"
                                                : "border border-[#0B5ED7]/30 bg-white text-[#0B5ED7] hover:bg-[#F5F8FF]"
                                                }`}
                                        >
                                            {plan.ctaLabel}
                                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 3. Comparison Table                                          */}
                {/* ============================================================ */}
                <section className="bg-white px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                Compare All Features
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                A clear, side-by-side look at what each plan includes so you
                                can pick the right fit for your business.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-blue-100 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] border-collapse text-left">
                                    <thead>
                                        <tr className="bg-[#F5F8FF]">
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-sm font-semibold text-slate-700"
                                            >
                                                Feature
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-sm font-semibold text-slate-700"
                                            >
                                                Basic
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-sm font-semibold text-[#0B5ED7]"
                                            >
                                                Premium
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-sm font-semibold text-slate-700"
                                            >
                                                Featured
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {COMPARISON_ROWS.map((row, index) => (
                                            <tr
                                                key={row.label}
                                                className={`border-t border-blue-50 transition-colors duration-150 hover:bg-[#F5F8FF]/60 ${index % 2 === 0 ? "bg-white" : "bg-[#F5F8FF]/30"
                                                    }`}
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 text-sm font-medium text-slate-700"
                                                >
                                                    {row.label}
                                                </th>
                                                <td className="px-6 py-4 text-center">
                                                    {row.basic ? (
                                                        <CheckCircle2 className="mx-auto h-5 w-5 text-[#0B5ED7]" />
                                                    ) : (
                                                        <XCircle className="mx-auto h-5 w-5 text-slate-300" />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {row.premium ? (
                                                        <CheckCircle2 className="mx-auto h-5 w-5 text-[#0B5ED7]" />
                                                    ) : (
                                                        <XCircle className="mx-auto h-5 w-5 text-slate-300" />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {row.featured ? (
                                                        <CheckCircle2 className="mx-auto h-5 w-5 text-[#0B5ED7]" />
                                                    ) : (
                                                        <XCircle className="mx-auto h-5 w-5 text-slate-300" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 4. Why Upgrade Section                                       */}
                {/* ============================================================ */}
                <section className="bg-[#F5F8FF] px-4 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                Why Upgrade?
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                                Businesses that upgrade see real, measurable results within
                                weeks.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {BENEFIT_CARDS.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div
                                        key={benefit.title}
                                        className="group rounded-2xl border border-blue-100 bg-white/80 p-6 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/40"
                                    >
                                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-900">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                            {benefit.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* 5. Call To Action Section                                    */}
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
                                    Join thousands of businesses already generating leads
                                    through TodayFix.
                                </p>

                                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0B5ED7] shadow-lg transition-transform duration-200 hover:scale-105 sm:w-auto"
                                    >
                                        Get Started
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/list-your-business"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/20 sm:w-auto"
                                    >
                                        <Headphones className="h-4 w-4" />
                                        List Your Business
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
