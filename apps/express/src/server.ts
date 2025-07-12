import type { Server } from "node:http";

import app from "@/app";
import { env } from "@/configs/envConfig";

const server: Server = app.listen(env.PORT, () => {
	console.log(`🚀 Server (${env.NODE_ENV}) running at http://${env.HOST}:${env.PORT}`);
});

// Flag to prevent multiple shutdowns
let isShuttingDown = false;

const shutdown = (reason: string, error?: unknown, exitCode = 1) => {
	if (isShuttingDown) return;
	isShuttingDown = true;

	console.log(reason);
	if (error) console.error(error);

	server.close(() => {
		console.log("✅ Server closed gracefully");
		process.exit(exitCode);
	});

	// Force shutdown after 10 seconds
	setTimeout(() => {
		console.error("❌ Forcefully exiting after timeout");
		process.exit(exitCode);
	}, 10000).unref();
};

// Termination signals (graceful shutdown, exit code 0)
process.on("SIGINT", () => shutdown("🛑 SIGINT received, shutting down gracefully...", undefined, 0));
process.on("SIGTERM", () => shutdown("🛑 SIGTERM received, shutting down gracefully...", undefined, 0));

// Unhandled promise rejection
process.on("unhandledRejection", (error) =>
	shutdown("💥 Unhandled Rejection detected, shutting down the server...", error),
);

// Uncaught exception
process.on("uncaughtException", (error) =>
	shutdown("💥 Uncaught Exception detected, shutting down the server...", error),
);
