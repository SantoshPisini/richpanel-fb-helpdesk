import connectDB from "@/lib/mongodb";
import Integration from "@/models/FbModel";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  let tokenData: JwtPayload;
  try {
    tokenData = jwt.verify(token, process.env.TOKEN_SECRET!) as any;
  } catch (error) {
    console.error(error);
    const response = NextResponse.json(
      { error: "Unauthorized!" },
      { status: 401 }
    );
    response.cookies.delete("token");
    return response;
  }
  const body = await req.json();
  await connectDB();
  const existingIntegration = await Integration.findOne({
    agent_id: tokenData.id,
  });
  if (!existingIntegration) {
    return NextResponse.json(
      { error: "No link. Re-connect to your page and try again!" },
      { status: 400 }
    );
  }
  // TODO: Check Token Expiry
  const message_response = await fetch(
    `https://graph.facebook.com/v19.0/${existingIntegration.page_id}/messages?recipient={'id':'${body.conversation_id}'}&messaging_type=RESPONSE&message={'text':'${body.message}'}&access_token=${existingIntegration?.page_access_token}`,
    {
      method: "POST",
    }
  );

  if (message_response.ok) {
    let message_ids = await message_response.json();
  }
  // T0 DB
  // Force Sync now :(
  try {
    return NextResponse.json({ message: "Successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed. Please contact us!" },
      { status: 500 }
    );
  }
}
