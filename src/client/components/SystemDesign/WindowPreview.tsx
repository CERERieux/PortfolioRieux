import { Link } from "react-router-dom";
import { useSettingStore } from "../../store/settingPortfolio";

interface WindowPreviewProps {
  children: React.ReactNode;
  imgPreview: string;
  imgAltText: string;
  titleWindow: string;
  toRedirect: string;
}

export default function WindowPreview({
  children,
  imgPreview,
  imgAltText,
  titleWindow,
  toRedirect,
}: WindowPreviewProps) {
  const { i18n } = useSettingStore();
  const text = i18n === "English" ? "Made With" : "Hecho Con";
  return (
    <section className="group relative h-60 w-[426.67px] rounded-xl shadow-lg shadow-white/25">
      <Link to={toRedirect} className="h-full w-full rounded-xl">
        <>
          <img
            src={imgPreview}
            alt={imgAltText}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
          <section className="absolute left-0 top-0 -z-10 flex h-full w-full translate-y-1/3 flex-col items-center gap-4 rounded-xl bg-gradient-to-b from-black/90 to-black/50 py-4 text-slate-100 opacity-0 transition-all duration-500 ease-in-out group-hover:z-30 group-hover:translate-y-0 group-hover:opacity-100 sm:to-80% sm:group-hover:z-10">
            <h3 className="text-lg italic">{text}</h3>
            <div className="flex w-5/6 flex-wrap items-center justify-around gap-6 px-8">
              {children}
            </div>
          </section>
          <div className="absolute bottom-0 z-20 h-12 w-full rounded-b-xl bg-white/80 px-4 py-2">
            <h2 className="text-center font-sketch text-lg sm:text-2xl">
              {titleWindow}
            </h2>
          </div>
        </>
      </Link>
    </section>
  );
}
