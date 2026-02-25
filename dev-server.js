#!/usr/bin/env node

/**
 * Unified Development Server for PersonaAI
 * Runs frontend (Vite) and backend (Express) in single port for v0 preview
 * 
 * This server:
 * 1. Starts Express backend on internal port 5000
 * 2. Starts Vite frontend dev server on port 5173
 * 3. Proxies /api calls from frontend to backend
 * 4. Serves both from public port 5173
 */

const { spawn } = require("child_process");
const path = require("path");

const backendDir = path.join(__dirname, "backend");
const frontendDir = path.join(__dirname, "frontend");

console.log("🚀 PersonaAI - Unified Development Server");
console.log("==========================================\n");

// Start Backend Server (Port 5000 - internal only)
console.log("📡 Starting Backend Server (Port 5000)...");
const backend = spawn("npm", ["run", "dev"], {
  cwd: backendDir,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PORT: "5000",
  },
});

backend.on("error", (err) => {
  console.error("❌ Backend failed to start:", err.message);
  process.exit(1);
});

// Wait 4 seconds for backend to start, then start frontend
setTimeout(() => {
  console.log("\n🎨 Starting Frontend Server (Port 5173)...\n");
  
  const frontend = spawn("npm", ["run", "dev"], {
    cwd: frontendDir,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      VITE_API_URL: "http://localhost:5000/api",
    },
  });

  frontend.on("error", (err) => {
    console.error("❌ Frontend failed to start:", err.message);
    process.exit(1);
  });

  // Handle graceful shutdown
  const cleanup = () => {
    console.log("\n\n🛑 Shutting down servers...");
    backend.kill("SIGTERM");
    frontend.kill("SIGTERM");
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

}, 4000);

// Initial error handling
process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down...");
  backend.kill("SIGTERM");
  process.exit(0);
});
