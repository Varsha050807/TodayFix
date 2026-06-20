"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Loader2,
    LogIn,
    ShieldCheck,
    Building2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LoginFormData {
    email: string;
    password: string;
}

type FormErrors = Partial<Record<keyof LoginFormData, string>>;

const INITIAL_FORM_DATA: LoginFormData = {
    email: "",
    password: "",
};

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function validateForm(data: LoginFormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.password) {
        errors.password = "Password is required.";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof LoginFormData, boolean>>
    >({});
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof LoginFormData;

        const updatedData = { ...formData, [fieldName]: value };
        setFormData(updatedData);

        if (touched[fieldName]) {
            const fieldErrors = validateForm(updatedData);
            setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors[fieldName] }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof LoginFormData;
        setTouched((prev) => ({ ...prev, [fieldName]: true }));
        const fieldErrors = validateForm(formData);
        setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors[fieldName] }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        setTouched({ email: true, password: true });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        // No backend yet — simulate a short delay, then log the payload.
        await new Promise((resolve) => setTimeout(resolve, 900));

        // eslint-disable-next-line no-console
        console.log("Login form submission:", { ...formData, rememberMe });

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F5F8FF]">
            <Navbar />

            <main className="flex-1 px-4 py-12 sm:py-16">
                <div className="mx-auto w-full max-w-md">
                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B5ED7] text-white shadow-lg shadow-blue-600/30">
                            <Building2 className="h-7 w-7" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Welcome Back
                        </h1>
                        <p className="mx-auto mt-2.5 max-w-sm text-sm text-slate-500 sm:text-base">
                            Login to manage your business listings and customer enquiries.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/50 sm:p-8">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                {/* Email Address */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.email
                                                    ? "border-red-400 focus:border-red-500"
                                                    : touched.email
                                                        ? "border-emerald-400 focus:border-emerald-500"
                                                        : "border-slate-200 focus:border-[#0B5ED7]"
                                                }`}
                                        />
                                        {touched.email && !errors.email && (
                                            <CheckCircle2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                                        )}
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-700"
                                        >
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-semibold text-[#0B5ED7] transition-colors hover:text-[#094bb8] hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.password
                                                    ? "border-red-400 focus:border-red-500"
                                                    : touched.password
                                                        ? "border-emerald-400 focus:border-emerald-500"
                                                        : "border-slate-200 focus:border-[#0B5ED7]"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center">
                                    <label
                                        htmlFor="rememberMe"
                                        className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
                                    >
                                        <input
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-[#0B5ED7] accent-[#0B5ED7] focus:ring-2 focus:ring-blue-500/40"
                                        />
                                        Remember Me
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B5ED7] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-[#094bb8] hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Logging In...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            Login
                                        </>
                                    )}
                                </button>

                                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Your information is safe and secure with TodayFix.
                                </p>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="flex flex-col items-center py-6 text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Login Successful!
                                </h2>
                                <p className="mt-2 max-w-sm text-sm text-slate-500">
                                    Welcome back to TodayFix. You can now manage your business
                                    listings and customer enquiries.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#0B5ED7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-[#094bb8]"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Register prompt */}
                    {!isSubmitted && (
                        <p className="mt-6 text-center text-sm text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-[#0B5ED7] transition-colors hover:text-[#094bb8] hover:underline"
                            >
                                Register Here
                            </Link>
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
