import { NextResponse } from "next/server";
import { fetchDeviceStatus } from "@/lib/tuya";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await fetchDeviceStatus();
    return NextResponse.json({ success: true, data: state });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[GET /api/device]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
