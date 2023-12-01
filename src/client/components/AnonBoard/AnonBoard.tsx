import { Link, useNavigate } from "react-router-dom"
import { useAnonBoard, useCreateBoard } from "../../hooks/useAnonBoard"
import { isAxiosError } from "axios"
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react"


export default function AnonBoard() {
    const navigate = useNavigate()
    const [isCreating, setIsCreating] = useState(false)
    const [board, setBoard] = useState("")
    const [localError, setLocalError] = useState<null | string>(null)
    const [action, setAction] = useState<null | string>(null)
    const { data, error, isLoading } = useAnonBoard()
    const { removedThread, createBoard, createError } = useCreateBoard()

    useEffect(() => {
        if (removedThread) {
            setLocalError(null)
            setIsCreating(false)
            setAction(`Board Created, redirecting you to ${board}`)
            setTimeout(() => { setAction(null) }, 3000)
            setTimeout(() => { navigate(`/anon-board/${board}/thread`) }, 3000)
        }
        else if (board !== "") {
            setIsCreating(false)
            setLocalError("There was an error to create your board...")
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [removedThread])

    useEffect(() => {
        if (createError !== null) {
            setLocalError(createError)
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [createError])

    const handleBoard = (e: ChangeEvent<HTMLInputElement>) => {
        setBoard(e.target.value)
    }
    const handleAddBoard = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createBoard(board)
    }
    const handleLocalErrorSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLocalError("Please fill the board field before creating")
    }

    return (
        <div>
            <h1>AnonBoard</h1>
            {isLoading && <p>Loading...</p>}
            {error !== null && isAxiosError(error) && <h2>Error: {error.response?.data.error}</h2>}
            {localError !== null && <h2>{localError}</h2>}
            {action !== null && <h2>{action}</h2>}
            {isCreating ?
                <>
                    <form onSubmit={board !== "" ? handleAddBoard : handleLocalErrorSubmit}>
                        <label htmlFor="">
                            Board Name: <input type="text" value={board} onChange={handleBoard} />
                        </label>
                        <button>Create</button>
                    </form>
                    <button onClick={() => {
                        setIsCreating(false)
                        setLocalError(null)
                    }}>Cancel</button>
                </>
                : <button onClick={() => { setIsCreating(true) }} disabled={isLoading || action !== null}>Add a new board</button>}
            {data !== undefined &&
                <>{
                    !("error" in data) ?
                        data.map(board => (
                            <Link to={`/anon-board/${board.id}/thread`} key={board.id}>
                                <section>
                                    <h2>Board name: {board.id}</h2>
                                    <p>Thread posted: {board.thread_count}</p>
                                </section>
                            </Link>
                        ))
                        : <h2>{data.error}</h2>
                }</>
            }
        </div>
    )
}