"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

/* ---------------- TYPES ---------------- */

interface LoginFormData {
    email: string;
    password: string;
}

type FormErrors = Partial<Record<keyof LoginFormData, string>>;

const INITIAL_FORM_DATA: LoginFormData = {
    email: "",
    password: "",
};

/* ---------------- PAGE ---------------- */

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof LoginFormData, boolean>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function validateForm(data: LoginFormData): FormErrors {
        const errors: FormErrors = {};

        if (!data.email.trim()) {
            errors.email = "Email is required";
        }

        if (!data.password) {
            errors.password = "Password is required";
        }

        return errors;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const field = name as keyof LoginFormData;

        setFormData((prev) => ({ ...prev, [field]: value }));

        if (touched[field]) {
            const errs = validateForm({ ...formData, [field]: value });
            setErrors((prev) => ({ ...prev, [field]: errs[field] }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name as keyof LoginFormData;

        setTouched((prev) => ({ ...prev, [field]: true }));
        const errs = validateForm(formData);
        setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    };

    /* ---------------- REAL LOGIN ---------------- */

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        setTouched({ email: true, password: true });

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        setIsSubmitting(false);

        if (res?.error) {
            setErrors({ password: "Invalid email or password" });
            return;
        }

        setIsSubmitted(true);
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session?.user?.role === "ADMIN") {
            router.push("/admin");
        } else {
            router.push("/");
        } // change later if needed
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F5F8FF]">
            <Navbar />

            <main className="flex-1 px-4 py-12 sm:py-16">
                <div className="mx-auto w-full max-w-md">

                    {/* HEADER */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B5ED7] text-white">
                            <Building2 className="h-7 w-7" />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Login to continue
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="rounded-3xl border bg-white p-6 shadow-lg">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* EMAIL */}
                                <div>
                                    <label className="text-sm font-medium">Email</label>

                                    <div className="relative mt-1">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full rounded-lg border py-2 pl-10 pr-3"
                                            placeholder="Enter email"
                                        />
                                    </div>

                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label className="text-sm font-medium">Password</label>

                                    <div className="relative mt-1">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full rounded-lg border py-2 pl-10 pr-10"
                                            placeholder="Enter password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2.5 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            Login
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-400">
                                    Secure login powered by NextAuth
                                </p>
                            </form>
                        ) : (
                            <div className="text-center">
                                <CheckCircle2 className="mx-auto text-green-500" />
                                <h2 className="text-lg font-bold mt-2">
                                    Login Successful
                                </h2>

                                <button
                                    onClick={() => router.push("/admin")}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-center mt-4 text-sm">
                        Don&apos;t have account?{" "}
                        <Link href="/register" className="text-blue-600">
                            Register
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}