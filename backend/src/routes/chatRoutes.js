const express = require("express");
const protect = require("../middleware/authMiddleware");
const { sendMessage, getSessions, getHistory } = require("../controllers/chatController");

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/sessions", protect, getSessions);
router.get("/history/:sessionId", protect, getHistory);

module.exports = router;
