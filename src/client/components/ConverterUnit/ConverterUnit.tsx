import { type FormEvent, useState, type ChangeEvent } from "react"
import type { ConversionResult } from "../../types"

export default function ConverterUnit() {
    const [userInput, setUserInput] = useState("")
    const [conversion, setConversion] = useState("")
    const [error, setError] = useState("")

    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const link = `/cYSvQmg9kR/advanced/converter?input=${userInput}`
        const resultFetch = await fetch(link).then(async (data) => {
            if (data.ok) {
                const dataResult: ConversionResult = await data.json()
                return dataResult
            }
            return { error: "can't convert right now" }
        })
        if ("error" in resultFetch) {
            setError(resultFetch.error)
            setConversion("")
        } else {
            setError("")
            setConversion(resultFetch.string)
        }
    }

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <label htmlFor="">
                    What you want to convert?: <input type="text" name="converter" id="converter" value={userInput} onChange={handleUserInput} />
                </label>
            </form>
            {conversion !== "" && <p>{conversion}</p>}
            {error !== "" && <p>{error}</p>}
        </div>
    )
}