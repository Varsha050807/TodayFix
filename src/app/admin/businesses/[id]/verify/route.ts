import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("🔥 VERIFY ROUTE HIT");
    console.log("PARAMS:", id);

    return NextResponse.json({
        debug: "route is working",
        id: id,
    });
}