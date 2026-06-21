import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: Request,
    context: { params: { id: string } }
) {
    const { id } = context.params;

    try {
        const business = await prisma.business.update({
            where: { id },
            data: { verified: true },
        });

        return NextResponse.json({ success: true, business });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Verification failed" },
            { status: 500 }
        );
    }
}