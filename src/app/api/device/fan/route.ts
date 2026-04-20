// src/app/api/device/fan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendCommand, DPS } from "@/lib/tuya";

export async function POST(req: NextRequest) {
  try {
    const { value } = await req.json(); // 1, 2, or 3

    // Use the verified code "fan_speed"
    await sendCommand([{ 
      code: "fan_speed", 
      value: Number(value) 
    }]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}