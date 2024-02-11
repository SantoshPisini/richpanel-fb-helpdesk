import connectDB from "@/lib/mongodb";
import Agent from "@/models/AgentModel";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password, name, remember } = await req.json();
  await connectDB();
  const existingUser = await Agent.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists!" },
      { status: 400 }
    );
  }
  const hashedPassword = await hash(password, 7);
  const user = new Agent({
    email,
    password: hashedPassword,
    name,
  });
  try {
    const res = await user.save();
    const tokenData = {
      id: res._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: remember ? "1d" : "1h",
    });
    const response = NextResponse.json(
      {
        message: "Login successful",
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
