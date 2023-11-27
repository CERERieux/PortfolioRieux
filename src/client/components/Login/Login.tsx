import { useUser } from "../../store/user"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogInForm from "./LoginForm"
import SignInForm from "./SignInForm"
import { ERROR_GUSER } from "../../../server/schemas/global"

export default function Login() {
    const navigate = useNavigate()
    const { action, error, token, createUser, loginUser, logoffUser, verifyToken } = useUser()
    const [signIn, setSignIn] = useState(false)

    // An useEffect hook to redirect user in case they is already logged in
    useEffect(() => {
        const verifyStart = async () => {
            let result
            if (token !== "")
                result = await verifyToken(token)
            // In case user token is expired or is bad we need to login again
            if (result === ERROR_GUSER.EXPIRED_TOKEN || result === ERROR_GUSER.ERROR_VERIFY_TOKEN) {
                logoffUser()    // Logout user to remove token
            }
            else if (token !== "") {
                // If user is logged in and it's valid, redirect to home
                setTimeout(() => {
                    navigate("/home")
                }, 1000)
            }
        }
        verifyStart()
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