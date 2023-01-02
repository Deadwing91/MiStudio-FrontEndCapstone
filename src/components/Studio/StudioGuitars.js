


export const StudioGuitars = ({ guitar, id, setGuitars, setRefresh, refresh }) => {


    let userId = localStorage.getItem('honey_user')
    const user = JSON.parse(userId)


    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to remove equipment from studio?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/studioGuitars/${guitar.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/studios?userId`)
                    .then(response => response.json())
                    .then(() => {

                    })
            })

    }






    return <section className="guitar_room">
        <div className="guitar-item-card">
            <div className="brand-model-text" key={`guitar--${guitar?.id}`}> {<img className="item-img" src={`${guitar?.guitar?.image}`} alt="Picture of a guitar" />}

             
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