import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    include: { service: true, owner: true },
    orderBy: { updatedAt: "desc" }
  });

  return NextResponse.json(orders);
}

const orderStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export async function PATCH(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, status } = await request.json();
  if (!orderStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const updated = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status },
    include: { owner: true, service: true }
  });

  const owner = updated.owner;
  if (owner) {
    await sendEmail({
      to: owner.email,
      subject: `Order ${updated.title} is ${status.toLowerCase().replace("_", " ")}`,
      html: `<p>Your order <strong>${updated.title}</strong> is now ${status.toLowerCase().replace("_", " ")}.</p>`
    });
  }

  return NextResponse.json(updated);
}
