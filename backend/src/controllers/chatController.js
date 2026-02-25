const ChatSession = require("../models/ChatSession");
const Message = require("../models/Message");
const { sendToTuyaAgent } = require("../services/tuyaService");

function buildPersonaPrompt(persona, gender) {
  const base = `You are PersonaAI. You are a helpful, friendly AI assistant. Gender: ${gender}. Persona: ${persona}.`;

  if (persona === "Teacher") {
    return base + `
You are a professional and patient teacher who explains concepts clearly and simply.
If user says they don't understand, explain it differently.
Encourage them to learn and ask questions.
Be supportive and positive.`;
  }

  if (persona === "Student") {
    return base + `
You are a curious and enthusiastic student who learns by asking questions.
Act like a junior learner who wants to understand concepts.
Ask doubts when confused.
Be humble and encourage the user to teach you.`;
  }

  if (persona === "Friend") {
    return base + `
You are a friendly, casual, and supportive buddy like a TryHackMe assistant.
Be funny, caring, and motivating.
Use casual language and emojis occasionally.
Give encouragement and small challenges.
Be there to support and motivate.`;
  }

  if (persona === "Doctor") {
    return base + `
You are a calm, professional health advisor.
Listen carefully to health concerns.
Ask clarifying questions before responding.
Always remind users to consult a real doctor for serious issues.
Be empathetic and take emergency symptoms seriously.
Never diagnose with certainty, use phrases like "This could be..." or "Possible causes include..."`;
  }

  return base;
}

const sendMessage = async (req, res) => {
  try {
    const { message, persona, gender, sessionId } = req.body;
    const userId = req.user.id;

    if (!message || !persona) {
      return res.status(400).json({ message: "Message and persona required" });
    }

    let session = null;

    if (sessionId) {
      session = await ChatSession.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
    }

    if (!session) {
      session = await ChatSession.create({
        userId,
        persona,
        gender: gender || "female",
        title: message.substring(0, 50)
      });
    }

    // Save user message
    await Message.create({
      sessionId: session._id,
      sender: "user",
      message
    });

    // Get persona prompt
    const personaPrompt = buildPersonaPrompt(persona, gender || "female");

    // Send to Tuya AI
    let aiReply;
    try {
      aiReply = await sendToTuyaAgent(message, personaPrompt);
    } catch (err) {
      console.error("Tuya error:", err.message);
      aiReply = "Sorry, I'm having trouble responding right now. Please check your Tuya credentials in the .env file.";
    }

    // Save AI response
    await Message.create({
      sessionId: session._id,
      sender: "ai",
      message: aiReply,
      emotion: "neutral",
      gesture: "idle"
    });

    return res.json({
      sessionId: session._id,
      reply: aiReply,
      persona: session.persona,
      gender: session.gender
    });
  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user.id }).sort({
      createdAt: -1
    });
    return res.json(sessions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await ChatSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const messages = await Message.find({ sessionId }).sort({ createdAt: 1 });
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getSessions, getHistory };
