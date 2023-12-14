import { Link } from "react-router-dom"
import { useAdmin } from "../../hooks/useAdmin"
import UnauthorizedAccess from "../NotFound/AuthError"
import { isAxiosError } from "axios"

export default function AdminPanel() {
    const { data, error, errorAuth, isLoading } = useAdmin()

    return (
        <div>
            {errorAuth.cause !== null && <UnauthorizedAccess errorAuth={errorAuth} />}
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {data !== undefined ?
                <>
                    <h2>Admin Panel</h2>
                    <ul>
                        {data.map(user => {
                            const id = user._id
                            return (
                                <Link to={`/${process.env.ROUTE_ADMIN}/admin/${id}/data`} key={id} state={user}>
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