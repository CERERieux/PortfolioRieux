import { Link } from "react-router-dom";

export default function AdminMainMenu() {
    const routeAdmin = `/${import.meta.env.VITE_ROUTE_ADMIN}/admin`
    return (
        <div>
            <Link to={`${routeAdmin}/anonboard`}>
                <section>
                    <h2>Administrate Boards</h2>
                </section>
            </Link>
            <Link to={`${routeAdmin}/users`}>
                <section>
                    <h2>Administrate Users</h2>
                </section>
            </Link>
        </div>
    )
}