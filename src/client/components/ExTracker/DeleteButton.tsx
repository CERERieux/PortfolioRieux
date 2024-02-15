import TrashCan from "../Icons/TrashCan";
import ActionButton from "../SystemDesign/ActionButton";

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
  const handleDelete = () => {
    deleteExercise(id);
  };
  return (
    <ActionButton
      onClick={handleDelete}
      disabled={isDeleting}
      coverColor="bg-slate-200 shadow-slate-100"
      hoverColor="hover:bg-red-100 hover:shadow-red-400/30 hover:text-red-500"
      groupName={["group/delete", "group-hover/delete:block"]}
      position="top-0 right-8"
      tooltipText="Delete"
      tooltipPos="-bottom-5 -left-0"
    >
      <TrashCan size="24" />
    </ActionButton>
  );
}
