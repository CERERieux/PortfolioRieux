import { type FormEvent, type ChangeEvent, useState } from "react"
import type { TranslateResult } from "../../types"
import "./translatorEng.css"

const AME_TO_BRIT = "american-to-british"
const BRIT_TO_AME = "british-to-american"
type mode = "american-to-british" | "british-to-american"

export default function TranslatorEng() {
    const [mode, setMode] = useState<mode>(AME_TO_BRIT)
    const [userInput, setUserInput] = useState("")
    const [error, setError] = useState("")
    const [translation, setTranslation] = useState("")

    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resultTranslation = await fetch("/cYSvQmg9kR/advanced/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                locale: mode,
                text: userInput
            })
        }).then(async (data) => {
            if (data.ok) {
                const resultData: TranslateResult = await data.json()
                return resultData
            }
            return { error: "Can't translate your text right now" }
        })

        if ("error" in resultTranslation) {
            setError(resultTranslation.error)
            setTranslation("")
        }
        else {
            setError("")
            setTranslation(resultTranslation.translation)
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

    const handleMode = () => {
        if (mode === AME_TO_BRIT) setMode(BRIT_TO_AME)
        else setMode(AME_TO_BRIT)
    }

    return (
        <div>
            <button onClick={handleMode}>Current translation mode: {mode}</button>
            <form onSubmit={handleForm}>
                <label htmlFor="">
                    Introduce the text you want to translate: <input type="text"
                        value={userInput} onChange={handleInput} name="translator" id="translator" />
                </label>
            </form>
            {error !== "" && <p>{error}</p>}
            {translation !== "" && <p dangerouslySetInnerHTML={{ __html: translation }}></p>}
        </div>
    )
}