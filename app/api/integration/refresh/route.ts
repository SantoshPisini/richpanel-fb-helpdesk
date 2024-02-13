import connectDB from "@/lib/mongodb";
import Integration from "@/models/FbModel";
import { JwtPayload } from "@/models/Request/JWT";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Auth move to common
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
    const access_token_response = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process
        .env.FACEBOOK_CLIENT_ID!}&client_secret=${process.env
        .FACEBOOK_CLIENT_SECRET!}&fb_exchange_token=${
        existingIntegration.refresh_token
      }`
    );
    if (access_token_response.ok) {
      const access_token_response_body = await access_token_response.json();
      // Page refresh
      const page_response = await fetch(
        `https://graph.facebook.com/v19.0/${existingIntegration.page_id}?fields=access_token,id,name&access_token=${access_token_response_body.access_token}`
      );
      if (page_response.ok) {
        const page_response_body = await page_response.json();
        let updatedData = { ...existingIntegration };
        updatedData.page_name = page_response_body.name;
        updatedData.access_token = page_response_body.access_token;
        const res = await Integration.findOneAndUpdate(
          { _id: existingIntegration._id },
          {
            page_name: page_response_body.name,
            page_access_token: page_response_body.access_token,
          },
          { overwrite: true }
        );
        return NextResponse.json(page_response_body, { status: 200 });
      } else {
        throw new Error("Page Refresh Failed!");
      }
    } else {
      throw new Error("Refresh Token Failed!");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}
