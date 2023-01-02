import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const DrumAdd = () => {


    const [drum, addDrum] = useState({
        brand: "",
        size: "",
        serialNumber: 0,
        image: "",
        drumTypeId: 0
    })

    const [drumType, setDrumTypes] = useState([])


    useEffect(
        () => {

            fetch(`http://localhost:8088/drumTypes`)
                .then(response => response.json())
                .then((drumArray) => {
                    setDrumTypes(drumArray)
                })

        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (click) => {
        click.preventDefault()



        return fetch(`http://localhost:8088/drums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drum)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/DrumRoom")
            }
            )
    }


    return (
        <div className="drumRoom">
        <form className="profile">
            <div className="profile__title">Add to Drum Room</div>
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
                                const copy = { ...drum }
                                copy.brand = evt.target.value
                                addDrum(copy)
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
                                const copy = { ...drum }
                                copy.size = (evt.target.value)
                                addDrum(copy)

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
                        value={drum.serialNumber ? drum.serialNumber : ""}
                        onChange={
                            (evt) => {
                                const copy = { ...drum }
                                copy.serialNumber = parseInt(evt.target.value)
                                addDrum(copy)

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
                        value={drum.image}
                        onChange={
                            (evt) => {
                                const copy = { ...drum }
                                copy.image = (evt.target.value)
                                addDrum(copy)

                            }
                        } />
                </div>
            </fieldset>
            <div className="add-edit-buttons">
                <div className="type_selector">
                    <label>
                        <select onChange={(evt) => {
                            const copy = { ...drum }
                            copy.drumTypeId = parseInt(evt.target.value)
                            addDrum(copy)
                        }} type="guitarTypes">
                            <option value={0}>Drum Type</option>
                            {drumType.map(drumType => (<option key={drumType.id} value={drumType.id}>{drumType.type}</option>))}
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