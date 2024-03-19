interface NumberBoxProps {
  name: string;
  letter?: string;
  number?: string;
  id?: string;
}

const BORDERS = {
  "1": {
    A: "border-t-4 border-l-4",
    B: "border-t-4",
    C: "border-t-4 border-r-4",
    D: "border-t-4 border-l-4",
    E: "border-t-4",
    F: "border-t-4 border-l-4",
    G: "border-t-4 border-l-4",
    H: "border-t-4",
    I: "border-t-4 border-l-4",
  },
  "2": {
    A: "border-l-4",
    B: "",
    C: "border-r-4",
    D: "border-l-4",
    E: "",
    F: "border-r-4",
    G: "border-l-4",
    H: "",
    I: "border-r-4",
  },
  "3": {
    A: "border-b-4 border-l-4",
    B: "border-b-4",
    C: "border-b-4 border-r-4",
    D: "border-b-4 border-l-4",
    E: "border-b-4",
    F: "border-b-4 border-r-4",
    G: "border-b-4 border-l-4",
    H: "border-b-4",
    I: "border-b-4 border-r-4",
  },
  "4": {
    A: "border-t-4 border-l-4",
    B: "border-t-4",
    C: "border-t-4 border-r-4",
    D: "border-t-4 border-l-4",
    E: "border-t-4",
    F: "border-t-4 border-l-4",
    G: "border-t-4 border-l-4",
    H: "border-t-4",
    I: "border-t-4 border-l-4",
  },
  "5": {
    A: "border-l-4",
    B: "",
    C: "border-r-4",
    D: "border-l-4",
    E: "",
    F: "border-r-4",
    G: "border-l-4",
    H: "",
    I: "border-r-4",
  },
  "6": {
    A: "border-b-4 border-l-4",
    B: "border-b-4",
    C: "border-b-4 border-r-4",
    D: "border-b-4 border-l-4",
    E: "border-b-4",
    F: "border-b-4 border-r-4",
    G: "border-b-4 border-l-4",
    H: "border-b-4",
    I: "border-b-4 border-r-4",
  },
  "7": {
    A: "border-t-4 border-l-4",
    B: "border-t-4",
    C: "border-t-4 border-r-4",
    D: "border-t-4 border-l-4",
    E: "border-t-4",
    F: "border-t-4 border-l-4",
    G: "border-t-4 border-l-4",
    H: "border-t-4",
    I: "border-t-4 border-l-4",
  },
  "8": {
    A: "border-l-4",
    B: "",
    C: "border-r-4",
    D: "border-l-4",
    E: "",
    F: "border-r-4",
    G: "border-l-4",
    H: "",
    I: "border-r-4",
  },
  "9": {
    A: "border-b-4 border-l-4",
    B: "border-b-4",
    C: "border-b-4 border-r-4",
    D: "border-b-4 border-l-4",
    E: "border-b-4",
    F: "border-b-4 border-r-4",
    G: "border-b-4 border-l-4",
    H: "border-b-4",
    I: "border-b-4 border-r-4",
  },
};

const BLOCKS = {
  A: {
    "1": "border-yellow-500 bg-yellow-100",
    "2": "border-yellow-500 bg-yellow-100",
    "3": "border-yellow-500 bg-yellow-100",
    "4": "border-lime-500 bg-lime-100",
    "5": "border-lime-500 bg-lime-100",
    "6": "border-lime-500 bg-lime-100",
    "7": "border-purple-500 bg-purple-100",
    "8": "border-purple-500 bg-purple-100",
    "9": "border-purple-500 bg-purple-100",
  },
  B: {
    "1": "border-yellow-500 bg-yellow-100",
    "2": "border-yellow-500 bg-yellow-100",
    "3": "border-yellow-500 bg-yellow-100",
    "4": "border-lime-500 bg-lime-100",
    "5": "border-lime-500 bg-lime-100",
    "6": "border-lime-500 bg-lime-100",
    "7": "border-purple-500 bg-purple-100",
    "8": "border-purple-500 bg-purple-100",
    "9": "border-purple-500 bg-purple-100",
  },
  C: {
    "1": "border-yellow-500 bg-yellow-100",
    "2": "border-yellow-500 bg-yellow-100",
    "3": "border-yellow-500 bg-yellow-100",
    "4": "border-lime-500 bg-lime-100",
    "5": "border-lime-500 bg-lime-100",
    "6": "border-lime-500 bg-lime-100",
    "7": "border-purple-500 bg-purple-100",
    "8": "border-purple-500 bg-purple-100",
    "9": "border-purple-500 bg-purple-100",
  },
};

export default function NumberBox({
  name,
  letter,
  number,
  id,
}: NumberBoxProps) {
  const coordLetter = name.substring(0, 1);
  const coordNumber = name.substring(1);
  const blockKey = coordLetter as keyof typeof BLOCKS;
  const borderKey = coordNumber as keyof typeof BORDERS;

  return (
    <div className="relative h-10 w-10">
      {"ABCDEFGHI".includes(coordLetter) && (
        <p className="absolute -top-7 left-3.5 text-2xl">{letter}</p>
      )}
      {"12345678".includes(coordNumber) && (
        <p className="absolute -left-4 bottom-2 text-2xl">{number}</p>
      )}
      <input
        type="text"
        className={`h-10 w-10 pb-3 pl-3 pr-0 text-2xl invalid:border-red-500 invalid:bg-red-100 focus:invalid:ring-red-500 ${BLOCKS[blockKey][borderKey]} ${BORDERS[borderKey][blockKey]}`}
        autoComplete="none"
        maxLength={1}
        minLength={0}
        pattern="^[0-9]$"
        name={name}
        id={id}
      />
    </div>
  );
}
