import { NextRequest, NextResponse } from "next/server";
import { sendCommand, DPS } from "@/lib/tuya";
import type { DeviceMode } from "@/lib/types";

const VALID_MODES: DeviceMode[] = ["Supply", "exhaust", "ventilate"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value } = body as { value: DeviceMode };

    if (!VALID_MODES.includes(value)) {
      return NextResponse.json(
        { success: false, error: `mode must be one of: ${VALID_MODES.join(", ")}` },
        { status: 400 }
      );
    }

    await sendCommand([{ code: DPS.MODE, value }]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/device/mode]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
