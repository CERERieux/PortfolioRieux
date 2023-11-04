import { useQuery } from "@tanstack/react-query";

export default function ExerciseTracker() {
    const getExercise = useQuery({
        queryKey: [""]
    })
}