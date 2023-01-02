export const GuitarSearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search Guitar Room" />
        </div>
        
    )
}