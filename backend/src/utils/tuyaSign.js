const crypto = require("crypto");

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

function hmacSha256(secret, str) {
  return crypto.createHmac("sha256", secret).update(str).digest("hex").toUpperCase();
}

module.exports = { sha256, hmacSha256 };
