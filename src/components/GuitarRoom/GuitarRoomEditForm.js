import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"







export const GuitarRoomEquipmentForm = () => {
    const { guitarId } = useParams()
    const [guitar, updateGuitars] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: ""
    })

    const [guitarType, setGuitarRoomTypes] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/guitars/${guitarId}`)
                .then(response => response.json())
                .then((guitarArray) => {
                    updateGuitars(guitarArray)
                })
            // .then(() => {
            //     fetch(`http://localhost:8088/guitarTypes`)
            //         .then(response => response.json())
            //         .then((guitarArray) => {
            //             setGuitarRoomTypes(guitarArray)
            //         })
            // })
        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8088/guitars/${guitarId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guitar)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Updated!")


            ).then(() => {
                navigate("/GuitarRoom")
            }
            )
    }



    return (
        <div className="guitarRoom">
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
                            value={guitar.brand}
                            onChange={
                                (evt) => {
                                    const copy = { ...guitar }
                                    copy.brand = evt.target.value
                                    updateGuitars(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input type="text"
                            className="form-control"
                            placeholder="Model"
                            value={guitar.model}
                            onChange={
                                (evt) => {
                                    const copy = { ...guitar }
                                    copy.model = evt.target.value
                                    updateGuitars(copy)

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
                            value={guitar.serialNumber ? guitar.serialNumber : ""}
                            onChange={
                                (evt) => {
                                    const copy = { ...guitar }
                                    copy.serialNumber = parseInt(evt.target.value)
                                    updateGuitars(copy)

                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input type="text"
                            className="form-control"
                            placeholder="Image"
                            value={guitar.image}
                            onChange={
                                (evt) => {
                                    const copy = { ...guitar }
                                    copy.image = evt.target.value
                                    updateGuitars(copy)

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