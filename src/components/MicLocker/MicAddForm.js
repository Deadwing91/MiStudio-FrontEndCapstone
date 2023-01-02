import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const MicrophoneAdd = () => {


    const [microphone, addMicrophone] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: "",
        micTypeId: 0
    })

    const [micType, setMicTypes] = useState([])


    useEffect(
        () => {

            fetch(`http://localhost:8088/micTypes`)
                .then(response => response.json())
                .then((microphoneArray) => {
                    setMicTypes(microphoneArray)
                })

        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (click) => {
        click.preventDefault()



        return fetch(`http://localhost:8088/microphones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(microphone)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/MicLocker")
            }
            )
    }


    return (
        <div className="micLocker">
        <form className="profile">
            <div className="profile__title">Add To Mic Locker</div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={microphone.brand}
                        onChange={
                            (evt) => {
                                const copy = { ...microphone }
                                copy.brand = evt.target.value
                                addMicrophone(copy)
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
                        value={microphone.model}
                        onChange={
                            (evt) => {
                                const copy = { ...microphone }
                                copy.model = (evt.target.value)
                                addMicrophone(copy)

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
                        value={microphone.serialNumber ? microphone.serialNumber : ""}
                        onChange={
                            (evt) => {
                                const copy = { ...microphone }
                                copy.serialNumber = parseInt(evt.target.value)
                                addMicrophone(copy)

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
                        value={microphone.image}
                        onChange={
                            (evt) => {
                                const copy = { ...microphone }
                                copy.image = (evt.target.value)
                                addMicrophone(copy)

                            }
                        } />
                </div>
            </fieldset>
            <div className="add-edit-buttons">
                <div className="type_selector">
                    <label>
                        <select onChange={(evt) => {
                            const copy = { ...microphone }
                            copy.micTypeId = parseInt(evt.target.value)
                            addMicrophone(copy)
                        }} type="micTypes">
                            <option value={0}>Microphone Type</option>
                            {micType.map(micType => (<option key={micType.id} value={micType.id}>{micType.type}</option>))}
                        </select>
                    </label>
                    </div>
                <div>

                    <button
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-dark btn-lg">
                        Add Microphone
                    </button>
                </div>
            </div>
        </form>
        </div>
    )
}