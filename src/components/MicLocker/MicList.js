import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MicLocker.css"
import { Microphone } from "./Microphones"




export const MicList = ({ searchTermState }) => {
    const [microphones, setMicrophones] = useState([])
    const [micTypes, setMicTypes] = useState([])
    const [filteredMics, setFilteredMics] = useState([])
    const [studio, setStudio] = useState({})
    const [addedMics, setAddedMics] = useState([])
    const navigate = useNavigate()

    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)

    useEffect(
        () => {
            fetch(`http://localhost:8088/microphones`)
                .then(response => response.json())
                .then((microphoneArray) => {
                    setMicrophones(microphoneArray)
                    setFilteredMics(microphoneArray)
                }).then(() => {
                    fetch(`http://localhost:8088/micTypes`)
                        .then(response => response.json())
                        .then((microphoneArray) => {
                            setMicTypes(microphoneArray)
                        })
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((microphoneArray) => {
                    setStudio(microphoneArray[0])
                })
        },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/studioDrums?studioId=${studio.id}`)
            .then(response => response.json())
            .then((microphoneArray) => {
                setAddedMics(microphoneArray)
            })
    }, [studio]);

    useEffect(
        () => {
            const searchedMics = microphones.filter(microphone => {
                return microphone?.model?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredMics(searchedMics)
        },
        [searchTermState]
    )

    const RoomFilter = (event) => {
        event.preventDefault()
        if (parseInt(event.target.value) === 0) {
            const copy = [...microphones]
            setFilteredMics(copy)
        } else {
            const copy = [...microphones]
            const filteredCopy = copy.filter(element => element.micTypeId === parseInt(event.target.value))
            setFilteredMics(filteredCopy)
        }


    }

    return <>
        <div>
            <div className="add-filter">
                <label>
                    <select onChange={(event) => { RoomFilter(event) }} type="micTypes">
                        <option value={0}>All Mic Types</option>
                        {micTypes.map(micType => (<option key={micType.id} value={micType.id}>{micType.type}</option>))}
                    </select>
                </label>




                <button className="btn btn-dark btn-lg" onClick={(click) => { navigate("microphones/add") }}>Add Microphone</button>
            </div>
        </div>







        <article className="microphones">
            {
                filteredMics.map(microphone => <Microphone setFilteredMics={setFilteredMics} setMicrophones={setMicrophones} addedMics={addedMics} key={`microphone--${microphone.id}`}
                    id={microphone.id}
                    studio={studio}
                    brand={microphone.brand}
                    model={microphone.model}
                    serialNumber={microphone.serialNumber}
                    image={microphone.image} />)
            }
        </article>
    </>
}