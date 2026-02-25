import { create } from "zustand";
import api from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, token: res.data.token, loading: false });
      return res.data;
    } catch (err) {
      const error = err.response?.data?.message || "Login failed";
      set({ error, loading: false });
      throw err;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/register", { name, email, password });
      set({ loading: false });
      return res.data;
    } catch (err) {
      const error = err.response?.data?.message || "Register failed";
      set({ error, loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));
