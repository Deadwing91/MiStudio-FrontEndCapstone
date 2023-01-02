import { useState } from "react"
import { GuitarList } from "./GuitarList"
import { GuitarSearch } from "./GuitarRoomSearch"


export const GuitarRoomContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <div className="guitarRoom">
        <div className="room-name">Guitar Room</div>
        <GuitarSearch setterFunction={setSearchTerms} />
        <GuitarList searchTermState={searchTerms} />
        </div>
}