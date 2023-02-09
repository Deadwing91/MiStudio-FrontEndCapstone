export const StudioMics = ({ microphone, refresh, setRefresh, studio, setStudioMics }) => {


    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to remove equipment from studio?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/studioMics/${microphone.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/studioMics?studioId=${studio.id}`)
                    .then(response => response.json())
                    .then(() => {
                        // setStudioMics(newStudioMics)
                    })
            })
    }




    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div className="brand-model-text" key={`microphone--${microphone?.id}`}>{<img className="item-img" src={`${microphone?.microphone?.image}`} alt="Picture of a microphone" />}
            <div className="edit-delete">
                <button className="btn btn-danger" onClick={(event) => {
                    handleDelete(event)
                    setRefresh(!refresh)
                }}>Remove</button>
            </div>
            </div>
        </div>
    </section>
}