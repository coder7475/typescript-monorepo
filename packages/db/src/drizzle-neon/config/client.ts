import path from "path";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../schemas/index.js";

// Load env from the db package directory
config({ path: path.join(__dirname, "./../.env") });

const url = neon(process.env.DATABASE_URL!);
export const db = drizzle(url, { schema });

export type DBClientType = typeof db;
