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

/* ---------------- TYPES ---------------- */

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

/* ---------------- VALIDATION ---------------- */

function validateForm(data: RegisterFormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.fullName.trim()) errors.fullName = "Full name is required.";
    else if (data.fullName.trim().length < 2)
        errors.fullName = "Must be at least 2 characters.";

    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "Invalid email.";

    if (!data.mobile.trim()) errors.mobile = "Mobile is required.";

    if (!data.password) errors.password = "Password is required.";
    else if (data.password.length < 8)
        errors.password = "Min 8 characters required.";

    if (data.confirmPassword !== data.password)
        errors.confirmPassword = "Passwords do not match.";

    return errors;
}

/* ---------------- COMPONENT ---------------- */

export default function RegisterPage() {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors({ email: data.error || "Registration failed" });
                return;
            }

            setIsSubmitted(true);
        } catch (err) {
            setErrors({ email: "Server error. Try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F5F8FF]">
            <Navbar />

            <main className="flex-1 px-4 py-12">
                <div className="mx-auto max-w-md">

                    {/* HEADER */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B5ED7] text-white">
                            <Building2 />
                        </div>
                        <h1 className="text-2xl font-bold">Create Account</h1>
                    </div>

                    {/* SUCCESS */}
                    {isSubmitted ? (
                        <div className="text-center">
                            <CheckCircle2 className="mx-auto text-emerald-500 w-12 h-12" />
                            <h2 className="text-xl font-bold mt-4">Account Created</h2>

                            <Link
                                href="/login"
                                className="mt-6 inline-block bg-[#0B5ED7] text-white px-6 py-2 rounded-xl"
                            >
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        /* FORM */
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                name="fullName"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            <input
                                name="mobile"
                                placeholder="Mobile"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            />

                            <button
                                disabled={isSubmitting}
                                className="w-full bg-[#0B5ED7] text-white p-3 rounded-xl"
                            >
                                {isSubmitting ? "Creating..." : "Create Account"}
                            </button>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}