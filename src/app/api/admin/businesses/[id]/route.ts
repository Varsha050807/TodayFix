import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, context: any) {
    try {
        const id = context.params.id;

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