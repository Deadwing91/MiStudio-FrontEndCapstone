

export const StudioDrums = ({ drum, refresh, setRefresh, studio, setStudioDrums }) => {

    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to remove equipment from studio?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        

        fetch(`http://localhost:8088/studioDrums/${drum.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/studioDrums?studioId=${studio.id}`)
                    .then(response => response.json())
                    .then(() => {
                        // setStudioDrums(newStudioDrums)
                    })
            })
    }




    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div className="brand-model-text" key={`drum--${drum?.id}`}> {<img className="item-img" src={`${drum?.drum?.image}`} alt="Picture of a drum" />}
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