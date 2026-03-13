import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";
const EXPIRATION = "7d";

export function signJwt(payload: Record<string, unknown>, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRATION,
    ...(options ?? {})
  });
}

export function verifyJwt<T = Record<string, unknown>>(token: string) {
  return jwt.verify(token, JWT_SECRET, { complete: false }) as T;
}
