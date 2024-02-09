import { useCallback } from "react";
import { create } from "zustand";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogControllerStore {
  isOpen: boolean;
  content: JSX.Element | null;

  openDialog: (content: JSX.Element) => void;
  closeDialog: () => void;

  onCloseListeners: (() => void)[];
  addOnCloseListener: (listener: () => void) => void;
  removeOnCloseListener: (listener: () => void) => void;
}

export const useDialogControllerStore = create<DialogControllerStore>()(
  (set) => ({
    isOpen: false,
    content: null,

    openDialog: (content) => set({ isOpen: true, content }),
    closeDialog: () =>
      set({
        isOpen: false,
        // NOTE: the `closeDialog` could be setting content to "null",
        // but then the close animation messes up a little bit.
        // The content disapperas before the animation finishes.
        //
        // content: null
      }),

    onCloseListeners: [],
    addOnCloseListener: (listener) =>
      set((state) => ({
        onCloseListeners: [...state.onCloseListeners, listener],
      })),
    removeOnCloseListener: (listener) =>
      set((state) => ({
        onCloseListeners: state.onCloseListeners.filter((l) => l !== listener),
      })),
  })
);

export function ControlledDialogEmitter() {
  const { isOpen, closeDialog, content, onCloseListeners } =
    useDialogControllerStore();

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        onCloseListeners.forEach((listener) => {
          listener();
        });
        closeDialog();
      }
    },
    [closeDialog, onCloseListeners]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
