import { env } from "@/configs/envConfig";
import { JWT } from "@repo/utils";
import { TokenType } from "@repo/utils/src/jwt/types";

const jwtInstance = new JWT({
  access: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: "15m",
  },
  refresh: {
    secret: env.JWT_REFRESH_SECRET,
    expiresIn: "7d",
  },
});

export function generateToken(payload: object, type: TokenType = "access") {
  return jwtInstance.signToken(payload, {}, type);
}

export function verifyToken<T = object>(
  token: string,
  type: TokenType = "access",
): T {
  return jwtInstance.verifyToken<T>(token, type);
}

export function decodeToken<T = object>(token: string): T | null {
  try {
    return jwtInstance.decodeToken<T>(token);
  } catch {
    return null;
  }
}
