import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"







export const DrumRoomEquipmentForm = () => {
    const {drumId} = useParams()
    const [drum, updateDrums] = useState({
        brand: "",
        size: "",
        serialNumber: 0,
        image: ""
    })

const [drumType, setDrumRoomTypes] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/drums/${drumId}`)
                .then(response => response.json())
                .then((drumArray) => {
                    updateDrums(drumArray)
                })
                // .then(() => {
                //     fetch(`http://localhost:8088/drumTypes`)
                //         .then(response => response.json())
                //         .then((drumArray) => {
                //             setDrumRoomTypes(drumArray)
                //         })
                // })
        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8088/drums/${drumId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drum)
        })
            .then(response => response.json())
            .then(() =>  window.alert("Successfully Updated!")

            
            ).then(() =>
            {
                navigate("/DrumRoom")}
            )
    }



    return (
        <div className="drumRoom">
        <form className="profile">
            <div className="profile__title">Edit Equipment</div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={drum.brand}
                        onChange={
                            (evt) => {
                                const copy = {...drum}
                                copy.brand = evt.target.value
                                updateDrums(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text"
                        className="form-control"
                        placeholder="Size"
                        value={drum.size}
                        onChange={
                            (evt) => {
                                const copy = {...drum}
                                copy.size = evt.target.value
                                updateDrums(copy)
                            
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text"
                        className="form-control"
                        placeholder="Serial Number"
                        value={drum.serialNumber}
                        onChange={
                            (evt) => {
                                const copy = {...drum}
                                copy.serialNumber = parseInt(evt.target.value)
                                updateDrums(copy)
                            
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Image:</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Image"
                        value={drum.image}
                        onChange={
                            (evt) => {
                                const copy = {...drum}
                                copy.image = evt.target.value
                                updateDrums(copy)
                            
                            }
                        } />
                </div>
            </fieldset>

            <div className="add-edit-buttons">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-dark btn-lg">
                Update Equipment
            </button>
            </div>
        </form>
        </div>
    )
}