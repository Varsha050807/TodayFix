import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const q = searchParams.get("q")?.trim() || "";
        const city = searchParams.get("city")?.trim() || "";

        const businesses = await prisma.business.findMany({
            where: {
                AND: [
                    q
                        ? {
                            OR: [
                                {
                                    name: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    category: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    area: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        }
                        : {},

                    city
                        ? {
                            city: {
                                contains: city,
                                mode: "insensitive",
                            },
                        }
                        : {},
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            count: businesses.length,
            businesses,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: String(error),
        });
    }
}