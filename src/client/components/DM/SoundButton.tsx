import { useEffect } from "react"; // React hook to run code depending on changes
import { soundFiles } from "./soundHub"; // Import all the files to play later on

// Interface to validate the type of the props that our component gets
interface Props {
  id: string;
  sound: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export function SoundButton({ id, sound, setDisplay }: Props) {
  // Function that is in charge to play the sound of the button pressed or activated
  const playSound = () => {
    // We get the file that matches the id of the button sound
    const soundToPlay = soundFiles.filter(file => {
      const path = file.split("/");
      const mp3 = path[path.length - 1].split(".")[0];
      if (mp3 === sound) return true;
      return false;
    });
    // Create a new audio element and the play it, lastly, we display the name of the file
    const buttonAudio = new Audio(soundToPlay[0]);
    buttonAudio.play();
    setDisplay(sound);
  };

  // Function that manages the "keydown" event
  const handleKeyDown = (e: KeyboardEvent) => {
    // If user pressed a key that matches an ID button, we play the corresponding sound
    if (e.key.toUpperCase() === id) {
      playSound();
    }
  };

  // Function that handles the user's click on the button, play the corresponding sound
  const handleClick = () => {
    playSound();
  };

  // We need to listen to the user action in the keyboard, so we add a listener when the
  // component mounts, we remove the listener when the component unmounts
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Return the button that user will be able to interact with
  return (
    <button
      id={id}
      onClick={handleClick}
      className="h-8 w-8 bg-slate-200 bg-gradient-to-b from-slate-400 via-transparent via-10% shadow-sm shadow-black active:bg-slate-600 active:from-transparent active:text-white active:shadow-none active:brightness-90 md:h-9 md:w-9 xl:h-11 xl:w-11"
    >
      {id}
    </button>
  );
}
