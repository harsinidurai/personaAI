import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { messages, loading, sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const message = input;
    setInput("");

    try {
      await sendMessage(message);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 border-r border-gray-700">
      {/* Chat Header */}
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-6">
        <h2 className="text-xl font-bold text-white">Chat</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-400 text-lg">No messages yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Start a conversation with your selected persona
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              sender={msg.sender}
              message={msg.message}
            />
          ))
        )}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="inline-flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="h-24 bg-gray-800 border-t border-gray-700 p-4 flex items-center">
        <form onSubmit={handleSend} className="w-full flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
