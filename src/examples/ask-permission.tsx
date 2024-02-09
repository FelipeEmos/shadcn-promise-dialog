import { Button } from "@/components/ui/button";
import { createDialogPromiser } from "@/demo/dialog-promise";
import { useCallback, useState } from "react";

export function AskPermissionExample() {
  const askPermission = AskPermission.usePromise();
  const [lastResult, setLastResult] = useState<boolean>(false);

  const openDialog = useCallback(async () => {
    try {
      await askPermission();
      setLastResult(true);
    } catch (error) {
      setLastResult(false);
    }
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl">Ask Permission Example</h1>
      <div>Last Result: {lastResult ? "✅" : "❌"}</div>
      <Button onClick={openDialog}>Ask Permission</Button>
    </div>
  );
}

const AskPermission = createDialogPromiser({
  Component: ({ resolve, reject }) => {
    return (
      <div>
        <h1>Are you sure?</h1>
        <div className="flex flex-1 justify-end gap-4">
          <Button variant="secondary" onClick={reject}>
            Cancel
          </Button>
          <Button onClick={resolve}>Confirm</Button>
        </div>
      </div>
    );
  },
});
