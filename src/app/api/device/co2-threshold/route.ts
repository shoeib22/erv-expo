import { NextResponse } from "next/server";
import { sendCommand } from "@/lib/tuya";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();
    const clamped = Math.min(2000, Math.max(400, Number(value)));
    await sendCommand([{ code: "co2_threshold", value: clamped }]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}