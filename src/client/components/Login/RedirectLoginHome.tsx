export default function RedirectLoginHome() {
  return (
    <section className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-900 transition-all">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-x-4 border-y-4 border-blue-800/45 bg-blue-100 px-4 py-2 shadow-inner shadow-blue-800/75 md:w-2/5">
        <h2 className="text-3xl italic first-letter:text-4xl first-letter:text-red-500">
          Redirecting to your Profile...
        </h2>
        <p className="text-balance text-center text-sm">
          Remember to log off before using another account or creating a new one
        </p>
      </div>
    </section>
  );
}
