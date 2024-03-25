import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ExerciseService from "../services/exercises";
import type {
  ExerciseDataOptions,
  NewExerciseHook,
  resGetExercise,
  updateExerciseHook,
} from "../types";
import { useVerification } from "./useVerification";
import { useEffect, useState } from "react";

/** Custom hook where we do all the operations of exercises
 * from getting those, deleting, updating and creating it.
 * Also only can do it if we verified the token from the user.
 *
 * Returns the methods to do operations on the exercises.
 */
export function useExercise() {
  const client = useQueryClient();
  const { token, validFetch, errorAuth } = useVerification();
  const [enableSearch, setEnabledSearch] = useState(true);
  const [options, setOptions] = useState<ExerciseDataOptions>({
    from: undefined,
    to: undefined,
  });

  /** Functions to create user exercises */
  const createExercise = useMutation({
    mutationFn: ExerciseService.createNewExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["exercises"], exact: true });
    },
  });
  /** Function to update an exercise with new data */
  const updateUserExercise = useMutation({
    mutationFn: ExerciseService.updateExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["exercises"], exact: true });
    },
  });
  /** Functions to delete user exercises */
  const deleteUserExercise = useMutation({
    mutationFn: ExerciseService.deleteExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["exercises"], exact: true });
    },
  });

  /** Functions to get user exercises */
  const getUserExercises = useQuery<resGetExercise, Error>({
    queryKey: ["exercises"],
    queryFn: () => ExerciseService.getExercises({ token, ...options }),
    enabled: validFetch && enableSearch,
  });

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Your Notes!";
  }, []);

  // Effect to reset the state of the search and be able to fetch data again if needed
  useEffect(() => {
    // If the fetch was successful, reset the search
    if (getUserExercises.isSuccess) {
      setEnabledSearch(false);
    }
  }, [getUserExercises.isFetching]);

  // Effect to invalidate the list so we can update it with the new data in case user filter the result
  useEffect(() => {
    client.invalidateQueries({ queryKey: ["exercises"] });
  }, [options]);

  return {
    data: getUserExercises.data,
    errorEx: getUserExercises.error,
    errorAuth,
    isCreating: createExercise.isPending,
    isDeleting: deleteUserExercise.isPending,
    isUpdating: updateUserExercise.isPending,
    createExercise,
    newExercise: ({ description, date, status }: NewExerciseHook) => {
      createExercise.mutate({ description, status, token, date });
    },
    deleteExercise: (id: string) => {
      deleteUserExercise.mutate({ id, token });
    },
    deleteUserExercise,
    updateExercise: ({ description, id, status }: updateExerciseHook) => {
      updateUserExercise.mutate({ description, id, status, token });
    },
    updateUserExercise,
    searchOptions: setOptions,
    getNewList: setEnabledSearch,
  };
}
