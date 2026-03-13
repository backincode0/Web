import { prisma } from "./prisma";
import { verifyJwt } from "./jwt";

export interface AuthTokenPayload {
  sub: number;
  role: string;
  email: string;
  name?: string;
}

export async function getUserFromToken(token: string | undefined) {
  if (!token) return null;

  try {
    const payload = verifyJwt<AuthTokenPayload>(token);
    return await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { orders: true }
    });
  } catch (error) {
    return null;
  }
}

export async function getUserFromRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/studio_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;
  return await getUserFromToken(token ?? undefined);
}
