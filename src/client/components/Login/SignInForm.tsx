import { useState, type FormEvent, type ChangeEvent } from "react"
import type { User } from "../../types";

interface Props {
    createUser: ({ username, password }: User) => Promise<boolean>;
    setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignInForm({ createUser, setSignIn }: Props) {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resultCreate = await createUser({ username: id, password })
        if (resultCreate) {
            setId("")
            setPassword("")
            setSignIn(false)
        }
    }

    return (
        <div>
            <h2>Create a new user to have access to our services!</h2>
            <form onSubmit={handleCreateUser}>
                <label htmlFor="">
                    Username: <input type="text" value={id} onChange={handleUsername} />
                </label>
                <label htmlFor="">
                    Password: <input type="password" value={password} onChange={handlePassword} />
                </label>
                <button>Create</button>
            </form>
        </div>
    )
}