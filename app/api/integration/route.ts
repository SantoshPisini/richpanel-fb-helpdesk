import connectDB from "@/lib/mongodb";
import Integration from "@/models/FbModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/models/Request/JWT";

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
  const body: IntegrationModel = await req.json();
  await connectDB();
  const existingIntegration = await Integration.findOne({
    agent_id: tokenData.id,
  });
  if (existingIntegration) {
    await Integration.findByIdAndDelete(existingIntegration._id);
  }
  const integration = new Integration({
    agent_id: tokenData.id,
    user_id: body.user_id,
    page_id: body.page_id,
    page_name: body.page_name,
    page_access_token: body.page_access_token,
    refresh_token: body.refresh_token,
    data_access_expiration_time: body.data_access_expiration_time,
  });
  try {
    const res = await integration.save();
    return NextResponse.json(
      { message: "Linked Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}

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
  const existingIntegration = await Integration.findOne({
    agent_id: tokenData.id,
  });
  try {
    return NextResponse.json(
      { page_name: existingIntegration?.page_name ?? undefined },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
  if (existingIntegration) {
    await Integration.findByIdAndDelete(existingIntegration._id);
  }
  // TODO: Call FB to invalidate token.
  try {
    return NextResponse.json({ message: "Unlinked!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to link. Please contact us!" },
      { status: 500 }
    );
  }
}
