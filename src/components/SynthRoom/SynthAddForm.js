import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const SynthAdd = () => {


    const [synth, addSynth] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: "",
        synthTypeId: 0
    })

    const [synthType, setSynthTypes] = useState([])


    useEffect(
        () => {

            fetch(`http://localhost:8088/synthTypes`)
                .then(response => response.json())
                .then((synthArray) => {
                    setSynthTypes(synthArray)
                })

        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (click) => {
        click.preventDefault()



        return fetch(`http://localhost:8088/synths`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(synth)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/SynthRoom")
            }
            )
    }


    return (
        <div className="synthRoom">
        <form className="profile">
            <div className="profile__title">Add to Synthesizer Room</div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={synth.brand}
                        onChange={
                            (evt) => {
                                const copy = { ...synth }
                                copy.brand = (evt.target.value)
                                addSynth(copy)
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
                        value={synth.model}
                        onChange={
                            (evt) => {
                                const copy = { ...synth }
                                copy.model = (evt.target.value)
                                addSynth(copy)

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
                        value={synth.serialNumber ? synth.serialNumber : ""}
                        onChange={
                            (evt) => {
                                const copy = { ...synth }
                                copy.serialNumber = parseInt(evt.target.value)
                                addSynth(copy)

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
                        value={synth.image}
                        onChange={
                            (evt) => {
                                const copy = { ...synth }
                                copy.image = (evt.target.value)
                                addSynth(copy)

                            }
                        } />
                </div>
            </fieldset>
            <div className="add-edit-buttons">
                <div className="type_selector">
                    <label>
                        <select onChange={(evt) => {
                            const copy = { ...synth }
                            copy.synthTypeId = parseInt(evt.target.value)
                            addSynth(copy)
                        }} type="synthTypes">
                            <option value={0}>Synth Type</option>
                            {synthType.map(synthType => (<option key={synthType.id} value={synthType.id}>{synthType.type}</option>))}
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