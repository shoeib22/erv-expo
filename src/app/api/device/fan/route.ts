import { NextRequest, NextResponse } from "next/server";
import { sendCommand, DPS } from "@/lib/tuya";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value } = body as { value: number };

    const speed = Math.round(value);
    if (typeof speed !== "number" || speed < 0 || speed > 100) {
      return NextResponse.json(
        { success: false, error: "value must be an integer between 0 and 100" },
        { status: 400 }
      );
    }

    await sendCommand([{ code: DPS.FAN_SPEED, value: speed }]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/device/fan]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
