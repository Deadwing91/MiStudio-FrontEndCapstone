import { useNavigate } from "react-router-dom"

export const Notes = ({ description, dateCompleted, id, setNotes, setFilteredNotes }) => {
    const navigate = useNavigate()
    const handleEdit = (click, noteId) => {
        click.preventDefault()
        navigate(`/notes/edit/${noteId}`)
    }

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to delete studio task?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/notes/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/notes`)
                    .then(response => response.json())
                    .then((noteArray) => {
                        setNotes(noteArray)
                        setFilteredNotes(noteArray)

                    })
            })
    }

    return (
        
            <section className="ticket">
                <div>
                    <div>{description}</div>
                    {/* <div>Date Completed: {dateCompleted}</div> */}
                </div>
                <div>
                    <button className="btn btn-dark" onClick={(click) => handleEdit(click, id)}>Edit</button>
                    <button className="btn btn-danger" onClick={(event) => (handleDelete(event))}>Delete</button>
                </div>
            </section>
    )
}