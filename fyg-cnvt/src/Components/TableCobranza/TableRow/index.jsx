import { Spinner } from "react-bootstrap";
import { FaCheckSquare , FaRegCheckSquare ,FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiFilePdf } from "react-icons/pi";
import { SiGoogledocs } from "react-icons/si";
import { TbCashRegister } from "react-icons/tb";
import { API_CNVT, API_GAS } from "../../../Globals/API";

function TableRow({row , edit , openEditor , registroToEdit , reenviarCorreo , setEditorType}) {

    const preFecha = new Date(row.fecha);
    const fecha = new Date(preFecha.getUTCFullYear(), preFecha.getUTCMonth(), preFecha.getUTCDate());

    const valoresSegunModalidad = {
        "P-tarjetas" : row.valorP ,
        "P-Controles" : row.valorPC ,
        "Virtual" : row.valorV ,
        "Mixta" : row.valorM ,
        "selecciona" : 0
    };

    const openSideEditor = (e) => {
        openEditor(true);
        registroToEdit(row);
        setEditorType('Form');
        // console.log(row)
    };

    const openSidePayments = (e) => {
        openEditor(true);
        registroToEdit(row);
        setEditorType('Payment');
    };

    const togglePagado = (e) => {
        const pagoBolean = e.target.checked;
        const response = edit(row.id , {pagado : pagoBolean} , 'checkPago');
        if (!response) {
            e.target.checked = !pagoBolean;
        };
    };

    return (
        <tr key={row.id} className={row.pagado && "table-success"}>
            <td title={`Correo : ${row.email} \nPredios : ${row.predios}`}>{row.cliente}</td>                            
            <td>{row.nit}</td>                            
            <td>{row.modalidad? `$${valoresSegunModalidad[row.modalidad].toLocaleString('es-CO')}` : 'Por definir' }</td>                            
            <td>
                <select 
                    className="form-select form-select-sm" 
                    aria-label=".form-select-sm" 
                    defaultValue={row.modalidad} 
                    onChange={e => {
                        edit(row.id , {modalidad : e.target.value} , 'modalidad')}

                    }
                >
                    <option dafault="true">selecciona</option>
                    <option >P-tarjetas</option>
                    <option >P-Controles</option>
                    <option >Virtual</option>
                    <option >Mixta</option>
                </select>
            </td>                            
            <td>{fecha.toLocaleDateString('es-ES', {month : 'short' , day :'numeric' })}</td>
            <td>
                <select 
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm"
                    defaultValue={row.duracion}
                    onChange={e => {
                        edit(row.id , {duracion : e.target.value} , 'modoCTA')}
                    }
                    title="Selecciona las horas que tuvo la asamblea"
                >
                    <option dafault="true">seleccione</option>
                    <option>-5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                </select>
            </td>
            <td hidden>{row.email}</td>
            <td>
                <select 
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm"
                    defaultValue={row.modoCTA}
                    onChange={e => {
                        edit(row.id , {modoCTA : e.target.value} , 'modoCTA')}
                    }
                >
                    <option dafault="true">selecciona</option>
                    <option dafault="true">50</option>
                    <option dafault="true">100</option>
                </select>
            </td>
            <td>
                <select 
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm"
                    defaultValue={row.remitenteCuenta}
                    onChange={e => {
                        edit(row.id , {remitenteCuenta : e.target.value} , 'remitenteCuenta')}
                    }
                >
                    <option dafault="true">selecciona</option>
                    <option >julian</option>
                    <option >steffan</option>
                </select>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    {row.pdfCuenta ? 
                        (row.pdfCuenta == 'load' ?
                        <Spinner animation="border" variant="secondary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> :
                        
                        <a href={row.pdfCuenta} target="_blank">
                            <PiFilePdf className="pdf-icon fs-4 pointer"/>
                        </a> ) :
                        <a target="_blank">
                            <PiFilePdf className="pdf-icon fs-4 icon-disabled"/>
                        </a> 
                        
                    }
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    {row.docsCuenta ? 
                        (row.docsCuenta === 'load' ?
                        <Spinner animation="border" variant="secondary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> :
                        <a href={row.docsCuenta} target="_blank">
                            <SiGoogledocs className="g-docs-icon fs-4 pointer"/>
                        </a> ):
                        <a target="_blank" title="no hay PDF">
                            <SiGoogledocs className="g-docs-icon fs-4 icon-disabled"/>
                        </a> 
                    }
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-between">
                        <TbCashRegister className="icon-casher fs-4 pointer me-2" onClick={openSidePayments}/>
                        <input type="checkbox" defaultChecked={row.pagado} className="check-payment" onClick={e => togglePagado(e)}/>
                    </div>
                </div>
            </td>
            <td>
                <div className="d-flex justify-content-between">
                    <HiOutlineMail className="icon-msg fs-3 mx-1 pointer" onClick={ e => reenviarCorreo(row , 'cta')}/>
                    <FaRegEdit className="icon-edit fs-4 ms-1 pointer" onClick={openSideEditor}/>
                    <RiDeleteBin6Fill className="icon-del fs-4 mx-1 pointer" onClick={e => {edit(row.id , {aceptado : false} , 'rechazar')}}/>
                </div>
            </td>
        </tr>
    )
}

export default TableRow