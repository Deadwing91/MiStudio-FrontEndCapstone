import { useState } from "react"
import { useNavigate } from "react-router-dom"




export const NewNote = () => {
  

    const [note, newNote] = useState({
        description: "",

    })




    const navigate = useNavigate()


    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    const handleSaveButtonClick = (click) => {
        click.preventDefault()


        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: note.description,
            dateCompleted: ""
        }
       
      

        return fetch(`http://localhost:8088/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(response => response.json())
            .then(() =>  window.alert("New Task Added")
            
            ).then(() =>
            {
                navigate("/Tasks")}
            )
    }


    return (
        <div className="taskCreate">
        <form className="profile">
            <div className="profile__title">Create New Task</div>
            <fieldset>
                <div className="form-group">
                    
                    <label htmlFor="specialty"></label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="ticket"
                        placeholder="Enter Text"
                        value={note.description}
                        rows={4}
                        onChange={
                            (evt) => {
                                const copy = { ...note }
                                copy.description = evt.target.value
                                newNote(copy)
                            }
                        } />
                        
                </div>
            </fieldset>
                        <div className="note-button">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-dark btn-lg">
                Create Note
            </button>
            </div>
        </form>
        </div>
    )
}