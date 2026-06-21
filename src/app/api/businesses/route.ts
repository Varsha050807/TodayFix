import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(businesses);
}