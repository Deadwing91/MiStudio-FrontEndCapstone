export const DrumSearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search Drum Room" />
        </div>
        
    )
}