import { NextRequest, NextResponse } from "next/server";
import { sendCommand, DPS } from "@/lib/tuya";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value } = body as { value: boolean };

    if (typeof value !== "boolean") {
      return NextResponse.json(
        { success: false, error: "value must be a boolean" },
        { status: 400 }
      );
    }

    await sendCommand([{ code: DPS.POWER, value }]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/device/power]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
