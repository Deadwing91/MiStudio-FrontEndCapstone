import { useState } from "react"
import { MicSearch } from "./MicSearch"
import { MicList } from "./MicList"


export const MicContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <div className="micLocker">  <div className="room-name">Mic Locker</div>
        <MicSearch setterFunction={setSearchTerms} />
        <MicList searchTermState={searchTerms} />
    </div>
}