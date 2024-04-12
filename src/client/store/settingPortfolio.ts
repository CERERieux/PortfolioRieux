import { create } from "zustand";

interface StatePortfolio {
  lightDark: "light" | "dark";
  i18n: "English" | "Español";
  setLightDark: () => void;
  changeLanguage: () => void;
}

function setInitialLang() {
  const localLang = localStorage.getItem("Language");
  if (localLang === null) return "English";
  else {
    return localLang as "English" | "Español";
  }
}

function setInitialTheme() {
  const theme = localStorage.getItem("Theme"); // Get theme from storage
  if (theme === null) {
    // If theme is empty, then get the preference from user PC
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // If user prefer dark, then add it to the storage and to the html tag to work
      document.documentElement.classList.toggle("dark");
      window.localStorage.setItem("Theme", "dark");
      return "dark";
    } else {
      // If user prefer light, then remove dark from html and set it to the storage
      document.documentElement.classList.toggle("dark");
      window.localStorage.setItem("Theme", "light");
      return "light";
    }
  } else {
    // If theme exist, then add or remove the class dark from html based on theme
    if (theme === "dark") {
      document.documentElement.classList.toggle("dark");
      return "dark";
    } else {
      document.documentElement.classList.toggle("dark");
      return "light";
    }
  }
}

export const useSettingStore = create<StatePortfolio>((set, get) => ({
  lightDark: setInitialTheme(), // Setting for theme light dark
  i18n: setInitialLang(), // Setting for the language, only English or Spanish
  // Function to toggle between dark and light theme
  setLightDark: () => {
    const { lightDark } = get();
    const theme = lightDark === "dark" ? "light" : "dark";
    set({
      lightDark: theme,
    });
    window.localStorage.setItem("Theme", theme);
    document.documentElement.classList.toggle("dark");
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
