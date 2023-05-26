import { Store, StoreOptions } from "./store";

class CounterStore extends Store<{
  count: number;
}> {
  constructor(options?: Pick<StoreOptions, "listeners">) {
    super(
      {
        count: 0,
      },
      {
        name: "counter",
        ...options,
      }
    );
  }
}

export const counterStore = new CounterStore();
