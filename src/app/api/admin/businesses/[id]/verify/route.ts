import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function POST_impl(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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

export const POST = POST_impl as unknown as (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => Promise<Response>;