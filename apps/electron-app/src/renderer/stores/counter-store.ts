import { create } from "zustand";

import { COUNTER_STORE_NAME } from "../../common/store-names";

export const useCounter = create<{
  count: number;
  increment: () => void;
}>((set, get) => {
  window.electronAPI.onStoreChange(COUNTER_STORE_NAME, set);
  window.electronAPI.getStore(COUNTER_STORE_NAME);

  return {
    count: 0,
    increment: () => {
      const newCount = get().count + 1;

      window.electronAPI.updateStore(COUNTER_STORE_NAME, { count: newCount });
    },
  };
});
