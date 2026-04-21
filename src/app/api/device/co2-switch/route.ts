import { NextResponse } from "next/server";
import { sendCommand } from "@/lib/tuya";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();
    await sendCommand([{ code: "co2_switch", value: !!value }]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}