interface ExperienceItemProps {
  title: string;
  company: string;
  description: string;
  link?: string;
  date: string;
}

function LinkInline({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      role="link"
      className="inline-flex items-center text-lg font-medium text-yellow-500 hover:text-yellow-700 dark:text-yellow-200 dark:hover:text-yellow-300"
    >
      {children}
    </a>
  );
}

export default function ExperienceItem({
  title,
  company,
  description,
  link,
  date,
}: ExperienceItemProps) {
  return (
    <div className="md:space-x-4] relative mx-12 grid pb-12 before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:content-[''] md:grid-cols-5 md:gap-10 before:border-white/15">
      <div className="relative pb-12 md:col-span-2">
        <div className="sticky top-0">
          <span className="absolute -left-[42px] rounded-full text-5xl text-yellow-400">
            &bull;
          </span>

          <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
          <h4 className="text-xl font-semibold text-white">
            {company}
          </h4>
          <time className="m-0 p-0 text-sm text-white/80">
            {date}
          </time>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 pb-4 md:col-span-3 text-gray-300">
        {description}
        {link && (
          <LinkInline href={link}>
            Saber más{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right w-5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </>
            </svg>
          </LinkInline>
        )}
      </div>
    </div>
  );
}
