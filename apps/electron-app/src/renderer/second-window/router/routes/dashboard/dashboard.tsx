import { Button } from "rsuite";

import { useCounter } from "@/stores/counter-store";

export const Dashboard = () => {
  const count = useCounter((state) => state.count);

  return (
    <div>
      <h1>Second window</h1>
      <Button
        onClick={() => {
          useCounter.getState().increment();
        }}
      >
        Count: {count}
      </Button>
    </div>
  );
};
