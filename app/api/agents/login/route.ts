import connectDB from "@/lib/mongodb";
import Agent from "@/models/AgentModel";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password, name, remember } = await req.json();
  await connectDB();

  const user = await Agent.findOne({
    email: email,
  });
  if (!user) {
    return NextResponse.json(
      { error: "Either email or password is invalid!" },
      { status: 400 }
    );
  }
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json(
      { error: "Either email or password is invalid!" },
      { status: 400 }
    );
  }

  try {
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: remember ? "1d" : "1h",
    });
    const response = NextResponse.json(
      {
        message: "Login successful",
        data: tokenData,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create your account. Please contact us!" },
      { status: 500 }
    );
  }
}
