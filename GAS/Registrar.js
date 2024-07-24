function generarCotizacion() {
    const [header,...data ] = SHEET_COTIZACIONES.getDataRange().getValues();
  
    data.forEach( (registroCotizacion, index) => {
      /*console.log(registroCertificado[GENERADO])*/
      if (registroCotizacion[GENERADO] === false) {
        llenarPlantillas(registroCotizacion, index);     
      }
      
    })
  }
  function llenarPlantillas( infoCotizacion, index) {  
    
    if (infoCotizacion[M_VIRTUAL] != "" && infoCotizacion[M_PRESENCIAL] == "" && infoCotizacion[M_MIXTA] == "") {
     llenarPlantilla(infoCotizacion, index, TEMPLATE_ID_V);
    };
    if (infoCotizacion[M_VIRTUAL] == "" && infoCotizacion[M_PRESENCIAL] != "" && infoCotizacion[M_MIXTA] == "") {
      llenarPlantilla(infoCotizacion,index, TEMPLATE_ID_P);
    };
    if (infoCotizacion[M_VIRTUAL] == "" && infoCotizacion[M_PRESENCIAL] == "" && infoCotizacion[M_MIXTA] != "") {
      llenarPlantilla(infoCotizacion, index, TEMPLATE_ID_M);
    };
    if (infoCotizacion[M_VIRTUAL] != "" && infoCotizacion[M_PRESENCIAL] != "" && infoCotizacion[M_MIXTA] == "") {
      llenarPlantilla(infoCotizacion,index, TEMPLATE_ID_VP);
    };
    if (infoCotizacion[M_VIRTUAL] != "" && infoCotizacion[M_PRESENCIAL] == "" && infoCotizacion[M_MIXTA] != "") {
      llenarPlantilla(infoCotizacion,index, TEMPLATE_ID_VM);
    };
    if (infoCotizacion[M_VIRTUAL] == "" && infoCotizacion[M_PRESENCIAL] != "" && infoCotizacion[M_MIXTA] != "") {
      llenarPlantilla(infoCotizacion, index, TEMPLATE_ID_PM);
    };
    if (infoCotizacion[M_VIRTUAL] != "" && infoCotizacion[M_PRESENCIAL] != "" && infoCotizacion[M_MIXTA] != "") {
      llenarPlantilla(infoCotizacion, index, TEMPLATE_ID_VPM);
    };  
    
  }
  function llenarPlantilla( infoCotizacion, index, templateId) {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const template = DriveApp.getFileById(templateId);
    const logs = calcularLogs(infoCotizacion[PREDIOS])
    const valorPresencial = infoCotizacion[PRECIO] + infoCotizacion[VAPRESENCIAL];
    const valorMixta = infoCotizacion[PRECIO] + infoCotizacion[VAMIXTA];
    const copy = template.makeCopy().moveTo(folder).setName('COTIZACIÓN ' + infoCotizacion[NOMBRECONJUNTO]);
    const copyId = copy.getId();
    const copyUrl = copy.getUrl();
    const documentoCotizacion = DocumentApp.openById(copyId);
  
    const body = documentoCotizacion.getBody();
    const header = documentoCotizacion.getHeader();
    header.replaceText('{FECHA}', Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy"));
    body.replaceText('{CONJUNTO}', infoCotizacion[NOMBRECONJUNTO]);
    body.replaceText('{numlogs}', logs)
    body.replaceText('{PRECIO_V}', infoCotizacion[PRECIO].toLocaleString('es-CO'));
    body.replaceText('{PRECIO_P}', valorPresencial.toLocaleString('es-CO'));
    body.replaceText('{PRECIO_M}', valorMixta.toLocaleString('es-CO'))
    body.replaceText('{VAVIRTUAL}', infoCotizacion[VAVIRTUAL].toLocaleString('es-CO'));
    if (infoCotizacion[DES] == "") {
        body.replaceText("{ifdesc	VALOR		$ {PRECIO_Vdes} }","")
    }
    documentoCotizacion.saveAndClose();
    
    const row = index + 2;
    crearPdf(documentoCotizacion, row, infoCotizacion);
      
    SHEET_COTIZACIONES.getRange(row, GENERADO+1).insertCheckboxes().setValue(true);
    SHEET_COTIZACIONES.getRange(row, DOCS+1).setValue(copyUrl);
    SHEET_COTIZACIONES.getRange(row, ACEPTA+1).insertCheckboxes().setValue(false);
    
  }
  function crearPdf(documentoCotizacion, row, infoCotizacion) {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const pdf = documentoCotizacion.getAs('application/pdf').setName('COTIZACIÓN ' + infoCotizacion[NOMBRECONJUNTO]+'.pdf');
    const pdfId = pdf.getId
    const pdfCreado = folder.createFile(pdf);
    const pdfUrl = pdfCreado.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW).getUrl();
  
    SHEET_COTIZACIONES.getRange(row, GENERADO+2).setValue(pdfUrl);
    if (infoCotizacion[MODOEMAIL] == 'Automatico') {
      enviarCorreo(infoCotizacion, pdfUrl);  
    }
  }
  function enviarCorreo(infoCotizacion, pdfUrl) {
    mailBody = "<p>Apreciad@ Sr@ Administrador@.</p>";
    mailBody += infoCotizacion[NOMBRECONJUNTO]+"<br>";
    mailBody += "<p>Enviamos Cotizacion Solicitada</p>";
    mailBody += `<p>La Cotización enviada está por la cantidad de ${infoCotizacion[PREDIOS]} predios o inmuebles,</p>`;
    mailBody += "<p>Si esta cantidad es incorrecta, es posible que su cotización cambie de valor.</p>"
    mailBody += "<p> Por favor confirmar con anticipación</p>";
    mailBody += `<a href="${pdfUrl}"><b style="font-size: xx-large; font-weight: bold;">CLIC AQUI PARA ABRIR LA COTIZACION</b></a><br>`;
    mailBody += pdfUrl;
    mailBody += "<p>Gracias</p>";
    mailBody += "<br><p>Julián Pardo R.<br>Produccion</p><br>";
    mailBody += "Calle 174 No. 8 - 30  Torre 5 Of. 201<br>PBX 740 4202<br>https://www.youtube.com/watch?v=VfkixH8kbt4<br>Bogotá - Colombia"


    MailApp.sendEmail({ 
      to: infoCotizacion[EMAIL], 
      subject: "Cotización Asamblea 2024", 
      htmlBody : mailBody
    });
    
  }

  function calcularLogs(numpre){
    let numLogs = (numpre < 100) ? 2 : ~~(numpre / 100) + 1;
    // console.log(numLogs)
    return numLogs;
  }

  function darId() {
    let valoresH1 = hoja1.getDataRange().getValues();
    let maximo = 0;
    valoresH1.forEach((fila,index) => {
      if (fila[ID] > maximo) {
        maximo = fila[ID];
      }
    })
    return maximo +1
  }

  function doPost( e ){
    var SS = SpreadsheetApp.getActiveSpreadsheet();
    var sheetRegistro = SS.getSheetByName('REGISTRO');

   
    console.log( e ); 
  
    var id = darId();
    var email = e.parameter.email;
    var tel = e.parameter.tel;
    var mPresencial = (e.parameter.flexCheckPresencial == 'on') ? 'P' : '';
    var mVirtual = (e.parameter.flexCheckVirtrual == 'on') ? 'V' : '';
    var mMixta = (e.parameter.flexCheckMixta == 'on') ? 'M' : ''; 
    var fecha = e.parameter.fecha;
    var precio = e.parameter.precio;
    var nombreConjunto = e.parameter.nombreConjunto;
    var predios = e.parameter.predios;
    var vAMixta = e.parameter.vAMixta
    var vAPresencial = e.parameter.vAPresencial;
    var vAVirtual = e.parameter.vAVirtual;
    var des = e.parameter.inputDescuento;
    var inc = e.parameter.inputIncremento;
    var generado = false;
    var envioCorreo = ( e.parameter.acuerdoPrivacidad == 'on' ) ? 'Automatico' : 'Manual';
  
    sheetRegistro.appendRow([ id, nombreConjunto , precio , des , inc , fecha,predios, email , tel ,
                            mVirtual ,mPresencial , mMixta , vAVirtual , vAPresencial , vAMixta, generado,,,envioCorreo]);
    formatearColumnas();
    generarCotizacion();
  
    var lastrow = sheetRegistro.getLastRow();
    var lastCol = sheetRegistro.getLastColumn();
    var rango = sheetRegistro.getRange(lastrow, 1, 1, lastCol);
    sheetRegistro.moveRows(rango, 3);

    if (envioCorreo == 'Automatico') {
      return HtmlService.createTemplateFromFile('COTIZADOR/RegistroTerminado').evaluate();
    } else {
      return HtmlService.createTemplateFromFile('COTIZADOR/RegistroTerminado2').evaluate();
    }
  
  
  }
  
  