import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SynthRoom.css"
import { Synth } from "./Synths"





export const SynthList = ({ searchTermState }) => {
    const [synths, setSynths] = useState([])
    const [synthTypes, setSynthTypes] = useState([])
    const [filteredSynths, setFilteredSynths] = useState([])
    const [studio, setStudio] = useState({})
    const [addedSynths, setAddedSynths] = useState([])
    const navigate = useNavigate()


    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)



    useEffect(
        () => {
            fetch(`http://localhost:8088/synths`)
                .then(response => response.json())
                .then((synthArray) => {
                    setSynths(synthArray)
                    setFilteredSynths(synthArray)
                }).then(() => {
                    fetch(`http://localhost:8088/synthTypes`)
                        .then(response => response.json())
                        .then((synthArray) => {
                            setSynthTypes(synthArray)
                        })
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((synthArray) => {
                    setStudio(synthArray[0])
                })
        },
        []
    )

    useEffect(
        () => {
            const searchedSynths = synths.filter(synth => {
                return synth?.model?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredSynths(searchedSynths)
        },
        [searchTermState]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/studioDrums?studioId=${studio.id}`)
            .then(response => response.json())
            .then((synthArray) => {
                setAddedSynths(synthArray)
            })
    }, [studio]);

    const RoomFilter = (event) => {
        event.preventDefault()
        if (parseInt(event.target.value) === 0) {
            const copy = [...synths]
            setFilteredSynths(copy)
        } else {
            const copy = [...synths]
            const filteredCopy = copy.filter(element => element.synthTypeId === parseInt(event.target.value))
            setFilteredSynths(filteredCopy)
        }
    }



    return <>
        <div>
            <div className="add-filter">
                <label>
                    <select onChange={(event) => { RoomFilter(event) }} type="synthTypes">
                        <option value={0}>All Synth Types</option>
                        {synthTypes.map(synthType => (<option key={synthType.id} value={synthType.id}>{synthType.type}</option>))}
                    </select>
                </label>

                <button className="btn btn-dark btn-lg" onClick={(click) => { navigate("synths/add") }}>Add Synthesizer</button>
            </div>
        </div>


        <article className="synths">

            {
                filteredSynths.map(synth => <Synth setFilteredSynths={setFilteredSynths} setSynths={setSynths} addedSynths={addedSynths} key={`synth--${synth.id}`}
                    id={synth?.id}
                    studio={studio}
                    brand={synth?.brand}
                    model={synth?.model}
                    serialNumber={synth?.serialNumber}
                    image={synth?.image} />)

            }




        </article>
    </>
}