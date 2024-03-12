import { Link } from "react-router-dom";
import Button from "./Button";

interface SubButtonDetailsProps {
  children: React.ReactNode;
  buttonColor: string;
  colorGroup: `group-hover/${string}:bg-${string} group-hover/${string}:border-${string}`;
}

export default function SubButtonDetails({
  children,
  buttonColor,
  colorGroup,
}: SubButtonDetailsProps) {
  return (
    <Link
      to="/my-profile"
      className={`mx-auto my-2 flex w-3/4 justify-center pl-4`}
    >
      <Button
        color={`${colorGroup} ${buttonColor}`}
        xSize="w-full"
        extraStyles="flex gap-4 items-center text-black"
      >
        {children}
      </Button>
    </Link>
  );
}
