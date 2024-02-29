import type { UserUrls } from "../../types";
import TrashCan from "../Icons/TrashCan";
import ActionButton from "../SystemDesign/ActionButton";

interface UrlsTableProps {
  data: UserUrls[];
  handleDelete: (id: string) => void;
}

export default function UrlsTable({ data, handleDelete }: UrlsTableProps) {
  // Component that return a styled table with the user links
  return (
    <table className="w-full table-fixed border-collapse border border-x-2 border-y-2 border-yellow-200 bg-black/50">
      <thead>
        <tr>
          <th className="w-3/4 border border-y-2 border-yellow-200 px-2 text-start md:w-2/3">
            Original URL
          </th>
          <th className="w-1/4 border border-y-2 border-l-2 border-yellow-200 px-2 text-start md:w-1/3">
            Short URL
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(url => {
          const id = url._id.toString();
          return (
            <tr key={id}>
              <td className="border border-r-2 border-yellow-200 px-4 py-2">
                <a
                  href={`${url.originalUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-cyan-300 underline visited:text-purple-300 active:text-lime-300"
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="relative border border-yellow-200 px-1 py-2 md:px-4">
                <a
                  href={`/url/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-cyan-300 underline visited:text-purple-300 active:text-lime-300"
                >
                  {url.shortUrl}
                </a>
                <ActionButton
                  coverColor="bg-slate-50 shadow-slate-200 text-black"
                  hoverColor="hover:bg-red-400 hover:shadow-red-400/30 hover:text-white"
                  groupName={["group/delete", "group-hover/delete:block"]}
                  position="md:top-1.5 md:right-4 top-1 right-1"
                  tooltipText="Remove Link"
                  tooltipPos="-left-20 bottom-1.5"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  <TrashCan size="20" />
                </ActionButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
