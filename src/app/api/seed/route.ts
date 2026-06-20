import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { businesses } from "@/data/mockData";

export async function GET() {
    try {
        await prisma.business.deleteMany();

        for (const business of businesses) {
            await prisma.business.create({
                data: {
                    name: business.name,
                    slug: business.slug,
                    category: business.category,
                    categorySlug: business.categorySlug,
                    description: business.description,
                    aboutText: business.aboutText,
                    address: business.address,
                    area: business.area,
                    city: business.city,
                    citySlug: business.citySlug,
                    state: business.state,
                    phone: business.phone,
                    whatsapp: business.whatsapp,
                    email: business.email,
                    website: business.website,
                    rating: business.rating,
                    reviewsCount: business.reviewsCount,

                    verified: business.isVerified,

                    experience: business.experience,
                    workingHours: business.workingHours,
                },
            });
        }

        return NextResponse.json({
            success: true,
            count: businesses.length,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            error: String(error),
        });
    }
}