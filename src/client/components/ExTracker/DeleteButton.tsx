import Button from "../SystemDesign/Button";

interface DeleteButtonProps {
  id: string;
  isDeleting: boolean;
  deleteExercise: (id: string) => void;
}

export default function DeleteButton({
  id,
  deleteExercise,
  isDeleting,
}: DeleteButtonProps) {
  const handleDelete = (id: string) => {
    deleteExercise(id);
  };
  return (
    <Button
      onClick={() => {
        handleDelete(id);
      }}
      disabled={isDeleting}
      color="bg-red-300 hover:bg-red-800"
      xSize="w-20"
    >
      Delete
    </Button>
  );
}
