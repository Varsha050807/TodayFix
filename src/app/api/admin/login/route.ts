import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (user.password !== password) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 }
            );
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Not an admin account" },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}