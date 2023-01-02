import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Drum } from "./DrumRoom"
import "./DrumRoom.css"





export const DrumList = ({ searchTermState }) => {
    const [drums, setDrums] = useState([])
    const [drumTypes, setDrumTypes] = useState([])
    const [filteredDrums, setFilteredDrums] = useState([])
    const [studio, setStudio] = useState({})
    const [addedDrums, setAddedDrums] = useState([])
    const navigate = useNavigate()

    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)



    useEffect(
        () => {
            fetch(`http://localhost:8088/drums`)
                .then(response => response.json())
                .then((drumArray) => {
                    setDrums(drumArray)
                    setFilteredDrums(drumArray)
                }).then(() => {
                    fetch(`http://localhost:8088/drumTypes`)
                        .then(response => response.json())
                        .then((drumArray) => {
                            setDrumTypes(drumArray)
                        })
                })
            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((drumArray) => {
                    setStudio(drumArray[0])
                })
        },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/studioDrums?studioId=${studio.id}`)
            .then(response => response.json())
            .then((drumArray) => {
                setAddedDrums(drumArray)
            })
    }, [studio]);


    useEffect(
        () => {
            const searchedDrums = drums.filter(drum => {
                return drum?.size?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredDrums(searchedDrums)
        },
        [searchTermState]
    )


    const RoomFilter = (event) => {
        event.preventDefault()
        if (parseInt(event.target.value) === 0) {
            const copy = [...drums]
            setFilteredDrums(copy)
        } else {
            const copy = [...drums]
            const filteredCopy = copy.filter(element => element.drumTypeId === parseInt(event.target.value))
            setFilteredDrums(filteredCopy)
        }
    }




    return <>
        <div>
            <div className="add-filter">
                <label>
                    <select onChange={(event) => { RoomFilter(event) }} type="drumTypes">
                        <option value={0}>All Drum Types</option>
                        {drumTypes.map(drumTypes => (<option key={drumTypes.id} value={drumTypes.id}>{drumTypes.type}</option>))}
                    </select>
                </label>


                <button className="btn btn-dark btn-lg" onClick={(click) => { navigate("drums/add") }}>Add Equipment</button>
            </div>
        </div>



        <article className="drums">
            {
                filteredDrums.map(drum => <Drum setFilteredDrums={setFilteredDrums} setDrums={setDrums} addedDrums={addedDrums} key={`drum--${drum.id}`}
                    id={drum?.id}
                    studio={studio}
                    drumTypeId={drum?.drumTypeId}
                    brand={drum?.brand}
                    size={drum?.size}
                    serialNumber={drum?.serialNumber}
                    image={drum?.image} />)
            }
        </article>

    </>
}