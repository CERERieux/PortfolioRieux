import { useUser } from "../../store/user"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogInForm from "./LoginForm"
import SignInForm from "./SignInForm"

export default function Login() {
    const navigate = useNavigate()
    const { action, error, token, createUser, loginUser } = useUser()
    const [signIn, setSignIn] = useState(false)

    // An useEffect hook to redirect user in case they is already logged in
    useEffect(() => {
        if (token !== "") {
            setTimeout(() => {
                navigate("/home")
            }, 1000)
        }
    }, [])

    const handleView = () => {
        setSignIn(state => !state)
    }

    return (
        <div>
            {error != null && <p>{error}</p>}
            {action !== "" && <h1>{action}</h1>}
            {token === ""
                ? <div>
                    {!signIn
                        ? <LogInForm loginUser={loginUser} />
                        : <SignInForm createUser={createUser} setSignIn={setSignIn} />}
                    <button onClick={handleView}>{signIn ? "Login with your user!" : "Register new user!"}</button>
                </div>
                : <div>
                    <h2>Redirecting to Home...</h2>
                    <p>Remember to log off before using another account or creating a new one</p>
                </div>
            }

        </div>


    )
}