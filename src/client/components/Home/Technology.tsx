import PencilCode from "../Icons/PencilCode";
import HtmlIcon from "../Icons/HtmlIcon";
import CSSIcon from "../Icons/CSSIcon";
import JavaScript from "../Icons/JavaScript";
import NodeIcon from "../Icons/NodeIcon";
import PostgreSQL from "../Icons/PostgreSQL";
import MongoDB from "../Icons/MongoDB";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import ReactQuery from "../Icons/ReactQuery";
import ReactRouter from "../Icons/ReactRouter";
import TypeScript from "../Icons/TypeScript";
import Tailwind from "../Icons/Tailwind";
import JWTIcon from "../Icons/JWTIcon";

export default function Technology() {
  return (
    <section className="object-to-observe techObserve mt-4 flex w-full flex-col gap-4 px-6 py-3 transition-all duration-500 lg:mt-8 lg:w-3/5 lg:self-center">
      <h3 className="flex w-full items-center justify-center gap-2 text-xl text-red-300 lg:justify-start">
        <PencilCode size="26" /> Tools I can use.
      </h3>
      <ul className="flex w-full flex-wrap items-center justify-around gap-20 rounded-lg bg-slate-700/20 px-10 py-4 shadow-inner shadow-white/40">
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <HtmlIcon height="40" width="35" /> HTML
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <CSSIcon height="40" width="39" /> CSS
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <JavaScript size="40" /> JavaScript
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <NodeIcon height="40" width="38" /> Node.js
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <PostgreSQL height="38" width="37" /> PostgreSQL
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <MongoDB height="40" width="20" /> MongoDB
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <ReactIcon height="38" width="40" /> React
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <Express size="40" isblackBG /> Express
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <TypeScript size="40" /> TypeScript
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <Tailwind height="40" width="30" /> Tailwind
        </li>
        <li className="flex w-11 flex-col items-center justify-center gap-2">
          <JWTIcon height="40" width="40" /> JWT
        </li>
        <li className="flex w-10 flex-col items-center justify-center gap-2">
          <img
            src="/mongoose.png"
            className="max-h-full max-w-full bg-white"
            alt="Logo of MongooseJS"
          />{" "}
          Mongoose
        </li>
        <li className="w-18 flex flex-col items-center justify-center gap-2 text-sm">
          <ReactQuery height="40" width="38" /> React Query
        </li>
        <li className="w-18 flex flex-col items-center justify-center gap-2 text-sm">
          <ReactRouter height="40" width="30" isBlackBG /> React Router
        </li>
        <li className="w-18 flex flex-col items-center justify-center gap-2 text-sm italic text-yellow-300">
          And trying to learn more!
        </li>
      </ul>
    </section>
  );
}
