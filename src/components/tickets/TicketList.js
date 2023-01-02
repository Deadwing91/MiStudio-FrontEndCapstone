import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Notes } from "./Ticket"
import "./Tickets.css"







export const NoteList = ({ searchTermState }) => {
    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])
    const navigate = useNavigate()




 
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/notes`)
                .then(response => response.json())
                .then((noteArray) => {
                    setNotes(noteArray)
                    setFilteredNotes(noteArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const searchedNotes = notes.filter(note => {
                return note?.description?.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredNotes(searchedNotes)
        },
        [searchTermState]
    )



 

    return <>
    <div className="studioTasks">
    <div className="newTask">
        <button className="btn btn-dark btn-lg" onClick={(click) => {navigate("tasks/add")}}>New Task</button>
        </div>


        <article className="tickets">
           
            {
                filteredNotes.map(note => <Notes setFilteredNotes={setFilteredNotes} setNotes={setNotes} key={`note--${note.id}`}
                    id={note?.id}
                    description={note?.description} />)
                    
            }
            
          
            

        </article>
        </div>
    </>
}