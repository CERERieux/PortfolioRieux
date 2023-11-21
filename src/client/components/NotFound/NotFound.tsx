import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => { navigate("/home") }, 2000)
    }, [])
    return (
        <div>
            {/** Insert later here an image and maybe show status to home or something
             * If not just the image, tal vez dale de apariencia a la pagina como si
             * fuera un callejon de atras de un edificio o algo asi
             */}
            <h2>Error 404: Page not found</h2>
            <h3>You are being redirected to Home...</h3>
        </div>
    )
}