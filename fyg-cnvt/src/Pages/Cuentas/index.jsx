import { useContext } from 'react'
import { RegistroContext } from "../../Context";
import Searcher from '../../Components/Searcher'
import TableCobranza from "../../Components/TableCobranza"


function Cuentas () {
    const {searchValue , setSearchValue} = useContext(RegistroContext)
    return (
        <>
            <Searcher change={setSearchValue} searchValue={searchValue}/>
            <TableCobranza />
        </>
    )
}

export default Cuentas