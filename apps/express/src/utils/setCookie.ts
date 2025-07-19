import { env } from "@/configs/envConfig";
import { Response } from "express";

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (
  res: Response,
  { accessToken, refreshToken }: AuthTokens,
) => {
  const isDev = env.NODE_ENV === "development";

  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
