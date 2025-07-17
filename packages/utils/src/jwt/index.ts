import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { JWTConfig, Payload, TokenType } from "./types";

export class JWT {
  private accessConfig: JWTConfig;
  private refreshConfig: JWTConfig;

  constructor({ access, refresh }: { access: JWTConfig; refresh: JWTConfig }) {
    this.accessConfig = access;
    this.refreshConfig = refresh;
  }

  signToken(
    payload: Payload,
    options: SignOptions = {},
    type: TokenType = "access",
  ): string {
    const config = type === "access" ? this.accessConfig : this.refreshConfig;
    return jwt.sign(payload, config.secret, {
      ...options,
      ...(config.expiresIn !== undefined
        ? { expiresIn: config.expiresIn }
        : {}),
    });
  }

  verifyToken<T = JwtPayload>(token: string, type: TokenType = "access"): T {
    const config = type === "access" ? this.accessConfig : this.refreshConfig;
    return jwt.verify(token, config.secret) as T;
  }

  decodeToken<T = JwtPayload>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}

// Example Usage
// const jwtInstance = new JWT({
//   access: {
//     secret: "secret",
//     expiresIn: "15m",
//   },
//   refresh: {
//     secret: "secret",
//     expiresIn: "7d",
//   },
// });

// Signing
// const token = jwtInstance.signToken({ userId: "abc123" });

// console.log(token);
// Verifying
// const payload = jwtInstance.verifyToken(token);
// console.log(payload);
// Decoding (no verification)
// const decoded = jwtInstance.decodeToken(token);
// console.log(decoded);
