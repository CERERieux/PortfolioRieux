import { useQuery } from "@tanstack/react-query"
import type { BoardQuery } from "../../types"

function getBoards() {
    return fetch("/cYSvQmg9kR/advanced-misc/boards").then(async (data) => {
        if (data.ok) return await data.json()
        return { error: "Error at connecting to database" }
    })
}

export default function AnonBoard() {
    const boardQuery = useQuery<BoardQuery[], Error>({
        queryKey: ["boards"],
        queryFn: getBoards,
    })

    if (boardQuery.isLoading) return <p>Loading...</p>
    if (boardQuery.error !== null) return <p>Error: {boardQuery.error.message}</p>
    if (boardQuery.data == null) return <p>There is no data in db</p>
    return (
        <div>
            <h1>AnonBoard</h1>
            {boardQuery.data.map(board => (<div key={board.id}>
                <h2>Board name: {board.id}</h2>
                <p>Thread posted: {board.thread_count}</p>
            </div>))}
        </div>
    )
}