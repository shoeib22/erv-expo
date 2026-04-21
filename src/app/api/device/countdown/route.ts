import { NextResponse } from "next/server";
import { sendCommand } from "@/lib/tuya";

const VALID = ["cancel", "1h", "2h", "3h", "4h", "5h", "6h"] as const;
type CountdownValue = typeof VALID[number];

export async function POST(req: Request) {
  try {
    const { value } = await req.json();
    if (!VALID.includes(value)) {
      return NextResponse.json(
        { success: false, error: `Invalid countdown value: ${value}` },
        { status: 400 }
      );
    }
    await sendCommand([{ code: "countdown_set", value }]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}