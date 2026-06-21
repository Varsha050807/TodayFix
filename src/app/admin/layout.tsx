import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (typeof window !== "undefined") {
        const admin = localStorage.getItem("admin");

        if (!admin) {
            window.location.href = "/admin/login";
        }
    }
    return (
        <div className="min-h-screen flex bg-slate-100">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">TodayFix Admin</h2>

                <nav className="space-y-3">
                    <Link href="/admin">Dashboard</Link>
                    <Link href="/admin/businesses">Businesses</Link>
                    <Link href="/admin/categories">Categories</Link>
                    <Link href="/admin/cities">Cities</Link>
                    <Link href="/admin/enquiries">Enquiries</Link>
                    <Link href="/admin/users">Users</Link>
                    <Link href="/admin/reviews">Reviews</Link>
                </nav>
            </aside>


            {/* Content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}