import type { IIssueTracker } from "../../../../server/types/advanced";
import Edit from "../../Icons/Edit";
import ActionButton from "../../SystemDesign/ActionButton";

interface SingleIssueProps {
  issue: IIssueTracker;
  id: string;
  created: string;
  updated: string;
  setIsUpdate: React.Dispatch<
    React.SetStateAction<{
      isUpdate: boolean;
      id: string;
    }>
  >;
}

// Auxiliar to give color to the status depending on it
const COLOR_STATUS = {
  Pending: "text-red-500 dark:text-red-300",
  Read: "text-purple-500 dark:text-purple-300",
  Completed: "text-lime-500 dark:text-lime-300",
  "Trying to fix": "text-yellow-500 dark:text-yellow-300",
  Ignored: "text-slate-400 dark:text-slate-300",
};

export default function SingleIssue({
  created,
  id,
  issue,
  updated,
  setIsUpdate,
}: SingleIssueProps) {
  // Auxiliar that handles the view from the issue and the form to update it
  const handleViewUpdate = () => {
    setIsUpdate({ isUpdate: true, id });
  };
  // Show the article that is inside of the list item with the issue info
  return (
    <article className="relative flex flex-col justify-center gap-1 px-4">
      <h2 className="text-center text-xl first-letter:text-2xl first-letter:text-blue-500 dark:first-letter:text-blue-300">
        {issue.project}
      </h2>
      <h3 className="-ml-4 text-xl first-letter:text-blue-500 dark:first-letter:text-blue-300">
        Issue: <span className="text-base underline">{issue.title}</span>
      </h3>
      <p className="whitespace-pre-wrap text-sm">{issue.text}</p>
      <p className="-ml-4 text-lg first-letter:text-blue-500 dark:first-letter:text-blue-300">
        Status:{" "}
        <span
          className={`text-base ${
            COLOR_STATUS[issue.status as keyof typeof COLOR_STATUS]
          }`}
        >
          {issue.status}
        </span>
      </p>
      <p className="left-16 text-end text-xs first-letter:text-blue-500 dark:first-letter:text-blue-300">
        Created at {created}{" "}
        {issue.created_on !== issue.updated_on && `| Updated on: ${updated}`}
      </p>
      <p className="text-end text-xs first-letter:text-blue-500 dark:first-letter:text-blue-300">
        ID: {id}
      </p>
      <ActionButton
        coverColor="bg-slate-300 shadow-slate-100 dark:text-slate-700"
        hoverColor="hover:bg-blue-400 hover:shadow-blue-400/30 hover:text-white"
        groupName={["group/delete", "group-hover/delete:block"]}
        position="md:top-4 md:right-4 top-2 right-2"
        tooltipText="Modify Issue"
        tooltipPos="-left-[68px] bottom-2"
        onClick={handleViewUpdate}
      >
        <Edit />
      </ActionButton>
    </article>
  );
}
