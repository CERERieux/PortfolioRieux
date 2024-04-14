import axios from "axios";
import type { SudokuBody } from "../../server/types/advanced";

interface CheckResult {
  valid: boolean;
  conflict?: string[];
}

interface SolveResult {
  solution: string;
}

export function getInitialSudoku(puzzleNumber: number) {
  return axios<string>({
    url: `/${
      import.meta.env.VITE_ROUTE_API
    }/advanced/sudoku/puzzle?index=${puzzleNumber}`,
    method: "get",
  }).then(({ data }) => data);
}

export function checkSudoku({ coordinate, puzzle, value }: SudokuBody) {
  return axios<CheckResult>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/sudoku/check`,
    method: "post",
    data: {
      coordinate,
      puzzle,
      value,
    },
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
}

export function solveSudoku(puzzle: string) {
  return axios<SolveResult>({
    url: `/${import.meta.env.VITE_ROUTE_API}/advanced/sudoku/solve`,
    method: "post",
    data: {
      puzzle,
    },
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error as string };
    });
}
