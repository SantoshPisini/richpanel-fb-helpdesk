import connectDB from "@/lib/mongodb";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Conversation from "@/models/ConversationModel";
import MessageModel from "@/models/MessageModel";
import { ConvoResponseModel } from "@/models/Response/ConvoResponseModel";

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
  const conversations = await Conversation.find({
    agent_id: tokenData.id,
  }).select("conversation_id updated_time");

  const conversationIds = conversations.map((x) => x.conversation_id);

  const messages = await MessageModel.find({
    conversation_id: { $in: conversationIds },
  }).select(
    "conversation_id created_time message message_to_name message_from_email message_to_id message_from_name message_from_id"
  );

  let result: ConvoResponseModel[] = [];
  conversations.forEach((conversation) => {
    let model: ConvoResponseModel = {
      _id: conversation._id,
      conversation_id: conversation.conversation_id,
      updated_time: conversation.updated_time,
      messages: messages
        .filter((x) => x.conversation_id === conversation.conversation_id)
        .sort(function (a, b) {
          return (
            new Date(a.created_time).getTime() -
            new Date(b.created_time).getTime()
          );
        }),
    };
    result.push(model);
  });

  try {
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}
