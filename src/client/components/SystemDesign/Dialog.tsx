import { useEffect } from "react";

// Colors for the backdrop of the modal
const COLOR_BACK = {
  greenWhite: "backdrop:from-white/50 backdrop:to-lime-900/50",
  greenBlack: "backdrop:from-black/50 backdrop:to-lime-200/50",
  skyWhite: "backdrop:from-white/50 backdrop:to-sky-900/50",
  skyBlack: "backdrop:from-black/50 backdrop:to-sky-200/50",
  amberWhite: "backdrop:from-white/50 backdrop:to-amber-900/50",
  amberBlack: "backdrop:from-black/50 backdrop:to-amber-200/50",
  redWhite: "backdrop:from-white/50 backdrop:to-red-900/50",
  redBlack: "backdrop:from-black/50 backdrop:to-red-300/50",
};

interface DialogProps {
  children: React.ReactNode;
  idDialog: string;
  idOpen: string;
  idClose: string;
  extraStyles?: string;
  colorBg: keyof typeof COLOR_BACK;
}

/** Function that open a dialog element */
const handleOpenModal = (dialog: HTMLDialogElement) => {
  dialog.showModal();
};
/** Function that close a dialog element with a button */
const handleCloseModalBtn = (dialog: HTMLDialogElement) => {
  dialog.close();
};
/** Function that close a dialog element with a click outside the modal space */
const handleCloseModalOutside = (dialog: HTMLDialogElement, e: MouseEvent) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
};

export default function Dialog({
  children,
  idDialog,
  idOpen,
  idClose,
  extraStyles,
  colorBg,
}: DialogProps) {
  /** Effect that activates at the start to handle the dialog element */
  useEffect(() => {
    // Get the dialog, and the 2 buttons to open/close it
    const dialog = document.getElementById(idDialog) as HTMLDialogElement;
    const openButton = document.getElementById(idOpen) as HTMLButtonElement;
    const closeButton = document.getElementById(idClose) as HTMLButtonElement;
    // If the dialog exist
    if (dialog != null) {
      // Add a listener to those 3 elements to do actions
      openButton.addEventListener("click", () => {
        handleOpenModal(dialog);
      });
      closeButton.addEventListener("click", () => {
        handleCloseModalBtn(dialog);
      });
      dialog.addEventListener("click", e => {
        handleCloseModalOutside(dialog, e);
      });
      // And when unmount, remove the listener
      return () => {
        openButton.removeEventListener("click", () => {
          handleOpenModal(dialog);
        });
        closeButton.removeEventListener("click", () => {
          handleCloseModalBtn(dialog);
        });
        dialog.removeEventListener("click", e => {
          handleCloseModalOutside(dialog, e);
        });
      };
    }
  }, []);
  // Return the dialog element
  return (
    <dialog
      id={idDialog}
      className={`rounded-xl px-6 py-4 shadow-lg shadow-black/40 backdrop:bg-gradient-to-b ${COLOR_BACK[colorBg]} focus:flex ${extraStyles}`}
    >
      {children}
    </dialog>
  );
}
