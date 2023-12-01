import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../services/anonboard";

export function useAnonBoard() {
  const boardInfo = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(),
  });

  return {
    data: boardInfo.data,
    error: boardInfo.error,
    isLoading: boardInfo.isLoading,
  };
}
