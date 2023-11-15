import axios from "axios";
import type {
  DeleteExercise,
  ExerciseData,
  NewExercise,
  resGetExercise,
} from "../types";
import { type IExTracker } from "../../server/types/basic";

// export async function getExercises({ token, from, to, limit }: ExerciseData) {
//   const exercises = await axios<resGetExercise>({
//     url: "/cYSvQmg9kR/basic/users/exercises",
//     method: "get",
//     headers: { Authorization: `Bearer ${token}` },
//     params: {
//       from,
//       to,
//       limit,
//     },
//   })
//     .then(({ data }) => {
//       return data;
//     })
//     .catch(err => {
//       console.error(err);
//       return { error: err.response.data.error as string };
//     });
//   console.log(exercises);
//   return exercises;
// }

export function getExercises({ token, from, to, limit }: ExerciseData) {
  return axios<resGetExercise>({
    url: "/cYSvQmg9kR/basic/users/exercises",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
    params: {
      from,
      to,
      limit,
    },
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
    data: {
      description,
      status,
      date,
    },
  });
}

export function deleteExercise({ id, token }: DeleteExercise) {
  return axios({
    url: `/cYSvQmg9kR/basic/users/exercises/${id}`,
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
}
