import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET categories
export async function GET() {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
}

// CREATE category
export async function POST(req: Request) {
    const { name, slug } = await req.json();

    const category = await prisma.category.create({
        data: { name, slug },
    });

    return NextResponse.json(category);
}