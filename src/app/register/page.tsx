"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Loader2,
    UserPlus,
    ShieldCheck,
    Building2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RegisterFormData {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
}

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

const INITIAL_FORM_DATA: RegisterFormData = {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
};

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function validateForm(data: RegisterFormData): FormErrors {
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

    if (!data.mobile.trim()) {
        errors.mobile = "Mobile number is required.";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(data.mobile.trim())) {
        errors.mobile = "Please enter a valid mobile number.";
    }

    if (!data.password) {
        errors.password = "Password is required.";
    } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
        errors.password =
            "Password must include at least one uppercase letter and one number.";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

function getPasswordStrength(password: string): {
    label: string;
    percent: number;
    colorClass: string;
} {
    if (!password) {
        return { label: "", percent: 0, colorClass: "bg-slate-200" };
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) {
        return { label: "Weak", percent: 25, colorClass: "bg-red-500" };
    }
    if (score <= 3) {
        return { label: "Medium", percent: 60, colorClass: "bg-amber-500" };
    }
    return { label: "Strong", percent: 100, colorClass: "bg-emerald-500" };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof RegisterFormData, boolean>>
    >({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const passwordStrength = getPasswordStrength(formData.password);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof RegisterFormData;

        const updatedData = { ...formData, [fieldName]: value };
        setFormData(updatedData);

        if (touched[fieldName]) {
            const fieldErrors = validateForm(updatedData);
            setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors[fieldName] }));

            // Re-validate confirm password live if password changes after it was touched
            if (fieldName === "password" && touched.confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: validateForm(updatedData).confirmPassword,
                }));
            }
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof RegisterFormData;
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
            mobile: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        // No backend yet — simulate a short delay, then log the payload.
        await new Promise((resolve) => setTimeout(resolve, 900));

        // eslint-disable-next-line no-console
        console.log("Register form submission:", formData);

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
                            Create Your TodayFix Account
                        </h1>
                        <p className="mx-auto mt-2.5 max-w-sm text-sm text-slate-500 sm:text-base">
                            Join TodayFix and start managing your business listings and
                            enquiries.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/50 sm:p-8">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="John Doe"
                                            autoComplete="name"
                                            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.fullName
                                                ? "border-red-400 focus:border-red-500"
                                                : touched.fullName
                                                    ? "border-emerald-400 focus:border-emerald-500"
                                                    : "border-slate-200 focus:border-[#0B5ED7]"
                                                }`}
                                        />
                                        {touched.fullName && !errors.fullName && (
                                            <CheckCircle2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                                        )}
                                    </div>
                                    {errors.fullName && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

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

                                {/* Mobile Number */}
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="+91 98765 43210"
                                            autoComplete="tel"
                                            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.mobile
                                                ? "border-red-400 focus:border-red-500"
                                                : touched.mobile
                                                    ? "border-emerald-400 focus:border-emerald-500"
                                                    : "border-slate-200 focus:border-[#0B5ED7]"
                                                }`}
                                        />
                                        {touched.mobile && !errors.mobile && (
                                            <CheckCircle2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                                        )}
                                    </div>
                                    {errors.mobile && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.mobile}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Create a strong password"
                                            autoComplete="new-password"
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

                                    {formData.password && (
                                        <div className="mt-2">
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.colorClass}`}
                                                    style={{ width: `${passwordStrength.percent}%` }}
                                                />
                                            </div>
                                            {passwordStrength.label && (
                                                <p className="mt-1 text-xs font-medium text-slate-500">
                                                    Password strength:{" "}
                                                    <span className="font-semibold">
                                                        {passwordStrength.label}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {errors.password && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Re-enter your password"
                                            autoComplete="new-password"
                                            className={`w-full rounded-xl border bg-white py-3 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${errors.confirmPassword
                                                ? "border-red-400 focus:border-red-500"
                                                : touched.confirmPassword
                                                    ? "border-emerald-400 focus:border-emerald-500"
                                                    : "border-slate-200 focus:border-[#0B5ED7]"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            aria-label={
                                                showConfirmPassword ? "Hide password" : "Show password"
                                            }
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
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
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4" />
                                            Create Account
                                        </>
                                    )}
                                </button>

                                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Your information is safe and never shared without consent.
                                </p>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="flex flex-col items-center py-6 text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Account Created!
                                </h2>
                                <p className="mt-2 max-w-sm text-sm text-slate-500">
                                    Welcome to TodayFix. You can now log in and start managing
                                    your business listings and enquiries.
                                </p>
                                <Link
                                    href="/login"
                                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#0B5ED7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-[#094bb8]"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Already have an account */}
                    {!isSubmitted && (
                        <p className="mt-6 text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-[#0B5ED7] transition-colors hover:text-[#094bb8] hover:underline"
                            >
                                Login Here
                            </Link>
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
