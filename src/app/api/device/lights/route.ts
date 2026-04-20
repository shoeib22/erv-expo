import { NextResponse } from "next/server";
import { sendCommand } from "@/lib/tuya";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();

    // The screenshot confirms 'light' is the code and it takes a boolean
    await sendCommand([
      {
        code: "light",
        value: !!value, // Forces the input to a strict boolean
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}