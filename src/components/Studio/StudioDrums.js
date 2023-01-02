

export const StudioDrums = ({ drum, refresh, setRefresh }) => {


    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to remove equipment from studio?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/studioDrums/${drum.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/studioDrums`)
                    .then(response => response.json())
                    .then(() => {
                    })
            })
    }




    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div key={`drum--${drum?.id}`}> {<img className="item-img" src={`${drum?.drum?.image}`} alt="Picture of a drum" />}</div>
            <div className="edit-delete">

                <button className="btn btn-danger" onClick={(event) => {
                    handleDelete(event)
                    setRefresh(!refresh)
                }}>Remove</button>
            </div>
        </div>
    </section>



}