"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    // 1. FETCH
    useEffect(() => {
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    // 2. ADD
    async function addCategory() {
        const res = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug }),
        });

        const data = await res.json();
        setCategories([...categories, data]);
    }

    // 3. DELETE
    async function deleteCategory(id: string) {
        await fetch(`/api/admin/categories/${id}`, {
            method: "DELETE",
        });

        setCategories(categories.filter((c: any) => c.id !== id));
    }

    return (
        <div>
            <h1>Category Management</h1>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
            />

            <button onClick={addCategory}>Add</button>

            <ul>
                {categories.map((c: any) => (
                    <li key={c.id}>
                        {c.name}
                        <button onClick={() => deleteCategory(c.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}