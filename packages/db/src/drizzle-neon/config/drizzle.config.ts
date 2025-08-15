import { config } from "dotenv";

import "dotenv/config";

import path from "node:path";
import { defineConfig } from "drizzle-kit";

config({ path: path.join(__dirname, "./../.env") });

export default defineConfig({
  out: "./../drizzle",
  schema: "./../schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
