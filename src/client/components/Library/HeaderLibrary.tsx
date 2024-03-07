import BookOff from "../Icons/BookOff";
import PencilPlus from "../Icons/PencilPlus";
import Button from "../SystemDesign/Button";
import Dialog from "../SystemDesign/Dialog";

interface HeaderLibraryProps {
  disabled: boolean;
  idOpen: string;
  handleDeleteLibrary: () => void;
}

export default function HeaderLibrary({
  disabled,
  handleDeleteLibrary,
  idOpen,
}: HeaderLibraryProps) {
  const idCloseDelete = "closeDeleteLibraryDialog"; // Auxiliar for id of the close button for dialog
  const idDelete = "deleteAllLibrary"; // Auxliar for id of the open button for dialog
  // Component that goes at the top of the page
  return (
    <section className="w-full px-4 md:w-2/3">
      <h2 className="mx-auto mb-2 w-fit text-pretty rounded-lg bg-white px-4 pt-2 text-center font-elegant text-3xl shadow-inner shadow-black/30 first-letter:text-5xl first-letter:text-lime-400">
        Add books to your library!
      </h2>
      <div className="flex w-full items-center justify-center gap-4 font-buttonCalculator">
        <Button
          color="bg-lime-300 border-lime-500 hover:bg-lime-600 hover:border-lime-300 flex justify-center items-center gap-2"
          xSize="w-48 h-10"
          id={idOpen}
        >
          <PencilPlus size="20" />
          <span className="pt-2 font-elegant text-2xl">Add 1 Book</span>
        </Button>
        <Button
          color="bg-red-300 border-red-500 hover:bg-red-600 hover:border-red-300 flex justify-center items-center gap-2"
          xSize="w-48 h-10"
          disabled={disabled}
          id={idDelete}
        >
          <BookOff />
          <span className="pt-2 font-elegant text-2xl">Empty Library</span>
        </Button>
      </div>
      <Dialog
        colorBg="redBlack"
        idDialog="DeleteLibraryDialog"
        idClose={idCloseDelete}
        idOpen={idDelete}
      >
        <section>
          <h3>Are you sure do you want to empty your Library?</h3>
          <div className="mt-2 flex w-full items-center justify-center gap-2">
            <Button
              color="bg-amber-300 border-amber-500 hover:bg-amber-500 hover:border-amber-200"
              id={idCloseDelete}
            >
              Cancel
            </Button>
            <Button
              color="bg-red-300 border-red-500 hover:bg-red-600 hover:border-red-300"
              onClick={handleDeleteLibrary}
            >
              Delete
            </Button>
          </div>
        </section>
      </Dialog>
    </section>
  );
}
