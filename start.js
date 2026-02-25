#!/usr/bin/env node

/**
 * Unified Start Script for PersonaAI
 * Runs backend and frontend concurrently without external dependencies
 */

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const backendDir = path.join(__dirname, "backend");
const frontendDir = path.join(__dirname, "frontend");

console.log("🚀 Starting PersonaAI Application...\n");

// Start Backend
console.log("📡 Starting Backend Server...");
const backend = spawn("npm", ["run", "dev"], {
  cwd: backendDir,
  stdio: "inherit",
  shell: true,
});

backend.on("error", (err) => {
  console.error("❌ Backend error:", err);
  process.exit(1);
});

// Give backend time to start, then start frontend
setTimeout(() => {
  console.log("\n🎨 Starting Frontend Server...");
  const frontend = spawn("npm", ["run", "dev"], {
    cwd: frontendDir,
    stdio: "inherit",
    shell: true,
  });

  frontend.on("error", (err) => {
    console.error("❌ Frontend error:", err);
    process.exit(1);
  });

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n\n🛑 Shutting down...");
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}, 3000);

// Graceful shutdown for backend
process.on("SIGINT", () => {
  console.log("\n\n🛑 Shutting down...");
  backend.kill();
  process.exit(0);
});
