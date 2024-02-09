import { useDialogControllerStore } from "./controlled-dialog";
export type ResolveCallback<TResult> = TResult extends void
  ? () => void
  : (result: TResult) => void;
export type RejectCallback = () => void;

export interface PromiseComponentProps<
  TResult,
  TArgs extends Record<string, unknown> | undefined = undefined
> {
  resolve: ResolveCallback<TResult>;
  reject: RejectCallback;
  args: TArgs;
}

export function createDialogPromiser<
  TResult extends unknown = void,
  TArgs extends Record<string, unknown> | undefined = undefined
>({
  Component,
}: {
  Component: (props: PromiseComponentProps<TResult, TArgs>) => JSX.Element;
}) {
  const usePromise = () => {
    const {
      openDialog,
      closeDialog,
      addOnCloseListener,
      removeOnCloseListener,
    } = useDialogControllerStore();

    return (args: TArgs) => {
      return new Promise<TResult>((resolvePromise, rejectPromise) => {
        const reject = () => {
          removeOnCloseListener(reject);
          rejectPromise();
          closeDialog();
        };

        const resolve = (result: TResult) => {
          removeOnCloseListener(reject);
          resolvePromise(result);
          closeDialog();
        };

        addOnCloseListener(reject);
        openDialog(
          <Component
            args={args}
            resolve={resolve as ResolveCallback<TResult>}
            reject={reject}
          />
        );
      });
    };
  };

  type UsePromiseType = TArgs extends undefined
    ? () => () => Promise<TResult>
    : () => (args: TArgs) => Promise<TResult>;

  return { usePromise: usePromise as UsePromiseType };
}
