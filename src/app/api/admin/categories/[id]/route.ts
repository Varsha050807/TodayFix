import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.business.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}