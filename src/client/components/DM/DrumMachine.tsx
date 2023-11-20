import { useState } from "react"    // React hook that let us store the state of a part of a component
import { SoundButton } from "./SoundButton" // Our component that shows a button that plays a sound
import { SOUND_NAMES } from "./soundHub"    // A dictionary that give us the name of the mp3 to play 

export default function DrumMachine() {
    // We start the state of the component as empty, it will show later the name of the mp3 file that was played
    const [display, setDisplay] = useState("")
    return (
        <main className="drum-machine">
            <div className="display-sound-name">
                <p className="sound-name">{display}</p>
            </div>
            <div className="button-zone">
                <SoundButton id={"Q"} sound={SOUND_NAMES.HEATER_1} setDisplay={setDisplay} />
                <SoundButton id={"W"} sound={SOUND_NAMES.HEATER_2} setDisplay={setDisplay} />
                <SoundButton id={"E"} sound={SOUND_NAMES.HEATER_3} setDisplay={setDisplay} />
                <SoundButton id={"A"} sound={SOUND_NAMES.HEATER_4} setDisplay={setDisplay} />
                <SoundButton id={"S"} sound={SOUND_NAMES.CLAP} setDisplay={setDisplay} />
                <SoundButton id={"D"} sound={SOUND_NAMES.OPEN_HH} setDisplay={setDisplay} />
                <SoundButton id={"Z"} sound={SOUND_NAMES.KICKNHAT} setDisplay={setDisplay} />
                <SoundButton id={"X"} sound={SOUND_NAMES.KICK} setDisplay={setDisplay} />
                <SoundButton id={"C"} sound={SOUND_NAMES.CLOSED_HH} setDisplay={setDisplay} />
            </div>
        </main>
    )
}