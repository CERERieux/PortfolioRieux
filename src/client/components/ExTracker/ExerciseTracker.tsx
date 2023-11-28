import { type FormEvent, useState, type ChangeEvent, useEffect } from "react";
import type { StatusEx } from "../../types";
import { isAxiosError } from "axios";
import { useExercise } from "../../hooks/useExercise";
import { Link } from "react-router-dom";

export default function ExerciseTracker() {
    const { data, errorEx, errorAuth, createExercise, deleteExercise, token, updateExercise } = useExercise()
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<StatusEx>("Pending")
    const [date, setDate] = useState(new Date(Date.now()))
    const [localError, setLocalError] = useState<string | null>(null)
    const [action, setAction] = useState<string | null>(null)
    const [isUpdate, setIsUpdate] = useState({ id: "", isUpdate: false })
    const [descriptionUpdate, setDescriptionUpdate] = useState("")
    const [statusUpdate, setStatusUpdate] = useState<StatusEx>("Pending")

    useEffect(() => {
        if (createExercise.isSuccess) {
            setDescription("")
            setStatus("Pending")
            setDate(new Date(Date.now()))
            setLocalError(null)
            setAction("Your new exercise was created!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (createExercise.isError) {
            const { error } = createExercise
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at creating your exercise...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [createExercise.isSuccess])

    useEffect(() => {
        if (deleteExercise.isSuccess) {
            setLocalError(null)
            setAction("Your exercise was deleted successfully!")
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (deleteExercise.isError) {
            const { error } = deleteExercise
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at deleting your exercise...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [deleteExercise.isSuccess])

    useEffect(() => {
        if (updateExercise.isSuccess) {
            setIsUpdate({ id: "", isUpdate: false })
            setLocalError(null)
            setAction("Your exercise was updated!")
            setTimeout(() => { setAction(null) }, 2000)
            setDescriptionUpdate("")
            setStatusUpdate("Pending")
        }
        else if (updateExercise.isError) {
            const { error } = updateExercise
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wront at updating your exercise...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [updateExercise.isSuccess])

    const handleNewExercise = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (description !== "") {
            createExercise.mutate({ description, date, status, token })
        }
        else
            setLocalError("Please fill the description of your exercise")
    }
    const handleDelete = (id: string) => {
        deleteExercise.mutate({ id, token })
    }
    const handleUpdateEx = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (descriptionUpdate !== "")
            updateExercise.mutate({ id: isUpdate.id, token, status: statusUpdate, description: descriptionUpdate })
        else
            setLocalError("Don't leave empty the Description field")
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
    const handleDescriptionUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setDescriptionUpdate(e.target.value)
    }
    const handleStatusUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatusUpdate(e.target.value as StatusEx)
    }

    return (
        <div>
            <Link to="/my-profile"><button>Return to My Profile</button></Link>
            <div>
                {localError !== null && <h2>{localError}</h2>}
                {errorAuth.cause !== null && <h1>Error: You are not logged in to use this service </h1>}
                {errorEx !== null && isAxiosError(errorEx) && <h1>Error: {errorEx.response?.data.error}</h1>}
                {action !== null && <h2>{action}</h2>}
            </div>
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
                    <button disabled={createExercise.isPending}>Create Exercise</button>
                </form>
            </aside>
            {data !== undefined ?
                <div>
                    <h2>{data.username}</h2>
                    <h3>Number of exercises: {data.count}</h3>
                    <ul>{data.log.map(ex => {
                        const date = new Date(ex.date).toDateString()
                        const id = ex._id.toString()
                        return <li key={id}>
                            {!(isUpdate.isUpdate && id === isUpdate.id) ?
                                <div>
                                    <p>Description: {ex.description}</p>
                                    <p>Status: {ex.status}</p>
                                    <p>Date of creation: {date}</p>
                                    <button onClick={() => { handleDelete(id) }}
                                        disabled={deleteExercise.isPending}>Delete</button>
                                    <button onClick={() => {
                                        setIsUpdate({ id, isUpdate: true })
                                        setDescriptionUpdate(ex.description)
                                        setStatusUpdate(ex.status as StatusEx)
                                    }}>Update</button>
                                </div>
                                :
                                <div>
                                    <form onSubmit={handleUpdateEx}>
                                        <label htmlFor="">
                                            Description: <input type="text" value={descriptionUpdate}
                                                onChange={handleDescriptionUpdate} />
                                        </label>
                                        <label htmlFor="">
                                            Status: <select name="" id="" value={statusUpdate}
                                                onChange={handleStatusUpdate}>
                                                <option value="Pending">Pending</option>
                                                <option value="Current">Current</option>
                                                <option value="Completed">Completed</option></select>
                                        </label>
                                        <button disabled={updateExercise.isPending}>Make update</button>
                                    </form>
                                    <button onClick={() => {
                                        setIsUpdate({ id: "", isUpdate: false })
                                    }}>Cancel</button>
                                </div>
                            }

                        </li>
                    })}</ul>

                </div>
                : <p>Loading...</p>}
        </div>

    )
}