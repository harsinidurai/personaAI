import { create } from "zustand";
import api from "../services/api";

export const useChatStore = create((set, get) => ({
  sessions: [],
  messages: [],
  currentSession: null,
  persona: "Teacher",
  gender: "female",
  loading: false,
  error: null,

  setPersona: (persona) => set({ persona }),
  setGender: (gender) => set({ gender }),

  setSessions: (sessions) => set({ sessions }),

  sendMessage: async (text) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/chat/send", {
        message: text,
        persona: get().persona,
        gender: get().gender,
        sessionId: get().currentSession?._id
      });

      set((state) => {
        const updated = {
          messages: [
            ...state.messages,
            { sender: "user", message: text },
            { sender: "ai", message: res.data.reply }
          ],
          currentSession: res.data,
          loading: false
        };
        return updated;
      });

      return res.data;
    } catch (err) {
      const error = err.response?.data?.message || "Failed to send message";
      set({ error, loading: false });
      throw err;
    }
  },

  loadSessions: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/chat/sessions");
      set({ sessions: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  loadHistory: async (sessionId) => {
    set({ loading: true });
    try {
      const res = await api.get(`/chat/history/${sessionId}`);
      set({ messages: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  newChat: () => {
    set({ messages: [], currentSession: null });
  },

  selectSession: (session) => {
    set({ currentSession: session, persona: session.persona, gender: session.gender });
  }
}));
