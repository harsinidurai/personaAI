import React from "react";

export default function MessageBubble({ sender, message }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="break-words text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
