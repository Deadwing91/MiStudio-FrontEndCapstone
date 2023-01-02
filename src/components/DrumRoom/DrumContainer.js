import { useState } from "react"
import { DrumList } from "./DrumList"
import { DrumSearch } from "./DrumSearch"

export const DrumContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <div className="drumRoom"> <div className="room-name">Drum Room</div>
        <DrumSearch setterFunction={setSearchTerms} />
        <DrumList searchTermState={searchTerms} />
    </div>
}