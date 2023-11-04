import { type ChangeEvent, useState, type FormEvent } from "react"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signIn, setSignIn] = useState(false)

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleView = () => {
        setSignIn(state => !state)
    }

    const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    // cYSvQmg9kR/global
    const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


    return (
        <div>
            {signIn
                ?
                <div>
                    <h2>Login to have access to our services!</h2>
                    <form onSubmit={handleSignIn}>
                        <label htmlFor="">
                            Username: <input type="text" value={username} onChange={handleUsername} />
                        </label>
                        <label htmlFor="">
                            Password: <input type="password" value={password} onChange={handlePassword} />
                        </label>
                    </form>
                </div>
                : <div>
                    <h2>Create a new user to have access to our services!</h2>
                    <form onSubmit={handleCreateUser}>
                        <label htmlFor="">
                            Username: <input type="text" value={username} onChange={handleUsername} />
                        </label>
                        <label htmlFor="">
                            Password: <input type="password" value={password} onChange={handlePassword} />
                        </label>
                    </form>
                </div>
            }
            <button onClick={handleView}>Register new user!</button>
        </div>


    )
}