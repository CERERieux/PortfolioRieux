import { type ChangeEvent, useState, useCallback, useEffect } from "react";
import type { Mode, TranslateData, TranslateResult } from "../types";
import debounce from "just-debounce-it";

export const AME_TO_BRIT = "american-to-british";
export const BRIT_TO_AME = "british-to-american";

export function useTranslator() {
  const [mode, setMode] = useState<Mode>(AME_TO_BRIT);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [translation, setTranslation] = useState("");

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Translator English USA <-> English UK";
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setUserInput(text);
    translator({ text, locale: mode });
  };

  const handleMode = () => {
    let locale: Mode = "american-to-british";
    if (mode === AME_TO_BRIT) {
      setMode(BRIT_TO_AME);
      locale = BRIT_TO_AME;
    } else {
      setMode(AME_TO_BRIT);
    }
    translator({ text: userInput, locale });
  };

  const handleTranslation = useCallback(
    async ({ text, locale }: TranslateData) => {
      const resultTranslation = await fetch(
        `/${import.meta.env.VITE_ROUTE_API}/advanced/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locale,
            text,
          }),
        },
      ).then(async data => {
        if (data.ok) {
          const resultData: TranslateResult = await data.json();
          return resultData;
        }
        return { error: "Can't translate your text right now" };
      });

      if ("error" in resultTranslation) {
        setError(resultTranslation.error);
        setTranslation("");
      } else {
        setError("");
        setTranslation(resultTranslation.translation);
      }
    },
    [],
  );
  const translator = useCallback(
    debounce(({ text, locale }: TranslateData) => {
      handleTranslation({ locale, text });
    }, 300),
    [handleTranslation],
  );
  return {
    translator,
    error,
    translation,
    userInput,
    mode,
    handleInput,
    handleMode,
  };
}
