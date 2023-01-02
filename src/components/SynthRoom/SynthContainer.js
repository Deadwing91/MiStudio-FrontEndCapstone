
import { useState } from "react"
import { SynthList } from "./SynthList"
import { SynthSearch } from "./SynthSearch"



export const SynthContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <div className="synthRoom">  
        <div className="room-name">Synthesizer Room</div>
        <SynthSearch setterFunction={setSearchTerms} />
        <SynthList searchTermState={searchTerms} />
    </div>
}