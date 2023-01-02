export const SynthSearch = ({ setterFunction }) => {
    return (
        <div className="search">
            <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search Synth Room" />
        </div>
        
    )
}