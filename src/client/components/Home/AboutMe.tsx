import UserIcon from "../Icons/UserIcon";

export default function AboutMe() {
  return (
    <article
      className="mt-4 flex w-full flex-col gap-4 px-6 py-3 lg:mt-8 lg:w-3/5 lg:self-center"
      id="AboutMe"
    >
      <h3 className="flex w-full items-center justify-center gap-2 text-xl text-lime-200 lg:justify-start">
        <UserIcon size="26" /> About me!
      </h3>
      <p className="text-sm">
        Hi! I&apos;m Erik or known as Rieux by my friends. :) <br />
        <span className="text-lime-300">
          I studied 3 years at the Higher School of Computing (ESCOM in Spanish)
        </span>
        , but due personal issues, by mid-2019, I decided to drop out. <br />
        After settling those issues, I decided to resume my studies by myself.{" "}
        <span className="text-lime-300">
          I realized that solving problems through programming is something I
          really like
        </span>
        , or I find myself coming back to this haha.
      </p>
      <p className="text-sm">
        Between my successes, I can share that{" "}
        <span className="text-lime-300">
          I was in the honor roll of the school. <br />I led teams in school
          projects
        </span>
        , for some reason I ended up in the leading position most of the time. I
        don&apos;t mind it and it lets me know better the people around me.{" "}
        <br />
        <span className="text-lime-300">
          And I helped my classmates to understand the subjects.
        </span>{" "}
        Usually they were the ones who asked me for help.
      </p>
      <p className="text-sm">
        I don&apos;t possess any professional experience, but{" "}
        <span className="text-lime-300">
          I feel confident enough in my abilities to think that I&apos;ll be
          able to help in a company to reach their goals through my efforts.
        </span>
        <br />
        I think this after doing my portfolio and looking back at the school
        projects I did. <br />
        And at the same time,{" "}
        <span className="text-lime-300">
          fulfill my objective of helping people
        </span>
        , by solving a problem through an app or service!
      </p>
    </article>
  );
}
