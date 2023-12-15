import { isAxiosError } from "axios"
import { useAdminBoards } from "../../hooks/useAdminBoards"
import UnauthorizedAccess from "../NotFound/AuthError"
import { Link } from "react-router-dom"

export default function AdminBoards() {
    const { data, deleteBoard, error, errorAuth, isLoading } = useAdminBoards()
    const routeAdmin = `/${import.meta.env.VITE_ROUTE_ADMIN}/admin`

    const handleDelete = (id: string) => {
        deleteBoard(id)
    }

    return (
        <div>
            <Link to={routeAdmin}><button>Return</button></Link>
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {errorAuth.cause !== null ? <UnauthorizedAccess errorAuth={errorAuth} /> :
                data !== undefined ?
                    <>
                        {!("error" in data) ?
                            data.map(board => {
                                const id = board.id
                                return (
                                    <section key={id}>
                                        <h3>{id}</h3>
                                        <button onClick={() => { handleDelete(id) }}>Delete</button>
                                    </section>
                                )
                            })
                            : <h2>{data.error}</h2>}
                    </>
                    : isLoading ?
                        <h2>Getting boards...</h2>
                        : <h2>There is no existent boards right now</h2>
            }
        </div>
    )
}