import { env } from "@/configs/envConfig";
import { IUser } from "@/modules/user/user.interface";
import { JWT } from "@repo/utils";

const jwtInstance = new JWT({
  access: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: "1d",
  },
  refresh: {
    secret: "refresh token from env",
    expiresIn: "7d",
  },
});

export function generateToken(
  payload: object,
  type: "access" | "refresh" = "access",
) {
  return jwtInstance.signToken(payload, {}, type);
}

export function verifyToken<T = object>(
  token: string,
  type: "access" | "refresh" = "access",
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

export function createUserTokens(payload: Partial<IUser>) {
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  return {
    accessToken,
    refreshToken,
  };
}
