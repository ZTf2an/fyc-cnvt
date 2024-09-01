import TableRegistro from "../../Components/TableRegistro";
import Searcher from "../../Components/Searcher";
import Layout from "../../Components/Layout";

function Registro ({data}) {
    return (
        <>
            <Layout >
                <Searcher />
                <TableRegistro />
            </Layout>
        </>
    )
}

export default Registro