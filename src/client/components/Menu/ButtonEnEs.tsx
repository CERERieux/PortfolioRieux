import { useSettingStore } from "../../store/settingPortfolio";

export default function ButtonEnEs() {
  const { i18n, changeLanguage } = useSettingStore();
  return (
    <div className="absolute top-3 mx-auto text-sm text-slate-50">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          name="toggleModeTranslator"
          checked={i18n !== "English"}
          onChange={changeLanguage}
        />
        <div className="flex h-6 w-[8.9rem] justify-between rounded-full bg-gray-800 px-3.5 pt-0.5 *:z-10 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-[4.3rem] after:rounded-full after:border after:border-gray-300 after:bg-slate-600 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 rtl:peer-checked:after:-translate-x-full [&:nth-child(1)]:[&_p]:opacity-100 peer-checked:[&:nth-child(1)]:[&_p]:opacity-60 [&:nth-child(2)]:[&_p]:opacity-60 peer-checked:[&:nth-child(2)]:[&_p]:opacity-100">
          <p className="">English</p>
          <p className="">Español</p>
        </div>
        <span className="ms-3 text-sm font-medium text-red-700 dark:text-red-200">
          {i18n === "English" ? "Current mode" : "Modo actual"}
        </span>
      </label>
    </div>
  );
}
