import connectDB from "@/lib/mongodb";
import Integration from "@/models/FbModel";
import FbWebhook from "@/models/FbWebhook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // AUTH
  await connectDB();
  // Duplicate check
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "No Content!" }, { status: 200 });
  }
  console.log(JSON.stringify(body));
  try {
    const data = new FbWebhook({ temp: JSON.stringify(body) });
    await data.save();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Webhook Failed." }, { status: 500 });
  }
}
