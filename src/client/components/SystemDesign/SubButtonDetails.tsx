import { Link } from "react-router-dom";
import Button from "./Button";

interface SubButtonDetailsProps {
  children: React.ReactNode;
  colorGroup: `group-hover/${string}:bg-${string} group-hover/${string}:border-${string}`;
  toLinkRoute: string;
}

export default function SubButtonDetails({
  children,
  colorGroup,
  toLinkRoute,
}: SubButtonDetailsProps) {
  return (
    <Link
      to={toLinkRoute}
      className={`flex w-1/2 items-center justify-center gap-4`}
    >
      <Button
        color={`${colorGroup}`}
        xSize="w-full"
        extraStyles="flex gap-4 items-center"
        textHover={false}
      >
        {children}
      </Button>
    </Link>
  );
}
