import type { IIssueTracker } from "../../../../server/types/advanced";

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

export default function SinglePublicIssue({
  created,
  id,
  issue,
  updated,
}: SingleIssueProps) {
  // Show the article that is inside of the list itemn with the issue info
  return (
    <article className="flex w-full flex-col justify-center gap-1 px-4">
      <h2 className="-ml-4 text-xl first-letter:text-2xl first-letter:text-lime-300">
        {issue.project}
      </h2>
      <p className="text-lg first-letter:text-lime-300">
        Status:{" "}
        <span
          className={`text-base ${
            COLOR_STATUS[issue.status as keyof typeof COLOR_STATUS]
          }`}
        >
          {issue.status}
        </span>
      </p>
      <h3 className="text-xl first-letter:text-lime-300">
        Issue: <span className="text-base underline">{issue.title}</span>
      </h3>
      <p className="ml-4 text-sm">{issue.text}</p>
      <p className="left-16 text-end text-xs first-letter:text-lime-300">
        Created by {issue.created_by}, at {created}{" "}
        {issue.created_on !== issue.updated_on && `| Updated on: ${updated}`}
      </p>
      <p className="text-end text-xs first-letter:text-lime-300">ID: {id}</p>
    </article>
  );
}
