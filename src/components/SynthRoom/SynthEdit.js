import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"







export const SynthEquipmentForm = () => {
    const { synthId } = useParams()
    const [synth, updateSynth] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: ""
    })

    const [synthType, setSynthTypes] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/synths/${synthId}`)
                .then(response => response.json())
                .then((synthArray) => {
                    updateSynth(synthArray)
                })
            // .then(() => {
            //     fetch(`http://localhost:8088/synthTypes`)
            //         .then(response => response.json())
            //         .then((synthArray) => {
            //             setSynthTypes(synthArray)
            //         })
            // })
        },
        []
    )


    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8088/synths/${synthId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(synth)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Updated!")


            ).then(() => {
                navigate("/SynthRoom")
            }
            )
    }



    return (
        <div className="synthRoom">
        <form className="profile">
            <div className="profile__title">Update Synthesizers</div>
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
                                copy.brand = evt.target.value
                                updateSynth(copy)
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
                                updateSynth(copy)

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
                                updateSynth(copy)

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
                        value={synth.image}
                        onChange={
                            (evt) => {
                                const copy = { ...synth }
                                copy.image = (evt.target.value)
                                updateSynth(copy)

                            }
                        } />
                </div>
            </fieldset>

            <div className="add-edit-buttons">
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-dark btn-lg">
                    Update Synthesizer
                </button>
            </div>
        </form>
        </div>
    )
}