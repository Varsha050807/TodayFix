import { PrismaClient } from "@prisma/client";
import { businesses } from "../src/data/mockData";
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding businesses...");

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

    console.log(`Seeded ${businesses.length} businesses`);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });