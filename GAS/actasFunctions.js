let IdH3 = 0;
let ConjuntoH3 = 1;
let RedactorH3 =2 ;
let TelH3 = 3;
let CorreoH3 = 4 ;
let FechaAsH3 = 5;
let DriveH3 = 6
let DuracionH3 = 7;
let PagoH3 = 8;
let EntregadoH3 = 9;
let PagadoH3 = 10; 

function importarCliente() {
    const ultimaFilaH2 = hoja2.getLastRow();
    const ultimaFilaH3 = hoja3.getLastRow();
    const fechasH2 = hoja2.getRange(3,FECHAASAMBLEAH2+1,ultimaFilaH2-2,1).getValues();
    const idsH2 = hoja2.getRange(3,IDH2+1,ultimaFilaH2-2,1).getValues();
    const idsH3 = hoja3.getRange(2,IdH3+1,ultimaFilaH3-2,1).getValues();
    const hoy = new Date()

    let drh2 = hoja2.getDataRange().getValues();

    fechasH2.forEach((fecha,index) => {
        if ( fecha[0] < hoy) {
            perdidas = 0
            for (var idH3 of idsH3) {
                if (idsH2[index][0] != idH3[0]) {
                    // console.log(idsH2[index][0])
                    perdidas += 1;
        
                    if (perdidas == ultimaFilaH3-2) {
                        // console.log(drh2[index+2])
                        extraerFila(drh2[index+2] , ultimaFilaH3+1);
                        // let range = 
        
                    }
                  } else {
                    perdidas = 0;
                    break
                }          
            }
        }        
    })
}
    
    function extraerFila(lista,fila) {
        // let listaActeros =  

        hoja3.appendRow([ 
            lista[IDH2] , lista[NOMBRECONJUNTOH2] , , , , , lista[CARPETAH2] , lista[DURACIONH2]
        ]);

        let range = hoja3.getRange(fila,1,1,10)
        let ultimafilah4= hoja4.getDataRange().getLastRow();
        let logs =  hoja4.getRange(2,3,ultimafilah4-1).getValues()

        const validacionLogs = SpreadsheetApp.newDataValidation()
        .requireValueInList(logs.flat())
        .setHelpText("Seleccionar Redactor")
        .build();
        
        hoja3.moveRows(range,2);

        hoja3.getRange("J2").insertCheckboxes();
        hoja3.getRange("K2").insertCheckboxes();
        hoja3.getRange("C2").setDataValidation(validacionLogs)
        
    }