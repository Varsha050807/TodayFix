import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
    console.log("🔥 VERIFY ROUTE HIT");
    console.log("PARAMS:", params);

    return NextResponse.json({
        debug: "route is working",
        id: params?.id,
    });
}