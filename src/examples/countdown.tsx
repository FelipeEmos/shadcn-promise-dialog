import { Button } from "@/components/ui/button";
import { createDialogPromiser } from "@/demo/dialog-promise";
import { useCallback, useEffect, useState } from "react";

export function CountdownExample() {
  const countdownConfirm = CountdownConfirmation.usePromise();
  const [lastResult, setLastResult] = useState<boolean>(false);

  const openDialog = useCallback(async () => {
    try {
      await countdownConfirm();
      setLastResult(true);
    } catch (error) {
      setLastResult(false);
    }
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl">Countdown Example</h1>
      <div>Last Result: {lastResult ? "✅" : "❌"}</div>
      <Button onClick={openDialog}>Countdown Confirmation</Button>
    </div>
  );
}

const CountdownConfirmation = createDialogPromiser({
  Component: ({ resolve, reject }) => {
    const [count, setCount] = useState(5);

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (count <= 0) {
        reject();
      }
    }, [count, reject]);

    return (
      <div>
        <h1>Confirm in {count} seconds...</h1>
        <div className="flex flex-1 justify-end gap-4">
          <Button variant="secondary" onClick={reject}>
            Cancel
          </Button>
          <Button variant="default" onClick={resolve}>
            Confirm
          </Button>
        </div>
      </div>
    );
  },
});
