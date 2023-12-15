import { Link } from "react-router-dom"
import { useAdminListUser } from "../../hooks/useAdminListUser"
import UnauthorizedAccess from "../NotFound/AuthError"
import { isAxiosError } from "axios"

export default function AdminPanel() {
    const { data, error, errorAuth, isLoading } = useAdminListUser()
    const admin = import.meta.env.VITE_ADMIN
    const routeAdmin = `/${import.meta.env.VITE_ROUTE_ADMIN}/admin`

    return (
        <div>
            {errorAuth.cause !== null && <UnauthorizedAccess errorAuth={errorAuth} />}
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {data !== undefined ?
                <>
                    <h2>Admin Panel</h2>
                    <Link to={routeAdmin}><button>Return</button></Link>
                    <ul>
                        {data.map(user => {
                            const id = user._id !== admin ? user._id : "Anonymous"
                            return (
                                <Link to={`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/${id}/data`} key={id} state={id}>
                                    <li>{id}</li>
                                </Link>
                            )
                        })}
                    </ul>
                </>
                : isLoading ? <h2>Loading Users...</h2> : <h2>Error: There is no data to administrate</h2>}
        </div>
    )
}