import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { ErrorAuth } from "../../types"

interface Props {
    errorAuth: ErrorAuth
}

export default function UnauthorizedAccess({ errorAuth }: Props) {
    const { message, cause } = errorAuth
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => { navigate("/home") }, 3000)
    }, [])
    return (
        <div>
            {/** Depending on what cause we get, show an img or another
             * like, if badtoken, show something about it, expired one a clock
             * and like that
             */}
            {cause === "BadToken" && <p>{cause}</p>}
            {cause === "ExpiredToken" && <p>{cause}</p>}
            {cause === "NotAdmin" && <p>{cause}</p>}
            {cause === "NotLoggedIn" && <p>{cause}</p>}
            <h2>{message}</h2>
        </div>
    )
}