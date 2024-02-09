import { ControlledDialogEmitter } from "./demo/controlled-dialog";
import { AskPermissionExample } from "./examples/ask-permission";
import { CountdownExample } from "./examples/countdown";
import { FormExample } from "./examples/form-answer";

const examples = [
  <AskPermissionExample />,
  <CountdownExample />,
  <FormExample />,
];

export default function App() {
  return (
    <>
      <ControlledDialogEmitter />

      <div className="m-6 flex flex-1 flex-col gap-6">
        {examples.map((example, index) => (
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-slate-200 p-8">
            {example}
          </div>
        ))}
      </div>
    </>
  );
}

function ExampleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-10 flex flex-1 flex-col gap-4 bg-gray-300 p-10">
      {children}
    </div>
  );
}
