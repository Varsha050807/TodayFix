"use client";

import { useEffect, useState } from "react";

type Business = {
    id: string;
    name: string;
    city: string;
    verified: boolean;
};

export default function BusinessesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/businesses")
            .then((res) => res.json())
            .then((data) => {
                setBusinesses(data);
                setLoading(false);
            });
    }, []);

    async function deleteBusiness(id: string) {
        await fetch(`/api/admin/businesses/${id}`, {
            method: "DELETE",
        });

        setBusinesses((prev) =>
            prev.filter((b) => b.id !== id)
        );
    }

    async function toggleVerify(id: string) {
        const res = await fetch(
            `/api/admin/businesses/${id}/verify`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        setBusinesses((prev) =>
            prev.map((b) =>
                b.id === id
                    ? { ...b, verified: data.verified }
                    : b
            )
        );
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Businesses Management
            </h1>

            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">City</th>
                        <th className="p-3 text-left">Verified</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {businesses.map((b) => (
                        <tr key={b.id} className="border-b">
                            <td className="p-3">{b.name}</td>
                            <td className="p-3">{b.city}</td>
                            <td className="p-3">
                                {b.verified ? "Yes" : "No"}
                            </td>
                            <td className="p-3 flex gap-3">
                                <button
                                    onClick={() =>
                                        toggleVerify(b.id)
                                    }
                                    className="text-green-600"
                                >
                                    Toggle
                                </button>

                                <button
                                    onClick={() =>
                                        deleteBusiness(b.id)
                                    }
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}