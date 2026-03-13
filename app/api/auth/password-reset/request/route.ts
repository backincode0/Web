import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ success: true });
  }

  const resetToken = randomUUID();
  await prisma.user.update({ where: { email }, data: { resetToken } });

  await sendEmail({
    to: user.email,
    subject: "WFEREGER password reset",
    html: `<p>Reset your password <a href="${process.env.APP_URL ?? "http://localhost:3000"}/auth/reset?token=${resetToken}">here</a>.</p>`
  });

  return NextResponse.json({ success: true });
}
