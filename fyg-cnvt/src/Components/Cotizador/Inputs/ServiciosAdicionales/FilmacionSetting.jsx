function FilmacionSetting() {
    return (
        <div className="col-md-4 border-end">
            <div className="input-group">
                <input className="form-control" value="Filmación" disabled/>
                <span className="input-group-text">
                    <input 
                        type="checkbox" 
                        className="form-check-input mt-0" 
                        // onclick="tacharTexto(this)"
                        onChange={e=>e} 
                        name="inputSerFilmacion" 
                        checked
                    />
                </span>
            </div>                      
        </div>
    )
}
export default FilmacionSetting