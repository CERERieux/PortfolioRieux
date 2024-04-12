import { create } from "zustand";

interface StatePortfolio {
  lightDark: string;
  i18n: "English" | "Español";
  setLightDark: (mode: string) => void;
  changeLanguage: () => void;
}

function setInitialLang() {
  const localLang = localStorage.getItem("Language");
  if (localLang === null) return "English";
  else {
    return localLang as "English" | "Español";
  }
}

export const useSettingStore = create<StatePortfolio>((set, get) => ({
  lightDark: "",
  i18n: setInitialLang(), // Setting for the language, only English or Spanish
  setLightDark: mode => {
    set({
      lightDark: mode,
    });
  },
  // Function to toggle between Spanish or English when button is clicked
  changeLanguage: () => {
    const { i18n } = get(); // Get the current state of the language
    const mode = i18n === "English" ? "Español" : "English"; // Switch it to the other one
    // And set it in the state and the localStorage
    set({
      i18n: mode,
    });
    window.localStorage.setItem("Language", mode);
  },
}));
