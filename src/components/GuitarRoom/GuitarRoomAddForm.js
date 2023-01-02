import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const GuitarAdd = () => {


    const [guitar, addGuitar] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: "",
        guitarRoomTypeId: 0
    })

    const [guitarType, setGuitarTypes] = useState([])


    useEffect(
        () => {

            fetch(`http://localhost:8088/guitarRoomTypes`)
                .then(response => response.json())
                .then((guitarArray) => {
                    setGuitarTypes(guitarArray)
                })

        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (click) => {
        click.preventDefault()



        return fetch(`http://localhost:8088/guitars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guitar)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/GuitarRoom")
            }
            )
    }


    return (
        <div className="guitarRoom">
            <form className="profile">
                <div className="profile__title">Add to Guitar Room</div>
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
                                    copy.brand = (evt.target.value)
                                    addGuitar(copy)
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
                                    copy.model = (evt.target.value)
                                    addGuitar(copy)

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
                                    addGuitar(copy)

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
                                    copy.image = (evt.target.value)
                                    addGuitar(copy)

                                }
                            } />
                    </div>
                </fieldset>

                <div className="add-edit-buttons">
                    <div className="type_selector">
                        <label>
                            <select onChange={(evt) => {
                                const copy = { ...guitar }
                                copy.guitarRoomTypeId = parseInt(evt.target.value)
                                addGuitar(copy)
                            }} type="guitarTypes">
                                <option value={0}>Equipment Type</option>
                                {guitarType.map(guitarType => (<option key={guitarType.id} value={guitarType.id}>{guitarType.type}</option>))}
                            </select>
                        </label>
                    </div>
                    <div>

                        <button
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className="btn btn-dark btn-lg">
                            Add Equipment
                        </button>
                    </div>
                </div>
            </form>
            </div>
    )
}