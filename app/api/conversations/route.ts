import connectDB from "@/lib/mongodb";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Conversation from "@/models/ConversationModel";

export async function GET(req: NextRequest) {
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
  await connectDB();
  const conversations = await Conversation.find();
  try {
    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}
