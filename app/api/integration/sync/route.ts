import connectDB from "@/lib/mongodb";
import Conversation from "@/models/ConversationModel";
import Integration from "@/models/FbModel";
import Message from "@/models/MessageModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  let tokenData: any;
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
  const existingIntegration = await Integration.findOne({
    agent_id: tokenData.id,
  });
  if (!existingIntegration) {
    return NextResponse.json(
      { error: "No link. Re-connect to your page and try again!" },
      { status: 400 }
    );
  }

  try {
    // Conversation's
    // TODO: Cursor
    const conversation_response = await fetch(
      `https://graph.facebook.com/v19.0/${existingIntegration.page_id}/conversations?access_token=${existingIntegration?.page_access_token}`
    );
    if (conversation_response.ok) {
      let conversation_data = await conversation_response.json();
      conversation_data.data.forEach(async function (conversation: any) {
        await Conversation.findOneAndUpdate(
          {
            agent_id: tokenData.id,
            conversation_id: conversation.id,
          },
          {
            updated_time: conversation.updated_time,
            integration_id: existingIntegration._id,
          },
          {
            upsert: true,
          }
        );

        // Save Messages
        const messages_ids_response = await fetch(
          `https://graph.facebook.com/v19.0/${conversation.id}?fields=messages&access_token=${existingIntegration?.page_access_token}`
        );
        if (messages_ids_response.ok) {
          let message_ids = await messages_ids_response.json();
          message_ids = message_ids.messages.data;
          //  Cursor - Now at-most 20
          message_ids.forEach(async function (message: any) {
            const message_response = await fetch(
              `https://graph.facebook.com/v19.0/${message.id}?fields=id,created_time,from,to,message&access_token=${existingIntegration?.page_access_token}`
            );
            let message_data = await message_response.json();
            console.log(JSON.stringify(message_data));
            if (message_response.ok) {
              await Message.findOneAndUpdate(
                {
                  agent_id: tokenData.id,
                  message_id: message.id,
                },
                {
                  integration_id: existingIntegration._id,
                  conversation_id: conversation.id,
                  message: message_data.message,
                  message_from_name: message_data.from.name,
                  message_from_email: message_data.from.email,
                  message_from_id: message_data.from.id,
                  message_to_id: message_data.to.data[0].id,
                  message_to_name: message_data.to.data[0].username,
                  created_time: message_data.created_time,
                },
                {
                  upsert: true,
                }
              );
            }
          });
        }
      });
    }

    return NextResponse.json(
      { message: "Linked Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed. Please contact us!" },
      { status: 500 }
    );
  }
}
