import { isAxiosError } from "axios"
import { useProfile } from "../../hooks/useProfile"
import UnauthorizedAccess from "../NotFound/AuthError"
import { type ChangeEvent, useState, useEffect, type FormEvent } from "react"
import type { UserInfo, ImgProfile } from "../../types"
import { Link } from "react-router-dom"

export default function MyProfile() {
    const { data, error, errorAuth, updateInfo } = useProfile()
    const [aboutMe, setAboutMe] = useState("")
    const [imgProfile, setImgProfile] = useState<ImgProfile>("type-img-1")
    const [isUpdating, setIsUpdating] = useState(false)
    const [action, setAction] = useState<null | string>(null)
    const [localError, setLocalError] = useState<null | string>(null)

    useEffect(() => {
        if (updateInfo.isSuccess) {
            setIsUpdating(false)
            setLocalError(null)
            setImgProfile("type-img-1")
            setAboutMe("")
            setAction(updateInfo.data.action)
            setTimeout(() => { setAction(null) }, 2000)
        }
        else if (updateInfo.isError) {
            const { error } = updateInfo
            if (isAxiosError(error)) {
                setLocalError(error.response?.data.error)
            }
            else {
                setLocalError("Something went wrong at updating your profile...")
            }
            setTimeout(() => { setLocalError(null) }, 3000)
        }
    }, [updateInfo.isSuccess])

    const handleAboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAboutMe(e.target.value)
    }
    const handleProfileImg = (e: ChangeEvent<HTMLSelectElement>) => {
        setImgProfile(e.target.value as ImgProfile)
    }
    const handleUpdate = (e: FormEvent<HTMLFormElement>, data: UserInfo) => {
        e.preventDefault()
        let newBio
        let newImg
        if (aboutMe !== data.bio) newBio = aboutMe
        if (imgProfile !== data.img) newImg = imgProfile
        updateInfo.mutate({ img: newImg, bio: newBio })
    }
    return (
        <div>
            {errorAuth.cause !== null && <UnauthorizedAccess errorAuth={errorAuth} />}
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {localError !== null && <h2>{localError}</h2>}
            {action !== null && <h2>{action}</h2>}
            {data !== undefined ?
                <div>
                    {!isUpdating ?
                        <div>
                            <h4>Later change to an img with {data.img}</h4>
                            <h2>Welcome {data.username}</h2>
                            {data.bio !== "" ? <p>About me: <br />{data.bio}</p> : <p>Update your profile so you can tell us a bit about you!</p>}
                            <button onClick={() => {
                                setIsUpdating(true)
                                setAboutMe(data.bio)
                                setImgProfile(data.img as ImgProfile)
                            }}>Update user</button>
                        </div> :
                        <div>
                            <form onSubmit={(e) => { handleUpdate(e, data); }}>
                                <label htmlFor="">
                                    About me: <textarea name="" id="" cols={30} rows={10} value={aboutMe} onChange={handleAboutMe}></textarea>
                                </label>
                                <label htmlFor="">
                                    Select your profile image: <select name="" id="" value={imgProfile} onChange={handleProfileImg}>
                                        <option value="type-img-1">Image 1</option>
                                        <option value="type-img-2">Image 2</option>
                                        <option value="type-img-3">Image 3</option>
                                        <option value="type-img-4">Image 4</option>
                                        <option value="type-img-5">Image 5</option>
                                        <option value="type-img-6">Image 6</option>
                                    </select>
                                </label>
                                <button>Update profile!</button>
                            </form>
                            <button onClick={() => {
                                setIsUpdating(false)
                                setAboutMe("")
                                setImgProfile("type-img-1")
                            }}>Cancel</button>
                        </div>}
                    <Link to="/my-profile/library">
                        <section>
                            <h2>My Library</h2>
                            <p>Image later here</p>
                        </section>
                    </Link>
                    <Link to="/my-profile/exercises">
                        <section>
                            <h2>Exercise Tracker (My ToDo List)</h2>
                            <p>Image later here</p>
                        </section>
                    </Link>
                    <Link to="/my-profile/urls">
                        <section>
                            <h2>My Short URLs</h2>
                            <p>Image later here</p>
                        </section>
                    </Link>
                    <Link to="/my-profile/issues">
                        <section>
                            <h2>Issues</h2>
                            <p>Image later here</p>
                        </section>
                    </Link>
                </div>
                : <h3>Loading...</h3>}

        </div>
    )
}