import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCard from "@/components/shared/BusinessCard";

interface SearchPageProps {
    searchParams: {
        q?: string;
        city?: string;
        category?: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q?.trim() || "";
    const city = searchParams.city?.trim() || "";
    const category = searchParams.category?.trim() || "";

    // Build query string safely (avoids empty params issues)
    const params = new URLSearchParams();

    if (query) params.append("q", query);
    if (city) params.append("city", city);
    if (category) params.append("category", category);

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(
        `${baseUrl}/api/businesses?${params.toString()}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();
    const businesses = data.businesses || [];

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50 pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4">

                    {/* FILTER FORM */}
                    <form method="GET" className="flex flex-col md:flex-row gap-3 mb-6">
                        <input
                            name="q"
                            defaultValue={query}
                            placeholder="Search services (e.g. plumber)"
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        <input
                            name="city"
                            defaultValue={city}
                            placeholder="City (e.g. Mumbai)"
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        <input
                            name="category"
                            defaultValue={category}
                            placeholder="Category (e.g. electricians)"
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Search
                        </button>
                    </form>

                    {/* HEADER */}
                    <h1 className="text-3xl font-bold mb-2">
                        Search Results
                    </h1>

                    <p className="text-slate-600 mb-8">
                        Found {businesses.length} businesses
                    </p>

                    {/* RESULTS */}
                    {businesses.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {businesses.map((business: any) => (
                                <BusinessCard
                                    key={business.id}
                                    business={business}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-2xl text-center">
                            <h2 className="text-xl font-semibold">
                                No results found
                            </h2>
                            <p className="text-slate-500 mt-2">
                                Try another keyword, city, or category.
                            </p>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </>
    );
}