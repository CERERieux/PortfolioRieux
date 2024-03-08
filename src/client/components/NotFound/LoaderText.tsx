export default function LoaderText() {
  return (
    <div className="flex h-full w-full items-center justify-center   dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-28 w-40 animate-pulse items-center justify-center rounded-lg border-gray-700 bg-gray-800 shadow-inner shadow-white">
        <p className="rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Loading...
        </p>
      </div>
    </div>
  );
}
