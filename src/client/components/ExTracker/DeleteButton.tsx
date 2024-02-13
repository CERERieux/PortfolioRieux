import { isAxiosError, type AxiosResponse } from "axios";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ResponseAction, SingleOperation } from "../../types";
import { useEffect } from "react";
import Button from "../SystemDesign/Button";

interface DeleteButtonProps {
  id: string;
  changeLocalError: React.Dispatch<React.SetStateAction<string | null>>;
  changeAction: React.Dispatch<React.SetStateAction<string | null>>;
  deleteExercise: (id: string) => void;
  deleteUserExercise: UseMutationResult<
    | AxiosResponse<ResponseAction, any>
    | {
        error: string;
      },
    Error,
    SingleOperation,
    unknown
  >;
  isDeleting: boolean;
}

export default function DeleteButton({
  id,
  changeAction,
  changeLocalError,
  deleteExercise,
  deleteUserExercise,
  isDeleting,
}: DeleteButtonProps) {
  useEffect(() => {
    console.log(deleteUserExercise);
    if (deleteUserExercise.isSuccess) {
      changeLocalError(null);
      changeAction("Your exercise was deleted successfully!");
      setTimeout(() => {
        changeAction(null);
      }, 2000);
    } else if (deleteUserExercise.isError) {
      const { error } = deleteUserExercise;
      if (isAxiosError(error)) {
        changeLocalError(error.response?.data.error);
      } else {
        changeLocalError("Something went wrong at deleting your exercise...");
      }
      setTimeout(() => {
        changeLocalError(null);
      }, 3000);
    }
  }, [deleteUserExercise.isSuccess]);
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
