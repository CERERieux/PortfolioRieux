import { type FormEvent, useState, type ChangeEvent, useEffect } from "react";
import { convertUnit } from "../services/converter";

export default function useConverter() {
  const [userInput, setUserInput] = useState("");
  const [userUnit, setUserUnit] = useState("l");
  const [conversion, setConversion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Unit Converter";
  }, []);

  const handleConversion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataConvert = `${userInput}${userUnit}`;
    const resultFetch = await convertUnit(dataConvert);
    if ("error" in resultFetch) {
      setError(resultFetch.error);
      setConversion("");
    } else {
      setError("");
      setConversion(resultFetch.string);
    }
  };
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleUserUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserUnit(e.target.value);
  };

  return {
    conversion,
    error,
    handleConversion,
    handleUserInput,
    handleUserUnit,
    userInput,
    userUnit,
  };
}
