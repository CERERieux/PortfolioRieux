import Spinner from "../Icons/Spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        role="status"
        className="flex h-40 w-40 animate-pulse items-center justify-center rounded-lg border border-gray-700 bg-gray-800 shadow-inner shadow-white"
      >
        <Spinner />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
