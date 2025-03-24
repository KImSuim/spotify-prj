import { create } from "zustand";

const STORAGE_KEY = "recent_search_keywords";

interface HeaderState {
  search: string;
  recentKeywords: string[];
  showDropdown: boolean;
  setSearch: (search: string) => void;
  setShowDropdown: (show: boolean) => void;
  handleSearch: (keyword: string) => void;
  saveRecentKeyword: (keyword: string) => void;
  loadRecentKeywords: () => void;
}

export const useHeaderStore = create<HeaderState>((set, get) => ({
  search: "",
  recentKeywords: [],
  showDropdown: false,
  setSearch: (search) => set({ search }),
  setShowDropdown: (show) => set({ showDropdown: show }),
  handleSearch: (keyword) => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return;
    get().saveRecentKeyword(normalized);
    set({ search: "", showDropdown: false });
  },
  saveRecentKeyword: (keyword) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = existing.filter((item: string) => item !== keyword);
    const updated = [keyword, ...filtered].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ recentKeywords: updated });
  },
  loadRecentKeywords: () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    set({ recentKeywords: stored });
  },
}));
