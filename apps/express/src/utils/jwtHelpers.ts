import { JWT } from "@repo/utils";

const jwtInstance = new JWT({
  access: {
    secret: "access token from env",
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
