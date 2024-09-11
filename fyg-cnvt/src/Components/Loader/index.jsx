import './Loader.css'
function Loader () {
    return (
        <div colSpan="2" className="loader">
            <p className="heading">Cargando datos, espere porfavor</p>
            <div className="loading">
                <div className="load"></div>
                <div className="load"></div>
                <div className="load"></div>
                <div className="load"></div>
            </div>
        </div>
    )
}
export default Loader