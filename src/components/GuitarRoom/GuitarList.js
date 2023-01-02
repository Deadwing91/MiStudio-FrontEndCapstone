import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Guitar } from "./GuitarRoom"
import "./GuitarRoom.css"





export const GuitarList = ({ searchTermState }) => {
    const [guitars, setGuitars] = useState([])
    const [guitarTypes, setGuitarTypes] = useState([])
    const [filteredGuitars, setFilteredGuitars] = useState([])
    const [studio, setStudio] = useState({})
    const [addedGuitars, setAddedGuitars] = useState([])
    const navigate = useNavigate()

    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)

    useEffect(
        () => {
            fetch(`http://localhost:8088/guitars`)
                .then(response => response.json())
                .then((guitarArray) => {
                    setGuitars(guitarArray)
                    setFilteredGuitars(guitarArray)
                }).then(() => {
                    fetch(`http://localhost:8088/guitarRoomTypes`)
                        .then(response => response.json())
                        .then((guitarArray) => {
                            setGuitarTypes(guitarArray)
                        })
                })

            fetch(`http://localhost:8088/studios?userId=${user.id}`)
                .then(response => response.json())
                .then((guitarArray) => {
                    setStudio(guitarArray[0])
                })

        },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/studioGuitars?studioId=${studio.id}`)
        .then(response => response.json())
        .then((guitarArray) => {
            setAddedGuitars(guitarArray)
        })
    }, [studio]);

    // searches items in all filters, regardless of what filter you are in.
    useEffect(
        () => {
            const searchedGuitarRoom = guitars.filter(guitar => {
                return guitar?.model?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredGuitars(searchedGuitarRoom)
        },
        [searchTermState]
    )

    const RoomFilter = (event) => {
        event.preventDefault()
        if (parseInt(event?.target?.value) === 0) {
            const copy = [...guitars]
            setFilteredGuitars(copy)
        } else {
            const copy = [...guitars]
            const filteredCopy = copy.filter(element => element?.guitarRoomTypeId === parseInt(event?.target?.value))
            setFilteredGuitars(filteredCopy)
        }
    }

    return <>
    <div>
        <div className="add-filter">
        <label>
            <select onChange={(event) => { RoomFilter(event) }} type="guitarTypes">
                <option value={0}>All Room Types</option>
                {guitarTypes.map(guitarRoomType => (<option key={guitarRoomType?.id} value={guitarRoomType?.id}>{guitarRoomType?.type}</option>))}
            </select>
        </label>
        



        <button onClick={(click) => { navigate("guitars/add") }} className="btn btn-dark btn-lg">Add Equipment</button>
        </div>
        </div>




        <article className="guitars">
            {
                filteredGuitars.map(guitar => <Guitar setFilteredGuitars={setFilteredGuitars} setGuitars={setGuitars} addedGuitars={addedGuitars} key={`guitar--${guitar.id}`}
                    id={guitar?.id}
                    studio={studio}
                    guitarRoomTypeId={guitar?.guitarRoomTypeId}
                    brand={guitar?.brand}
                    model={guitar?.model}
                    serialNumber={guitar?.serialNumber}
                    image={guitar?.image} />)
            }
        </article>
    </>
}