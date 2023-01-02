export const StudioSynths = ({ synth, refresh, setRefresh }) => {

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to remove equipment from studio?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/studioSynths/${synth.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/studioSynths`)
                    .then(response => response.json())
                    .then(() => {
                    })
            })
    }




    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div key={`synth--${synth?.id}`}>
                {<img className="item-img" src={`${synth?.synth?.image}`} alt="Picture of a synth" />}</div>
            <div className="edit-delete">
                <button className="btn btn-danger" onClick={(event) => {
                    handleDelete(event)
                    setRefresh(!refresh)
                }}>Remove</button>
            </div>
        </div>
    </section>
}