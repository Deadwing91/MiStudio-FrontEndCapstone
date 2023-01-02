import { useEffect, useState } from "react"
import { StudioDrums } from "./StudioDrums"
import { StudioGuitars } from "./StudioGuitars"
import { StudioMics } from "./StudioMics"
import { StudioSynths } from "./StudioSynths"

export const Studio = () => {

    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)


    const [studio, setStudio] = useState({})
    const [studioGuitars, setStudioGuitars] = useState([])
    const [studioDrums, setStudioDrums] = useState([])
    const [studioMics, setStudioMics] = useState([])
    const [studioSynths, setStudioSynths] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(
        () => {
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((guitarArray) => {
                    setStudio(guitarArray[0])
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((drumArray) => {
                    setStudio(drumArray[0])
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((micArray) => {
                    setStudio(micArray[0])
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((synthArray) => {
                    setStudio(synthArray[0])
                })


        }, []
    )


    useEffect(() => {


        fetch(`http://localhost:8088/studioGuitars?_expand=guitar&studioId${studio.id}`)
            .then(response => response.json())
            .then((guitarArray) => {
                setStudioGuitars(guitarArray)
            })
        fetch(`http://localhost:8088/studioDrums?_expand=drum&studioId${studio.id}`)
            .then(response => response.json())
            .then((guitarArray) => {
                setStudioDrums(guitarArray)
            })
        fetch(`http://localhost:8088/studioMics?_expand=microphone&studioId${studio.id}`)
            .then(response => response.json())
            .then((micArray) => {
                setStudioMics(micArray)
            })
        fetch(`http://localhost:8088/studioSynths?_expand=synth&studioId${studio.id}`)
            .then(response => response.json())
            .then((synthArray) => {
                setStudioSynths(synthArray)
            })


    }, [, refresh]);

    return(
    <div className="studio">
        <article className="room-name">{studio.name} </article>
        {/* <h1>Guitars</h1> */}
        <article className="guitars">
            {
                studioGuitars.map(guitar => <StudioGuitars guitar={guitar} refresh={refresh} setRefresh={setRefresh} key={`guitar--${guitar.id}`} />)
            }
        </article>
        {/* <h1>Drums</h1> */}
        <article className="guitars">
            {
                studioDrums.map(drum => <StudioDrums drum={drum} refresh={refresh} setRefresh={setRefresh} key={`drum--${drum.id}`} />)
            }
        </article>
        {/* <h1>Microphones</h1> */}
        <article className="guitars">
            {
                studioMics.map(microphone => <StudioMics microphone={microphone} refresh={refresh} setRefresh={setRefresh} key={`microphone--${microphone.id}`} />)
            }
        </article>
        {/* <h1>Synthesizers</h1> */}
        <article className="guitars">
            {
                studioSynths.map(synth => <StudioSynths synth={synth} refresh={refresh} setRefresh={setRefresh} key={`synth--${synth.id}`} />)
            }
        </article>

        

    </div>
    


    )
}