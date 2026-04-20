import { NextResponse } from "next/server";
import { sendCommand } from "@/lib/tuya";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();

    // Fix 2554: only pass 1 argument as defined in your lib/tuya.ts
    // Fix 18046: Use 'any' or a defined interface for the result
    const result = await sendCommand([
      {
        code: "anion", // Verified from your screenshot
        value: !!value, // Ensure boolean
      },
    ]) as any; 

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Tuya Command Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to toggle anion" },
      { status: 500 }
    );
  }
}