import { useEffect, useState } from "react";
import type { ReqData, TimeStampData } from "../../types";

const URL_REQUEST = "/cYSvQmg9kR/basic/whoami"
const URL_TIMESTAMP = "/cYSvQmg9kR/basic/timestamp"

export default function DataRequest() {
    const [dataReq, setDataReq] = useState({ ipaddress: "", language: [""], software: "", utc: "" })
    const [error, setError] = useState("")
    const [showData, setShowData] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const [jsonReq, jsonTimeS] = await Promise.all([fetch(URL_REQUEST), fetch(URL_TIMESTAMP)])
            const dataFetch = await Promise.all([jsonReq.json(), jsonTimeS.json()])
            const resRequest: ReqData = dataFetch[0]
            const resTimeStamp: TimeStampData = dataFetch[1]
            setDataReq({
                ipaddress: resRequest.ipaddress,
                language: resRequest.language,
                software: resRequest.software,
                utc: resTimeStamp.utc
            })
            setError("")
        }
        if (showData) {
            getData().catch(err => {
                console.error(err)
                setError(err)
            })
        }
        else {
            setDataReq({ ipaddress: "", language: [""], software: "", utc: "" })
        }
    }, [showData])

    const handleRequest = () => {
        setShowData(!showData)
    }

    return (
        <div className="infoRequest">
            <p className="infoDisclaimer">The information that appear in screen when you press the button include: your IP Address and the software you use to navigate on internet. If you are not ok with it, please DO NOT press the button.</p>
            <button onClick={handleRequest}>{showData ? "Hide" : "Show"} my request data</button>
            {error !== "" && <p>{error}</p>}
            {dataReq.utc !== "" && <ul className="userData"><li>IP Address: {dataReq.ipaddress}</li>
                <li>Prefered Language: {dataReq.language[0]}</li>
                <li>Software used: {dataReq.software}</li>
                <li>Time of the request: {dataReq.utc}</li></ul>}
        </div>
    )
}