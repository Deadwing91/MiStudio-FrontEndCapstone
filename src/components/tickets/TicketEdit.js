import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"







export const NoteEditForm = () => {
    const {noteId} = useParams()
    const [note, updateNote] = useState({
        description: ""
    })

//const [noteType, setNoteTypes] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/notes/${noteId}`)
                .then(response => response.json())
                .then((noteArray) => {
                    updateNote(noteArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()



        return fetch(`http://localhost:8088/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
            .then(response => response.json())
            .then(() =>  window.alert("Successfully Updated")

            
            ).then(() =>
            {
                navigate("/Tasks")}
            )
    }



    return (
        <div className="loginPage">
        <form className="profile">
            <div className="profile__title">Update Note</div>
            <fieldset>
                <div className="form-group">
                    
                    <textarea
                        required autoFocus
                        type="text"
                        className="ticket"
                        value={note.description}
                        rows={4}
                        onChange={
                            (evt) => {
                                const copy = {...note}
                                copy.description = evt.target.value
                                updateNote(copy)
                            }
                        } />
                </div>
            </fieldset>

            <div className="edit-note-buttons">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-dark btn-lg">
                Update Note
            </button>
            </div>
        </form>
        </div>
    )
}