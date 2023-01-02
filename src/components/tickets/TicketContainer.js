import { useState } from "react"
import { NoteList } from "./TicketList"
//import { NoteSearch } from "./TicketSearch"

export const NoteContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <div className="loginPage">
     <div className="room-name">Studio Tasks</div>
       
        <NoteList searchTermState={searchTerms} />
        </div>
    </>
}

//<NoteSearch setterFunction={setSearchTerms} />
