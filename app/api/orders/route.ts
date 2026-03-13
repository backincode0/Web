import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { ownerId: user.id },
    include: { service: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { serviceId, title, description, budget, deadline, fileName, fileType } = await request.json();
  const numericServiceId = Number(serviceId);
  const targetDate = new Date(deadline);
  if (Number.isNaN(targetDate.getTime())) {
    return NextResponse.json({ error: "Invalid deadline" }, { status: 400 });
  }

  const created = await prisma.order.create({
    data: {
      title,
      description,
      budget,
      deadline: targetDate,
      fileName,
      fileType,
      serviceId: numericServiceId,
      ownerId: user.id
    }
  });

  await sendEmail({
    to: user.email,
    subject: "Order confirmed",
    html: `<p>Your order <strong>${title}</strong> is queued. We will update the dashboard once it starts.</p>`
  });

  await sendEmail({
    to: process.env.ADMIN_EMAIL ?? "hello@wfereger.studio",
    subject: "New order received",
    html: `<p>${user.email} submitted <strong>${title}</strong>.</p>`
  });

  return NextResponse.json(created);
}
