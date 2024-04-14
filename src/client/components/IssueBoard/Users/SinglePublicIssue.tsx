import type { IIssueTracker } from "../../../../server/types/advanced";
import { useLanguage } from "../../../hooks/useLanguage";
import { useSettingStore } from "../../../store/settingPortfolio";

interface SingleIssueProps {
  issue: IIssueTracker;
  id: string;
  created: string;
  updated: string;
}
// Auxiliar to give color to the status depending on it
const COLOR_STATUS = {
  Pending: "text-red-200",
  Read: "text-purple-300",
  Completed: "text-lime-300",
  "Trying to fix": "text-yellow-200",
  Ignored: "text-slate-400",
};

function getStatusSpanish(text: string[], status: string) {
  if (status === "Pending") return text[12];
  else if (status === "Read") return text[13];
  else if (status === "Trying to fix") return text[14];
  else if (status === "Completed") return text[15];
  else if (status === "Ignored") return text[16];
}

export default function SinglePublicIssue({
  created,
  id,
  issue,
  updated,
}: SingleIssueProps) {
  const text = useLanguage({ project: "SugAndIssues" });
  const { i18n } = useSettingStore();
  const atWord = i18n === "English" ? "at" : "el";
  const status =
    i18n === "Español" ? getStatusSpanish(text, issue.status) : issue.status;
  // Show the article that is inside of the list item with the issue info
  return (
    <article className="flex w-full flex-col justify-center gap-1 px-4">
      <h2 className="-ml-4 text-xl first-letter:text-2xl first-letter:text-lime-300">
        {issue.project}
      </h2>
      <p className="text-lg first-letter:text-lime-300">
        {text[10]}:{" "}
        <span
          className={`text-base ${
            COLOR_STATUS[issue.status as keyof typeof COLOR_STATUS]
          }`}
        >
          {status}
        </span>
      </p>
      <h3 className="text-xl first-letter:text-lime-300">
        {text[20]}: <span className="text-base underline">{issue.title}</span>
      </h3>
      <p className="ml-4 whitespace-pre-wrap text-sm">{issue.text}</p>
      <p className="left-16 text-end text-xs first-letter:text-lime-300">
        {text[9]} {issue.created_by}, {atWord} {created}{" "}
        {issue.created_on !== issue.updated_on && `${text[18]} ${updated}`}
      </p>
      <p className="text-end text-xs first-letter:text-lime-300">ID: {id}</p>
    </article>
  );
}
