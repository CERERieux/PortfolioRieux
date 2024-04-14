import type { IShortenerUrl } from "../../../server/types/basic";
import type { DeleteOperationHook } from "../../types";
import TrashCan from "../Icons/TrashCan";
import ActionButton from "../SystemDesign/ActionButton";
import ActionMessage from "../SystemDesign/ActionMessage";
interface PropsUrl {
  shortUrl: IShortenerUrl[];
  user: string;
  removeUrl: ({ id, userId }: DeleteOperationHook) => void;
  actionDone: null | string;
}

export default function AdminUrls({
  shortUrl,
  user,
  removeUrl,
  actionDone,
}: PropsUrl) {
  const handleDeleteUrl = (id: string) => {
    removeUrl({ id, userId: user });
  };
  return (
    <section className="flex w-4/5 flex-col items-center justify-center gap-3 px-4 py-2">
      <h3 className="mx-auto mb-2 w-fit text-pretty rounded-lg bg-white px-4 text-center text-xl shadow-inner shadow-black/30 first-letter:text-2xl first-letter:text-lime-500">
        Short URLs
      </h3>
      {actionDone !== null && <ActionMessage>{actionDone}</ActionMessage>}
      <table className="w-full table-fixed border-collapse border border-x-2 border-y-2 border-yellow-200 bg-black/50">
        <thead>
          <tr>
            <th className="w-3/4 border border-y-2 border-yellow-200 px-2 text-start text-slate-50 md:w-2/3">
              Original URL
            </th>
            <th className="w-1/4 border border-y-2 border-l-2 border-yellow-200 px-2 text-start text-slate-50 md:w-1/3">
              Short URL
            </th>
          </tr>
        </thead>
        <tbody>
          {shortUrl !== undefined && shortUrl.length > 0 ? (
            shortUrl.map(url => {
              const idUrl = url._id.toString();
              return (
                <tr key={idUrl}>
                  <td className="border border-r-2 border-yellow-200 px-4 py-2 text-slate-50">
                    {url.originalUrl}
                  </td>
                  <td className="relative border border-yellow-200 px-1 py-2 text-slate-50 md:px-4">
                    {url.shortUrl}
                    <ActionButton
                      coverColor="bg-slate-50 shadow-slate-200 text-black"
                      hoverColor="hover:bg-red-400 hover:shadow-red-400/30 hover:text-white"
                      groupName={["group/delete", "group-hover/delete:block"]}
                      position="md:top-1.5 md:right-4 top-1 right-1"
                      tooltipText="Remove Link"
                      tooltipPos="-left-20 bottom-1.5"
                      onClick={() => {
                        handleDeleteUrl(idUrl);
                      }}
                    >
                      <TrashCan size="20" />
                    </ActionButton>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center text-slate-50" colSpan={2}>
                User has not make any short URL
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
