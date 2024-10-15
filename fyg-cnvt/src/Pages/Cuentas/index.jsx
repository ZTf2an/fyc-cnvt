import { useContext } from 'react'
import { RegistroContext } from "../../Context";
import Searcher from '../../Components/Searcher'
import TableCobranza from "../../Components/TableCobranza"
import SideMenu from '../../Components/sideEditor';


function Cuentas () {
    const {searchValue , setSearchValue} = useContext(RegistroContext)
    return (
        <>
            <Searcher change={setSearchValue} searchValue={searchValue}/>
            <TableCobranza />
            <SideMenu />
        </>
    )
}

export default Cuentas