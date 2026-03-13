import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { token, password } = await request.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { resetToken: token } });
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(password, 10),
      resetToken: null
    }
  });

  return NextResponse.json({ success: true });
}
