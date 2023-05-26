import { Button, ButtonToolbar } from "rsuite";

import { useCounter } from "@/stores/counter-store";

export const Dashboard = () => {
  const count = useCounter((state) => state.count);

  return (
    <div>
      <h1>Main window</h1>
      <ButtonToolbar>
        <Button
          onClick={() => {
            window.electronAPI.openSecondWindow();
          }}
        >
          Open second window
        </Button>
        <Button
          onClick={() => {
            useCounter.getState().increment();
          }}
        >
          Count: {count}
        </Button>
      </ButtonToolbar>
    </div>
  );
};
