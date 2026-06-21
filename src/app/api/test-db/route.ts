import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const businesses = await prisma.business.findMany();

    const safeBusinesses = businesses.map((b) => ({
        ...b,
        verified: b.verified, // make it explicit (safe mapping)
    }));

    return NextResponse.json({
        success: true,
        count: safeBusinesses.length,
        businesses: safeBusinesses,
    });
}