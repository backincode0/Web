import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { signJwt } from "@/lib/jwt";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 422 });
  }

  const verificationToken = randomUUID();
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      verificationToken
    }
  });

  await sendEmail({
    to: user.email,
    subject: "Verify your WFEREGER account",
    html: `<p>Click <a href="${process.env.APP_URL ?? "http://localhost:3000"}/auth/verify?token=${verificationToken}">here</a> to activate your account.</p>`
  });

  const token = signJwt({ sub: user.id, role: user.role, email: user.email, name: user.name });
  const response = NextResponse.json({ message: "User created", user: { id: user.id, email: user.email } });
  response.cookies.set("studio_token", token, COOKIE_OPTIONS);
  return response;
}
