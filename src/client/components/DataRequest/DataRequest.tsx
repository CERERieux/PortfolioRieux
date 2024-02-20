import { useEffect, useState } from "react";
import type { ReqData, TimeStampData } from "../../types";
import Button from "../SystemDesign/Button";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import CustomBackground from "../SystemDesign/CustomBackground";

// Links to fetch the info we need
const URL_REQUEST = "/cYSvQmg9kR/basic/whoami";
const URL_TIMESTAMP = "/cYSvQmg9kR/basic/timestamp";

export default function DataRequest() {
  // A state that saves all the info to display
  const [dataReq, setDataReq] = useState({
    ipaddress: "",
    language: [""],
    software: "",
    utc: "",
  });
  const [error, setError] = useState(""); // State in case we have an error at fetching
  const [showData, setShowData] = useState(false); // State to handle the info, if it's visible or not

  // Effect that activates each time we change the showData state
  useEffect(() => {
    // An async function to handle the fetch to do
    const getData = async () => {
      // Fetch both endpoints to get info
      const [jsonReq, jsonTimeS] = await Promise.all([
        fetch(URL_REQUEST),
        fetch(URL_TIMESTAMP),
      ]);
      // Get the info from the json
      const dataFetch = await Promise.all([jsonReq.json(), jsonTimeS.json()]);
      // Get the info into auxiliars
      const resRequest: ReqData = dataFetch[0];
      const resTimeStamp: TimeStampData = dataFetch[1];
      // Set the info if successful into the state
      setDataReq({
        ipaddress: resRequest.ipaddress,
        language: resRequest.language,
        software: resRequest.software,
        utc: resTimeStamp.utc,
      });
      setError(""); // And set the error in empty
    };
    // When we want to show data
    if (showData) {
      // Execute the function, if there is an error display it
      getData().catch(err => {
        console.error(err);
        setError(err);
      });
    } else {
      // If we want to hide the info, reset the state
      setDataReq({ ipaddress: "", language: [""], software: "", utc: "" });
    }
  }, [showData]);

  const handleRequest = () => {
    setShowData(!showData);
  };

  return (
    <CustomBackground
      styles="flex h-full w-full flex-col items-center justify-center gap-10 md:gap-0 font-digitalDisplay"
      bgImg="before:bg-[url('/BGNumbers.jpg')] before:opacity-100"
    >
      <main className="flex h-full w-full flex-col items-center justify-center gap-5">
        <article className="flex h-1/3 w-3/4 flex-col gap-4 rounded-md border-4 border-red-800 bg-red-400/70 px-4 py-2 lg:h-1/4">
          <p className="text-pretty text-white">
            Some of the information of the request petition that your browser do
            when you enter to a web page can be the next. Be careful when you
            navigate on internet!
          </p>
          <Button
            onClick={handleRequest}
            color="bg-lime-300/90 border-lime-500 hover:bg-lime-700 hover:border-lime-300 transition-all self-center text-pretty"
            xSize="w-40"
          >
            {showData ? "Hide" : "Show"} my request data
          </Button>
        </article>
        <section className="h-2/5 w-3/4 rounded-md border-4 border-slate-50/50 bg-slate-700/80 px-4 py-2 text-slate-50 shadow-inner md:h-1/3">
          <h2 className="mb-1 text-center text-2xl">
            <b>Information</b>
          </h2>
          {error !== "" && <p>{error}</p>}
          {dataReq.utc !== "" && (
            <ul className="flex list-inside list-disc flex-col gap-2 marker:text-red-300">
              <li>IP Address: {dataReq.ipaddress}</li>
              <li>Prefered Language: {dataReq.language[0]}</li>
              <li>Software used: {dataReq.software}</li>
              <li>Time of the request: {dataReq.utc}</li>
            </ul>
          )}
        </section>
      </main>
      <FooterAttribution
        placeRef="kjpargeter"
        urlRef="https://www.freepik.com/free-photo/abstract-binary-code-background_6038281.htm#query=matrix%20background&position=2&from_view=keyword&track=ais&uuid=661ae88a-f2fc-4f4f-b659-3aff7cb0edb6"
        whatIs="Image by"
        extra=" on Freepik"
      />
    </CustomBackground>
  );
}
