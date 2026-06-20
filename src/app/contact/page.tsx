"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    CheckCircle2,
    MessageCircle,
    PhoneCall,
    Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ------------------------------------------------------------------ */
/*  Static contact data                                               */
/* ------------------------------------------------------------------ */

const PHONE_PRIMARY = "08494939493";
const PHONE_SECONDARY = "+91 9886457152";
const PHONE_SECONDARY_CALL_HREF = "+919886457152";
const WHATSAPP_NUMBER = "919886457152"; // no + / spaces, used for wa.me link
const EMAIL = "info@winsobusiness.com";
const ADDRESS =
    "SY No.112, Ground Floor, Hirandahalli Opp GHP School, Virgonagar, Bangalore – 560049";

const MAPS_EMBED_SRC =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(ADDRESS) +
    "&output=embed";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi TodayFix, I'd like to know more about your services."
)}`;

/* ------------------------------------------------------------------ */
/*  Form types                                                        */
/* ------------------------------------------------------------------ */

interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_FORM_DATA: ContactFormData = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

/* ------------------------------------------------------------------ */
/*  Validation                                                        */
/* ------------------------------------------------------------------ */

function validateForm(data: ContactFormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.fullName.trim()) {
        errors.fullName = "Full name is required.";
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = "Full name must be at least 2 characters.";
    }

    if (!data.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(data.phone.trim())) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!data.subject.trim()) {
        errors.subject = "Subject is required.";
    } else if (data.subject.trim().length < 3) {
        errors.subject = "Subject must be at least 3 characters.";
    }

    if (!data.message.trim()) {
        errors.message = "Message is required.";
    } else if (data.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters.";
    }

    return errors;
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof ContactFormData;

        setFormData((prev) => ({ ...prev, [fieldName]: value }));

        // Live-validate only fields that have already been touched
        if (touched[fieldName]) {
            const fieldErrors = validateForm({ ...formData, [fieldName]: value });
            setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors[fieldName] }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.target.name as keyof ContactFormData;
        setTouched((prev) => ({ ...prev, [fieldName]: true }));
        const fieldErrors = validateForm(formData);
        setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors[fieldName] }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        setTouched({
            fullName: true,
            email: true,
            phone: true,
            subject: true,
            message: true,
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        // No backend yet — simulate a short delay, then log the payload.
        await new Promise((resolve) => setTimeout(resolve, 900));

        // eslint-disable-next-line no-console
        console.log("Contact form submission:", formData);

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(INITIAL_FORM_DATA);
        setTouched({});
        setErrors({});
    };

    const handleSendAnother = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1">
                {/* ------------------------------------------------------ */}
                {/* 1. Hero Section                                        */}
                {/* ------------------------------------------------------ */}
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-4 py-20 sm:py-28">
                    {/* decorative blurred orbs for premium feel */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                            We&apos;d love to hear from you
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Contact TodayFix
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base text-blue-50 sm:text-lg">
                            Got a question, feedback, or need help finding the right business
                            near you? Reach out to our team — we&apos;re here to make things
                            easy for you, every single day.
                        </p>
                    </div>
                </section>

                {/* ------------------------------------------------------ */}
                {/* 2. Contact Information Cards                           */}
                {/* ------------------------------------------------------ */}
                <section className="px-4 py-12 sm:py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Phone Card */}
                            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Call Us
                                </h3>
                                <div className="mt-3 space-y-1.5">
                                    <a
                                        href="tel:08494939493"
                                        className="block text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                                    >
                                        {PHONE_PRIMARY}
                                    </a>
                                    <a
                                        href={`tel:${PHONE_SECONDARY_CALL_HREF}`}
                                        className="block text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                                    >
                                        {PHONE_SECONDARY}
                                    </a>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Email Us
                                </h3>
                                <div className="mt-3">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="block break-all text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                                    >
                                        {EMAIL}
                                    </a>
                                </div>
                            </div>

                            {/* Address Card */}
                            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50 sm:col-span-2 lg:col-span-1">
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Visit Us
                                </h3>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                                    {ADDRESS}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ */}
                {/* 3. Contact Form                                        */}
                {/* ------------------------------------------------------ */}
                <section className="px-4 py-8 sm:py-12">
                    <div className="mx-auto max-w-3xl">
                        <div className="rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-lg shadow-blue-100/50 backdrop-blur-xl sm:p-10">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-8 text-center">
                                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                            Send Us a Message
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                                            Fill out the form below and our team will get back to
                                            you as soon as possible.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label
                                                htmlFor="fullName"
                                                className="mb-1.5 block text-sm font-medium text-slate-700"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="John Doe"
                                                className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.fullName
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-slate-200 focus:border-blue-500"
                                                    }`}
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                                    {errors.fullName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email + Phone (side by side on larger screens) */}
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="you@example.com"
                                                    className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.email
                                                        ? "border-red-400 focus:border-red-500"
                                                        : "border-slate-200 focus:border-blue-500"
                                                        }`}
                                                />
                                                {errors.email && (
                                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="+91 98765 43210"
                                                    className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.phone
                                                        ? "border-red-400 focus:border-red-500"
                                                        : "border-slate-200 focus:border-blue-500"
                                                        }`}
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="mb-1.5 block text-sm font-medium text-slate-700"
                                            >
                                                Subject
                                            </label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="How can we help?"
                                                className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.subject
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-slate-200 focus:border-blue-500"
                                                    }`}
                                            />
                                            {errors.subject && (
                                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="mb-1.5 block text-sm font-medium text-slate-700"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Tell us a bit more about your request..."
                                                className={`w-full resize-none rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.message
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-slate-200 focus:border-blue-500"
                                                    }`}
                                            />
                                            {errors.message && (
                                                <p className="mt-1.5 text-xs font-medium text-red-500">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                /* Success State */
                                <div className="flex flex-col items-center py-8 text-center">
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle2 className="h-9 w-9 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Message Sent!
                                    </h2>
                                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                                        Thanks for reaching out. Our team will get back to you
                                        shortly.
                                    </p>
                                    <button
                                        onClick={handleSendAnother}
                                        className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-semibold text-blue-700 transition-colors duration-200 hover:bg-blue-100"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ */}
                {/* 4. Google Maps Section                                 */}
                {/* ------------------------------------------------------ */}
                <section className="px-4 py-8 sm:py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                Find Us Here
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 sm:text-base">
                                {ADDRESS}
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-blue-100 shadow-lg shadow-blue-100/50">
                            <div className="relative h-[320px] w-full sm:h-[420px]">
                                <iframe
                                    src={MAPS_EMBED_SRC}
                                    title="TodayFix Location Map"
                                    className="absolute inset-0 h-full w-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------ */}
                {/* 6. CTA Section                                         */}
                {/* ------------------------------------------------------ */}
                <section className="px-4 py-12 sm:py-16">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
                            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative">
                                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                    Need Immediate Assistance?
                                </h2>
                                <p className="mx-auto mt-3 max-w-xl text-sm text-blue-50 sm:text-base">
                                    Our team is just a call or message away. Reach out and
                                    we&apos;ll take it from there.
                                </p>

                                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <a
                                        href="tel:08494939493"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow-lg transition-transform duration-200 hover:scale-105 sm:w-auto"
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        Call Now
                                    </a>
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/20 sm:w-auto"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        WhatsApp Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ------------------------------------------------------ */}
            {/* 5. WhatsApp Floating Button                             */}
            {/* ------------------------------------------------------ */}
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
            >
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
            </a>

            <Footer />
        </div>
    );
}
