import { type FormEvent, useState, type ChangeEvent } from "react";
import type { StatusEx } from "../../types";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";

export default function ExerciseTracker() {
    const { data, errorEx, errorAuth, createExercise, deleteExercise, successMutation } = useExercise()
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<StatusEx>("Pending")
    const [date, setDate] = useState(new Date(Date.now()))
    const [localError, setLocalError] = useState<string | null>(null)

    const handleNewExercise = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (description !== "") {
            createExercise({ description, date, status })
            if (successMutation) {
                setDescription("")
                setStatus("Pending")
                setDate(new Date(Date.now()))
                setLocalError(null)
            }
        }
        else
            setLocalError("Please fill the description of your exercise")
    }
    const handleDelete = (id: string) => {
        deleteExercise({ id })
    }
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as StatusEx)
    }
    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value)
        setDate(newDate)
    }

    return (
        <div>
            <div>
                {localError !== null && <h2>{localError}</h2>}
                {errorAuth.cause !== null && <h1>Error: You are not logged in to use this service </h1>}
                {errorEx !== null && isAxiosError(errorEx) && <h1>Error: {errorEx.response?.data.error}</h1>}
            </div>
            {data !== undefined ?
                <div>
                    <h2>{data.username}</h2>
                    <h3>Number of exercises: {data.count}</h3>
                    <ul>{data.log.map(ex => {
                        const date = new Date(ex.date).toDateString()
                        const id = ex._id.toString()
                        return <li key={id}>
                            <div>
                                <p>Description: {ex.description}</p>
                                <p>Status: {ex.status}</p>
                                <p>Date of creation: {date}</p>
                                <button onClick={() => { handleDelete(id) }}>Delete</button>
                            </div>
                        </li>
                    })}</ul>
                    <aside>
                        <form onSubmit={handleNewExercise}>
                            <label htmlFor="">
                                Description: <input type="text" name="description" id="description"
                                    value={description} onChange={handleDescription} />
                            </label>
                            <label htmlFor="">
                                Status: <select name="status" id="status" onChange={handleStatus} value={status} >
                                    <option value="Pending">Pending</option>
                                    <option value="Current">Current</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                            <label htmlFor="">
                                Date: <input type="date" name="" id="" onChange={handleDate} />
                            </label>
                            <button>Create Exercise</button>
                        </form>
                    </aside>
                </div>
                : <p>Loading...</p>}
        </div>

    )
}