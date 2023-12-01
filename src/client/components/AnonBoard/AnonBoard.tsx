import { Link } from "react-router-dom"
import { useAnonBoard } from "../../hooks/useAnonBoard"
import { isAxiosError } from "axios"


export default function AnonBoard() {
    const { data, error, isLoading } = useAnonBoard()

    return (
        <div>
            <h1>AnonBoard</h1>
            {isLoading && <p>Loading...</p>}
            {error !== null && isAxiosError(error) && <p>Error: {error.response?.data.error}</p>}
            {data !== undefined ?
                !("error" in data) ?
                    data.map(board => (
                        <Link to={`/anon-board/thread/${board.id}`} key={board.id}>
                            <section>
                                <h2>Board name: {board.id}</h2>
                                <p>Thread posted: {board.thread_count}</p>
                            </section>
                        </Link>
                    ))
                    : <h2>{data.error}</h2>
                : !isLoading && <h2>There is an error with the aplication, try again later.</h2>}
        </div>
    )
}