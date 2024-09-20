import { FaSearch } from "react-icons/fa";

function Searcher ({change , searchValue}) {
    return (
        <>
            <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                    <FaSearch />
                </span>
                <input 
                    type="text" 
                    className="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-lg" 
                    placeholder="Buscar..."
                    value={searchValue}
                    onChange={e=>change(e.target.value)}
                />
            </div>
        </>
    )
}

export default Searcher