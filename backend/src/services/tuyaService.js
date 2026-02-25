const axios = require("axios");
const { sha256, hmacSha256 } = require("../utils/tuyaSign");

let cachedToken = null;
let tokenExpire = 0;

async function getTuyaToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpire) {
    return cachedToken;
  }

  const accessId = process.env.TUYA_ACCESS_ID;
  const secret = process.env.TUYA_ACCESS_SECRET;
  const baseUrl = process.env.TUYA_BASE_URL;

  const t = Date.now().toString();
  const method = "GET";
  const path = "/v1.0/token?grant_type=1";
  const bodyHash = sha256("");

  const stringToSign = `${method}\n${bodyHash}\n\n${path}`;
  const signStr = accessId + t + stringToSign;
  const sign = hmacSha256(secret, signStr);

  try {
    const res = await axios.get(baseUrl + path, {
      headers: {
        client_id: accessId,
        sign,
        t,
        sign_method: "HMAC-SHA256"
      }
    });

    if (!res.data.success) {
      throw new Error("Tuya Token Failed: " + JSON.stringify(res.data));
    }

    cachedToken = res.data.result.access_token;
    tokenExpire = Date.now() + res.data.result.expire_time * 1000;

    return cachedToken;
  } catch (err) {
    console.error("Tuya token error:", err.message);
    throw err;
  }
}

async function sendToTuyaAgent(userMessage, personaPrompt) {
  const accessId = process.env.TUYA_ACCESS_ID;
  const secret = process.env.TUYA_ACCESS_SECRET;
  const baseUrl = process.env.TUYA_BASE_URL;
  const agentId = process.env.TUYA_AGENT_ID;

  const token = await getTuyaToken();
  const method = "POST";
  const path = `/v1.0/ai/agent/${agentId}/chat`;

  const body = {
    input: userMessage,
    system_prompt: personaPrompt
  };

  const bodyStr = JSON.stringify(body);
  const bodyHash = sha256(bodyStr);

  const t = Date.now().toString();
  const stringToSign = `${method}\n${bodyHash}\n\n${path}`;
  const signStr = accessId + token + t + stringToSign;
  const sign = hmacSha256(secret, signStr);

  try {
    const res = await axios.post(baseUrl + path, body, {
      headers: {
        client_id: accessId,
        access_token: token,
        sign,
        t,
        sign_method: "HMAC-SHA256",
        "Content-Type": "application/json"
      }
    });

    if (!res.data.success) {
      throw new Error("Tuya Chat Failed: " + JSON.stringify(res.data));
    }

    return res.data.result?.output || res.data.result || "I'm thinking...";
  } catch (err) {
    console.error("Tuya chat error:", err.message);
    throw err;
  }
}

module.exports = { sendToTuyaAgent, getTuyaToken };
