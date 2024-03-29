import connectDB from "@/lib/mongodb";
import FbWebhook from "@/models/FbWebhook";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // AUTH
  let token = req.nextUrl.searchParams.get("hub.verify_token");
  let mode = req.nextUrl.searchParams.get("hub.mode");
  let challenge = req.nextUrl.searchParams.get("hub.challenge");
  if (mode && token) {
    if (mode === "subscribe" && token === "fB-t0keN") {
      return NextResponse.json(Number(challenge), { status: 200 });
    } else {
      return NextResponse.json({ message: "!" }, { status: 403 });
    }
  }
  await connectDB();
  // Duplicate check
  const body = req.body;
  if (!body) {
    return NextResponse.json({ message: "No Content!" }, { status: 200 });
  }
  console.log(body);
  try {
    const data = new FbWebhook({ temp: JSON.stringify(body) });
    await data.save();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Webhook Failed." }, { status: 500 });
  }
}
