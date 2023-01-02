import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Microphone = ({ model, brand, serialNumber, image, id, studio, setMicrophones, setFilteredMics }) => {
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate()
    const handleEdit = (click, microphoneId) => {
        click.preventDefault()
        navigate(`/microphones/edit/${microphoneId}`)
    }

    const handleAddToStudio = (event, studio) => {
        event.preventDefault()
        const payload = {
            studioId: studio.id,
            microphoneId: id
        }

        return fetch(`http://localhost:8088/studioMics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    }

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to delete equipment?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/microphones/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/microphones`)
                    .then(response => response.json())
                    .then((microphoneArray) => {
                        setMicrophones(microphoneArray)
                        setFilteredMics(microphoneArray)
                    })
            })
    }

    const handleChecked = (event) => {
        if (window.confirm("Are you sure you want to add to studio?")) {
            return handleAddToStudio(event, studio)
                .then(() => { setIsChecked(true) })
        }

    }

    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div className="brand-model-text">
                <img className="item-img" src={`${image}`} alt="Picture of a microphone" />
                <div>{brand} {model}</div>
                <div>SN# {serialNumber}</div>
            </div>
            <label className="card-buttons">
                {/* <input checked={addedGuitars?.find(guitar => guitar?.guitarId === id)} onChange={(event) => handleAddToStudio(event, studio)} type="checkbox" /> */}
                <input checked={isChecked} onChange={(event) => handleChecked(event)} type="checkbox" />
                Add to studio
            </label>
            <label>
                <div className="edit-delete">
                    <button className="btn btn-dark" onClick={(click) => handleEdit(click, id)}>Edit</button>
           
                    <button className="btn btn-danger" onClick={(event) => (handleDelete(event))}>Delete</button>
                </div>
            </label>
        </div>

    </section >
}