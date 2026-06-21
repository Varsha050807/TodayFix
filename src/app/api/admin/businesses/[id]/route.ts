import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
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