import { useState, type FormEvent, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
interface Props {
    loginAdmin: ({ username, password }: User) => Promise<boolean>
}

export default function AdminForm({ loginAdmin }: Props) {
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
        const resultLogin = await loginAdmin({ username: id, password })
        if (resultLogin) {
            setId("")
            setPassword("")
            setTimeout(() => {
                navigate(`/${import.meta.env.VITE_ROUTE_ADMIN}/admin`)
            }, 1000)
        }
    }
    return (
        <div>
            <h2>Administration Entrance</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="">
                    Admin: <input type="text" value={id} onChange={handleUsername} />
                </label>
                <label htmlFor="">
                    Password: <input type="password" value={password} onChange={handlePassword} />
                </label>
                <button>Login</button>
            </form>
        </div>
    )
}