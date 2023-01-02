import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"







export const EquipmentForm = () => {
    const { micId } = useParams()
    const [microphone, updateMicrophone] = useState({
        brand: "",
        model: "",
        serialNumber: 0,
        image: ""
    })

    const [micType, setMicTypes] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/microphones/${micId}`)
                .then(response => response.json())
                .then((microphoneArray) => {
                    updateMicrophone(microphoneArray)
                })
            // .then(() => {
            //     fetch(`http://localhost:8088/micTypes`)
            //         .then(response => response.json())
            //         .then((microphoneArray) => {
            //             setMicTypes(microphoneArray)
            //         })
            // })
        },
        []
    )

    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8088/microphones/${micId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(microphone)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Updated!")


            ).then(() => {
                navigate("/MicLocker")
            }
            )
    }


    return (
        <div className="micLocker">
        <form className="profile">
            <div className="profile__title">Update Microphone</div>
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
                                updateMicrophone(copy)
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
                                updateMicrophone(copy)

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
                                updateMicrophone(copy)

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
                                updateMicrophone(copy)

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