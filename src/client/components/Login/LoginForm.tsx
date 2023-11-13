import { useState, type FormEvent, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
interface Props {
    loginUser: ({ username, password }: User) => Promise<boolean>;
}

export default function LogInForm({ loginUser }: Props) {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resultLogin = await loginUser({ username: id, password })
        if (resultLogin) {
            setId("")
            setPassword("")
            setTimeout(() => {
                navigate("/home")
            }, 4000)
        }
    }
    return (
        <div>
            <h2>Login to have access to our services!</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="">
                    Username: <input type="text" value={id} onChange={handleUsername} />
                </label>
                <label htmlFor="">
                    Password: <input type="password" value={password} onChange={handlePassword} />
                </label>
                <button>Login</button>
            </form>
        </div>
    )
}