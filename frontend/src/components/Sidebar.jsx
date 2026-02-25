import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const PERSONAS = ["Teacher", "Student", "Friend", "Doctor"];
const GENDERS = ["male", "female"];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const {
    sessions,
    persona,
    gender,
    currentSession,
    setPersona,
    setGender,
    newChat,
    selectSession,
    loadHistory
  } = useChatStore();

  const handleSessionClick = async (session) => {
    selectSession(session);
    await loadHistory(session._id);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          PersonaAI
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700 bg-gray-700 bg-opacity-50">
        <p className="text-sm text-gray-300">Logged in as</p>
        <p className="font-semibold text-white truncate">{user?.name}</p>
      </div>

      {/* New Chat */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={newChat}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition"
        >
          + New Chat
        </button>
      </div>

      {/* Persona Selector */}
      <div className="p-4 border-b border-gray-700">
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">
          Persona
        </label>
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {PERSONAS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className="block text-xs font-semibold text-gray-400 mb-2 mt-3 uppercase">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-700">
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
          Chat History
        </p>
        <div className="space-y-2">
          {sessions.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No chats yet</p>
          ) : (
            sessions.map((session) => (
              <button
                key={session._id}
                onClick={() => handleSessionClick(session)}
                className={`w-full text-left px-3 py-2 rounded text-sm truncate transition ${
                  currentSession?._id === session._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <span className="font-medium">{session.persona}</span>
                <span className="text-xs text-gray-400 block truncate">
                  {session.title || "New chat"}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
