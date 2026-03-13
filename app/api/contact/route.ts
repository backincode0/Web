import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  await sendEmail({
    to: process.env.ADMIN_EMAIL ?? "hello@wfereger.studio",
    subject: "New contact request",
    html: `<p><strong>${name}</strong> (${email}) submitted a contact request:</p><p>${message}</p>`
  });

  return NextResponse.json({ status: "ok" });
}
