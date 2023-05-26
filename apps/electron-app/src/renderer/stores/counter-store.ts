import { create } from "zustand";

export const useCounter = create<{
  count: number;
  increment: () => void;
}>((set, get) => {
  window.electronAPI.onStoreChange("counter", set);
  window.electronAPI.getStore("counter");

  return {
    count: 0,
    increment: () => {
      const newCount = get().count + 1;

      window.electronAPI.updateStore("counter", { count: newCount });
    },
  };
});
