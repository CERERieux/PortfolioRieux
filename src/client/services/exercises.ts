import axios from "axios";
import type {
  SingleOperation,
  ExerciseData,
  NewExercise,
  resGetExercise,
  ResponseAction,
  updateExerciseService,
  ResultUpdate,
} from "../types";
import { type IExTracker } from "../../server/types/basic";
// Here belongs all the fetches needed to do operations with exercises in db

export function getExercises({ token, from, to }: ExerciseData) {
  return axios<resGetExercise>({
    url: "/cYSvQmg9kR/basic/users/exercises",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
    params: { from, to },
  }).then(({ data }) => {
    return data;
  });
}

export function createNewExercise({
  description,
  status,
  date,
  token,
}: NewExercise) {
  return axios<IExTracker>({
    url: "/cYSvQmg9kR/basic/users/exercises",
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
    data: { description, status, date },
  }).catch(err => {
    console.error(err);
    return { error: err.response.data.error as string };
  });
}

export function updateExercise({
  id,
  token,
  status,
  description,
}: updateExerciseService) {
  return axios<ResultUpdate>({
    url: `/cYSvQmg9kR/basic/users/exercises/${id}`,
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: { status, description },
  }).catch(err => {
    console.error(err);
    return { error: err.response.data.error as string };
  });
}

export function deleteExercise({ id, token }: SingleOperation) {
  return axios<ResponseAction>({
    url: `/cYSvQmg9kR/basic/users/exercises/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(err => {
    console.error(err);
    return { error: err.response.data.error as string };
  });
}
