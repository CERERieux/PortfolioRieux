import { Link } from "react-router-dom";
import Button from "./Button";

interface RedirectButtonProps {
  children: React.ReactNode;
  colorCover: string;
  toRedirect: string;
  needPad?: boolean;
}

export default function RedirectButton({
  children,
  colorCover,
  toRedirect,
  needPad = true,
}: RedirectButtonProps) {
  return (
    <Link
      to={toRedirect}
      className="flex w-1/2 items-center justify-center gap-4"
    >
      <Button
        color={`${colorCover} hover:shadow-md hover:shadow-black/20`}
        extraStyles={`flex items-center gap-4 text-center text-lg hover:text-black ${
          needPad && "py-2"
        }`}
        textHover={false}
        xSize="w-full"
      >
        {children}
      </Button>
    </Link>
  );
}
