import { Store, StoreOptions } from "./store";

import { COUNTER_STORE_NAME } from "~/common/store-names";

class CounterStore extends Store<{
  count: number;
}> {
  constructor(options?: Pick<StoreOptions, "listeners">) {
    super(
      {
        count: 0,
      },
      {
        name: COUNTER_STORE_NAME,
        ...options,
      }
    );
  }
}

export const counterStore = new CounterStore();
