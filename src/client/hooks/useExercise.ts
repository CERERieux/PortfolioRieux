import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewExercise,
  deleteExercise,
  getExercises,
} from "../services/exercises";
import type {
  DeleteExerciseHook,
  NewExerciseHook,
  resGetExercise,
} from "../types";
import { useVerification } from "./useVerification";
import { useState } from "react";

/** Custom hook where we do all the operations of exercises
 * from getting those, deleting, updating and creating it.
 * Also only can do it if we verified the token from the user.
 *
 * Returns the methods to do operations on the exercises.
 */
export function useExercise() {
  const client = useQueryClient();
  const { token, validFetch, errorAuth } = useVerification();
  const [successMutation, setSuccessMutation] = useState(false);

  /** Functions to get user exercises */
  const getUserExercises = useQuery<resGetExercise, Error>({
    queryKey: ["exercises"],
    queryFn: () => getExercises({ token }),
    enabled: validFetch,
  });
  /** Functions to create user exercises */
  const createExercise = useMutation({
    mutationFn: createNewExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["exercises"] });
      setSuccessMutation(true);
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });
  /** Functions to delete user exercises */
  const deleteUserExercise = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["exercises"] });
      setSuccessMutation(true);
    },
    onError: () => {
      setSuccessMutation(false);
    },
  });

  return {
    data: getUserExercises.data,
    errorEx: getUserExercises.error,
    createExercise: ({ description, date, status }: NewExerciseHook) => {
      createExercise.mutate({ description, date, status, token });
    },
    deleteExercise: ({ id }: DeleteExerciseHook) => {
      deleteUserExercise.mutate({ id, token });
    },
    errorAuth,
    successMutation,
  };
}
