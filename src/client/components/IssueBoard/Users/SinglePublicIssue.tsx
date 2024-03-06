import type { IIssueTracker } from "../../../../server/types/advanced";

interface SingleIssueProps {
  issue: IIssueTracker;
  id: string;
  created: string;
  updated: string;
}

export default function SinglePublicIssue({
  created,
  id,
  issue,
  updated,
}: SingleIssueProps) {
  // Show the article that is inside of the list itemn with the issue info
  return (
    <article className="relative flex flex-col justify-center gap-1 px-4">
      <h2 className="text-center text-xl first-letter:text-2xl first-letter:text-blue-500">
        {issue.project}
      </h2>
      <h3 className="-ml-4 text-xl first-letter:text-blue-500">
        Issue: <span className="text-base underline">{issue.title}</span>
      </h3>
      <p className="text-sm">{issue.text}</p>
      <p className="-ml-4 text-lg first-letter:text-blue-500">
        Status: <span className="text-base">{issue.status}</span>
      </p>
      <p className="left-16 text-end text-xs first-letter:text-blue-500">
        Created by {issue.created_by}, at {created}{" "}
        {issue.created_on !== issue.updated_on && `| Updated on: ${updated}`}
      </p>
      <p className="text-end text-xs first-letter:text-blue-500">ID: {id}</p>
    </article>
  );
}
