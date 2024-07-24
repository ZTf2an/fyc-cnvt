// Correspondientes a la creación de Documentos Actualizados PDF y envio de correo de los mismos.

function generarPDF() {
  validarUrlCT();
}

function validarUrlCT() {
  let cotizacion = 'Cot';
  let cuenta = 'Cuenta';
  const datosH1 = hoja1.getDataRange().getDisplayValues();
  const datosH2 = hoja2.getDataRange().getDisplayValues();
  
  datosH1.forEach((fila, index)=>{    
    if (fila[DOCS] != "" && fila[PDF] == "") {
      alertarCreacionCT(cotizacion, fila, index);
    }
  })
  datosH2.forEach((fila, index) => {
    if (fila[DOCSH2] != "" && fila[PDFH2] == "") {
      alertarCreacionCT(cuenta, fila, index);
    }
  })

}
function alertarCreacionCT(tipo, fila,index) {
  let mensaje = 'Está seguro de que quiere crear:\n';
  if (tipo == 'Cot') {
    mensaje +='COTIZACIÓN\n'
    mensaje +='Formato: PDF\n'
    mensaje +='Para: '
    mensaje += fila[NOMBRECONJUNTO];
  };
  if (tipo === 'Cuenta') {
    mensaje +='CUENTA DE COBRO\n'
    mensaje +='Formato: PDF\n'
    mensaje +='Para: '
    mensaje += fila[NOMBRECONJUNTOH2];
  };

  const ui = SpreadsheetApp.getUi();
  let respuesta = ui.alert(mensaje,ui.ButtonSet.OK_CANCEL);
  
  if (respuesta == 'OK') {
    extraerUrlPDF(tipo, fila, index);
  };
  
}
function extraerUrlPDF(tipo, fila, index) {
  let docUrl;
  let carpeta;
  let hoja;
  let rangoPdf;
  let nombreArchivo;
  if (tipo == 'Cot') {
    docUrl = fila[DOCS];
    carpeta = DriveApp.getFolderById(FOLDER_ID);
    hoja = hoja1;
    rangoPdf = PDF+1;
    nombreArchivo = 'Cotización '
    nombreArchivo += fila[NOMBRECONJUNTO];
    nombreArchivo += '.pdf'
  }
  if (tipo == 'Cuenta') {
    docUrl = fila[DOCSH2];
    // let sepCarpetaH2 = fila[CARPETAH2].split('/');
    // let idCarpetaH2 = sepCarpetaH2[5];
    carpeta = DriveApp.getFolderById(FOLDER_CC);
    hoja = hoja2;
    rangoPdf = PDFH2+1;
    nombreArchivo = 'CTA_COB ';
    nombreArchivo += fila[NOMBRECONJUNTOH2];
    nombreArchivo += '.pdf';
  };

  let urlPartes = docUrl.split('/');
  let docId = urlPartes[5];

  const documento = DocumentApp.openById(docId);

  const pdf = documento.getAs('application/pdf').setName(nombreArchivo);
  const pdfCreado = carpeta.createFile(pdf);
  const pdfUrl = pdfCreado.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW).getUrl();
  hoja.getRange(index+1,rangoPdf).setValue(pdfUrl);
  alertarEnvioCorreo(tipo,fila,pdfUrl);

  
}
function alertarEnvioCorreo(tipo, fila, pdf) {
  let alerta = 'Desea enviar correo con el pdf actualizado de:\n';
  let email;
  let documentos;
  if (tipo == 'Cot') {
    alerta +='COTIZACIÓN\n'
    alerta +='Formato: PDF\n'
    alerta +='Para: '
    alerta += fila[NOMBRECONJUNTO];
    email = fila[EMAIL];
  };
  if (tipo === 'Cuenta') {
    alerta +='CUENTA DE COBRO\n';
    alerta +='Formato: PDF\n';
    alerta +='Para: ';
    alerta += fila[NOMBRECONJUNTOH2];
    email = fila[EMAILH2];
    // documentos = (fila[COMP3H2] == "")? DOCUMENTOS_JULIAN : DOCUMENTOS_STEFFAN;
    if (fila[COMP3H2]) {
      console.log("Se enviarán los documentos de steffan")
      console.log(DOCUMENTOS_STEFFAN)
      documentos = DOCUMENTOS_STEFFAN;
    } else {
      console.log("se enviarán los documentos de Julian")
      documentos = DOCUMENTOS_JULIAN;
    }
  };
  console.log(tipo)

  const ui = SpreadsheetApp.getUi();
  let respuesta = ui.alert(alerta,ui.ButtonSet.OK_CANCEL);
  if (respuesta == 'OK') {
    enviarElCorreo(tipo,email,pdf, documentos);
  }; 

}
function enviarElCorreo(tipo, email, pdf , documentos) {
  let mensaje = "<p>Apreciad@ Sr@ Administrador@.</p>";
  let asunto;
  if (tipo == 'Cot') {
    mensaje +="<p>Enviamos Cotizacion Solicitada</p>";
    mensaje +="<p> Por favor confirmar con anticipación</p>"
    mensaje += `<a href="${pdf}"><p style="font-size: xx-large; font-weight: bold;">Click aqui para abrir el documento</p></a>`
    mensaje += pdf;
    mensaje += "<br><p>Gracias</p>";
    mensaje += "<br><p>Julián Pardo R.<br>Produccion</p><br>"
    mensaje += "Calle 174 No. 8 - 30  Torre 5 Of. 201<br>PBX 740 4202<br>https://www.youtube.com/watch?v=VfkixH8kbt4<br>Bogotá - Colombia";
    asunto = "Cotizacion Asamblea 2024";
  };
  if (tipo === 'Cuenta') {
    mensaje += "<p>Enviamos Cuenta de cobro por los servicios a prestar de logistica de asamblea,</p><br>";
    mensaje += "<p>Si el pago se realizará mediante transferencia Bancaria, Por favor enviar comprobantes de pago como respuesta a este correo,</p>";
    mensaje += `<a href="${pdf}"><p style="font-size: xx-large; font-weight: bold;">⬇ CLICK EN EL ENLACE PARA VER EL DOCUMENTO ⬇</p></a>`
    mensaje += pdf+"<br>";
    mensaje += "<h3>DOCUMENTOS RELACIONADOS:</h3>";
    mensaje += `<a href='${documentos['CEDULA']}'>CEDULA</a><br>`;
    mensaje += `<a href='${documentos["CERTIFICACION"]}'>CERTIFICACION BANCARIA</a><br>`;
    mensaje += `<a href='${documentos["RUT"]}'>RUT</a><br>`;
    mensaje += "<br><p>Gracias</p>";
    mensaje += "<br><p>Julián Pardo R.<br>Produccion</p><br>"
    mensaje += "Calle 174 No. 8 - 30  Torre 5 Of. 201<br>PBX 740 4202<br>Bogotá - Colombia";
    asunto = "Cuenta de Cobro";
  };
  console.log(pdf)

  MailApp.sendEmail({ 
    to: email, 
    subject: asunto, 
    htmlBody : mensaje}
  );

}

// CORRESPONDIENTE AL ENVIO DE REGISTROS DE HOJA 1 A HOJA 2.
function seleccionarFila() {
  const ultimaFilaH1 = hoja1.getLastRow();
  const ultimaFilaH2 = hoja2.getLastRow();
  const checkBoxesAceptado = hoja1.getRange(3,ACEPTADO,ultimaFilaH1-2,1).getValues();
  const idsH1 = hoja1.getRange(3,ID+1,ultimaFilaH1-2,1).getValues();
  const idsH2 = hoja2.getRange(3,1,ultimaFilaH2-2,1).getValues();
  let perdidas = 0;
  // console.log(idsH2)

  checkBoxesAceptado.forEach((checkBoxAceptado,index)=>{
    if (checkBoxAceptado[0] == true) {
      perdidas = 0;        
      for (var idH2 of idsH2) {
        if (idsH1[index][0] != idH2[0]) {
          console.log(idsH1[index][0] !== idH2[0])
          perdidas += 1;

          if (perdidas == ultimaFilaH2-2) {
            // console.log(idsH1[index][0]);
            alertar(index);
          }          
        } else {

          perdidas = 0;
          break;          
        } 
      } 
    } 
  })
}
function alertar(index) {
  let datosH1 = hoja1.getDataRange().getValues();
  let fila = datosH1[index+2];
  let ui = SpreadsheetApp.getUi()
  let nombreAAlertar = fila[NOMBRECONJUNTO];
  let mensaje = "Está seguro de que quiere enviar a la hoja de Cuentas a:\n"; 
  mensaje += nombreAAlertar;

  let respuesta = ui.alert(mensaje,ui.ButtonSet.OK_CANCEL);
  if (respuesta == 'OK') {
    exportarFila(index+1);

  } else {
    hoja1.getRange(index+3,ACEPTADO,1,1).setValue(false);
    
  }


}
function exportarFila(index) {
  let datosH1 = hoja1.getDataRange().getValues();
  let fila = datosH1[index+1];
  let id = fila[ID]
  let nombreConjunto = fila[NOMBRECONJUNTO];
  let precio = fila[PRECIO];
  let fechaAsamblea = fila[FECHA];
  let predios = fila[PREDIOS];
  let email = fila[EMAIL];
  let urlDocCotizacion = fila[DOCS];
  let vAVirtual = fila[VAVIRTUAL];
  let vAPresencial = fila[VAPRESENCIAL];
  let vAMixta = fila[VAMIXTA];
  let celdaValores = precio+','+vAVirtual+','+vAPresencial+','+vAMixta;
  let modalidad
  const validacionModalidad = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Virtual', 'Presencial', 'Mixta'])
    .setHelpText('MODALIDAD')
    .build();

  const validacionPorcent = SpreadsheetApp.newDataValidation()
    .requireValueInList(['50%', '100%'])
    .setHelpText('Porcentaje sobre el cual se hará la cuenta')
    .build();

  hoja2.appendRow([id,nombreConjunto,precio,fechaAsamblea,predios,,email,modalidad,,,,,,,,,,,urlDocCotizacion,celdaValores]);
  subirUltimaFila();
  hoja2.getRange("C3").setValue('=mostrarValor(H3;I3;T3)');
  hoja2.getRange("H3").setDataValidation(validacionModalidad);
  hoja2.getRange("R3").setDataValidation(validacionPorcent);
  hoja2.getRange("R3").setValue('50%');
  hoja2.getRange("K3").insertCheckboxes();
  hoja2.getRange("N3").insertCheckboxes();
  darFormatoH2();
  //console.log(fila);
}
function subirUltimaFila(){
  let lastCol = hoja2.getLastColumn();
  let lastrow = hoja2.getLastRow();
  let rango = hoja2.getRange(lastrow,1,1,lastCol)
  hoja2.moveRows(rango,3)
  darFormatoH2();
}

// inserta un CheckBox cada que eligen Modalidad virtual en la hoja 2.
function insertarAcomp() {
  let datosh2 = hoja2.getDataRange().getValues();
  datosh2.forEach((fila,index)=>{
    if (fila[MODALIDADH2]== 'Virtual') {
      hoja2.getRange(index+1,ACOMPAÑAMIENTOCHECKH2+1).insertCheckboxes();
    }
  }) 
}

//RELACIONADO CON LA CREACIÓN DE CARPETAS SEGÚN EL NOMBRE.--------------------------------------
function iniciarProcesoCarpeta() {
  let datosH2 = hoja2.getDataRange().getValues();

  datosH2.forEach((fila,index) => {
    if (fila[CARPETAH2] == "" && fila[CARPETACHECK]) {
      alertarCreacionCarpeta(fila,index);
    };
  })
}
function alertarCreacionCarpeta(fila, index) {
  let ui = SpreadsheetApp.getUi();
  let mensaje = 'Está seguro que quiere crear una carpeta en Drive Para:\n';
  let nombreConjunto = fila[NOMBRECONJUNTOH2];
  mensaje += nombreConjunto
  
  let respuesta = ui.alert(mensaje,ui.ButtonSet.OK_CANCEL);
  
  if(respuesta == 'OK') {
    crearCarpetaDrive(fila, index);
    console.log('La carpeta se creará correctamente')

  } else {
    hoja2.getRange(index+1,CARPETACHECK+1).setValue(false);
    console.log('Se ha marcado la casilla cancelar')
  }
}
function crearCarpetaDrive(fila, index) {  
  const carpeta = DriveApp.getFolderById(FOLDER_ASAMBLEAS);
  const subCarpeta = DriveApp.createFolder(fila[NOMBRECONJUNTOH2]+" "+fila[FECHAASAMBLEAH2]).moveTo(carpeta)
    .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
  let url = subCarpeta.getUrl();
  
  hoja2.getRange(index+1,CARPETAH2+1).setValue(url);
  hoja2.getRange(index+1,CARPETACHECK+1).setValue(false)   
}

//ENVIAR INFORMES AL CLIENTE
function enviarInformes() {
  let data = hoja2.getDataRange().getDisplayValues();
  console.log(data)
  data.forEach((fila,index) => {
    if (fila[CARPETACHECK] == "TRUE" && fila[CARPETAH2] != "") {
      let response = alertarEnvioInformes(fila[NOMBRECONJUNTOH2],fila[EMAILH2]);
      if (response == "OK") {
        enviarInforme(fila[NOMBRECONJUNTO],fila[FECHAASAMBLEAH2],fila[EMAILH2],fila[CARPETAH2])
        hoja2.getRange(index+1,CARPETACHECK+1).setValue(false)
        hoja2.getRange(index+1,CARPETAH2+1).setBackground("#30fd07")
      };
    };
  })
}

function alertarEnvioInformes(cliente,correo){
  let ui = SpreadsheetApp.getUi()
  let mensaje = "A continuación enviarás informes de asamblea a: \n";
  mensaje += `CLIENTE : ${cliente}. \n`;
  mensaje += `EMAIL : ${correo}.\n`;
  mensaje += "¿Esta seguro de enviar estos informes?"
  let response = ui.alert(mensaje, ui.ButtonSet.OK_CANCEL)

  return response
};

function enviarInforme(cliente,fecha,email,carpeta) {
  let mensaje = "<p>Apreciad@ Sr@ Administrador@.</p>";
  mensaje += `<h2>${cliente}</h2>`;
  mensaje += `<p>En el presente correo enviamos los informes de asamblea realizada el día ${fecha},</p>`;
  mensaje += `<a href="${carpeta}"><b style="font-size: xx-large; font-weight: bold;">CLIC AQUI PARA ACCEDER A LA CARPETA CON LOS ARCHIVOS GOOGLE DRIVE</b></a><br>`;
  mensaje += `${carpeta} <br>`;
  mensaje += "<p>Agradecemos su confianza en nosotros para la realización de la asamblea.</p>";
  mensaje += "<p>Estamos atentos a cualquier requerimiento adicional.</p>";
  mensaje += "<p><b>GRUPO CONECTIVATE </b>Siempre para servirle.</p>";
  mensaje += "<br><p>Julián Pardo R.<br>Produccion</p><br>";
  mensaje += "Calle 174 No. 8 - 30  Torre 5 Of. 201<br>PBX 740 4202<br>https://www.youtube.com/watch?v=VfkixH8kbt4<br>Bogotá - Colombia"

  MailApp.sendEmail({ 
    to: email, 
    subject: `INFORMES ASAMBLEA ${fecha} 2024 ✔`, 
    htmlBody : mensaje
  });
}

// RELACIONADA CON EL FORMATO QUE SE LE DARÁ A LAS COLUMNAS...
function darFormatoH2() {
  let ultimaFilaH2 = hoja2.getLastRow();
  let colPrecio = hoja2.getRange(2,PRECIOH2+1,ultimaFilaH2);
  let colFecha = hoja2.getRange(2,FECHAASAMBLEAH2+1,ultimaFilaH2);
  colPrecio.setNumberFormat("[$ $]#,##0")
  colFecha.setNumberFormat("mmmm d")
  hoja2.getRange(2,DURACIONH2+1,ultimaFilaH2).setNumberFormat('[h]:mm:ss');
  hoja2.getRange(2,COMP1H2+1,ultimaFilaH2,3).setNumberFormat("[$ $]#,##0")
}

// RELACIONADO CON LA CREACIÓN DE DOCUMENTOS DE CUENTAS DE COBRO.
function iniciarProcesoCuenta() {
  const datosH2 = hoja2.getDataRange().getValues();

  datosH2.forEach((fila, index) => {

    if (fila[CHECKGENERARCUENTA] == true && fila[DOCSH2] == "") {
      let ui = SpreadsheetApp.getUi();
      let respuesta = ui.alert('Está seguro de que quiere generar cuenta de cobro para '+ fila[NOMBRECONJUNTOH2], ui.ButtonSet.OK_CANCEL);
      if (respuesta == 'OK') {
        if (fila[MODALIDADH2] != "") {
          escogerPlantilla(fila,index);
        }else {
          ui.alert('NO HA INDICADO MODALIDAD EN LA TABLA DE CUENTAS.\n Por favor indicar la modalidad en la que se desarrolló o desarrollará la asamblea.')
        }
      }      
    }
  })

}
function escogerPlantilla(fila,index) {
  let templateCuentaCobId
  let archivo = (fila[COMP3H2] == "") ? TEMPLATES_CC_J : TEMPLATES_CC_S;

  if (fila[MODALIDADH2] == 'Virtual') {
    if (fila[ACOMPAÑAMIENTOCHECKH2] == true) {
      templateCuentaCobId = archivo["VIRT_AC"];
    } else {
      templateCuentaCobId = archivo["VIRT"];
    }
  }
  if (fila[MODALIDADH2] == 'Presencial') {
    templateCuentaCobId = archivo["PRES"];
  }
  if (fila[MODALIDADH2] == 'Mixta') {
    templateCuentaCobId = archivo["MIXT"];
  }

  generarCuenta(templateCuentaCobId,fila, index);

}

function generarCuenta(templateId,fila,index) {
  const ui = SpreadsheetApp.getUi();
  let arrValores = fila[ARRVALORES].split(',');
  let precio = parseInt(arrValores[0]);
  let vAVirtual = parseInt(arrValores[1]);
  let vAPresencial = parseInt(arrValores[2]);
  let vAMixta = parseInt(arrValores[3]);
  let modalidad = fila[MODALIDADH2];
  let duracion = fila[DURACIONH2];
  let datosDpH2 = hoja2.getDataRange().getDisplayValues();
  let arrDuracion = datosDpH2[index][DURACIONH2].split(':');
  let hora = arrDuracion[0];
  let valor;
  let concepto;

  switch (templateId) {
    case TEMPLATES_CC_J["VIRT"]:
      valor = precio;
      break;
    case TEMPLATES_CC_S["VIRT"]:
      valor = precio;
      break;
    case TEMPLATES_CC_J["VIRT_AC"]:
      valor = precio+vAVirtual;
      break;
    case TEMPLATES_CC_S["VIRT_AC"]:
      valor = precio+vAVirtual;
      break;    
    case TEMPLATES_CC_J["PRES"]:
      valor = precio + vAPresencial;
      break;
    case TEMPLATES_CC_S["PRES"]:
      valor = precio + vAPresencial;
      break;
    case TEMPLATES_CC_J["MIXT"]:
      valor = precio +vAMixta;
      break;
    case TEMPLATES_CC_S["MIXT"]:
      valor = precio +vAMixta;
      break;
  }
  console.log(valor)

  if (fila[MODOCUENTAH2] == 1){
    concepto = 'Por Concepto de Logística de asamblea ' + modalidad;
    if (fila[DURACIONH2] == '') {
      llenarPlantillaCC(templateId,valor,concepto,modalidad,fila,index)
    } else {        
      if (hora > 5) {
        let hAdiconal = hora-5;
        let vAdicional = hAdiconal*25000;
        valor += vAdicional
      }
      llenarPlantillaCC(templateId,valor,concepto,modalidad,fila,index);
    }
  } else if (fila[MODOCUENTAH2] == 0.5) {
      valor = valor/2;
    if (fila[DURACIONH2] == '') {
      concepto = 'Por Concepto de Anticipo 50% por servicios a prestar de Logistica de Asamblea '+ modalidad;
      llenarPlantillaCC(templateId,valor,concepto,modalidad,fila,index)
    } else {
      concepto = 'Por Concepto de Saldo 50% por servicios a prestar de Logistica de Asamblea '+ modalidad;      
      if (hora > 5) {
        let hAdiconal = hora-5;
        let vAdicional = hAdiconal*25000;
        valor += vAdicional;
      };
      llenarPlantillaCC(templateId,valor,concepto,modalidad,fila,index)
    }
  } else {
    ui.alert('No ha indicado Porcentaje, o el porcentaje no es correcto,\nPor favor seleccionar entre las 2 opciones que posibles: \n50% o 100%');    
  }    
}
function llenarPlantillaCC(templateId,valor,concepto,modalidad,fila,index) {
  let folder_CC = DriveApp.getFolderById(FOLDER_CC);
  let cliente = fila[NOMBRECONJUNTOH2];
  let ui = SpreadsheetApp.getUi();
  let response = ui.prompt('Escribe '+valor.toLocaleString('es-CO')+' en letra.');
  let valorLetra = response.getResponseText();

  let templateCC = DriveApp.getFileById(templateId);
  let newCC = templateCC.makeCopy().moveTo(folder_CC).setName('CTA_COB CNVT ASAMBLEA '+modalidad+' '+cliente);
  let ctaUrl = newCC.getUrl();
  let ctaId = newCC.getId();
  let docCC = DocumentApp.openById(ctaId);
  let body = docCC.getBody();
  let header = docCC.getHeader();

  header.setText('Bogotá '+Utilities.formatDate(new Date(),"GMT-5", "dd' de 'MM' de 'yyyy"))
  body.replaceText('{CLIENTE}',cliente);
  body.replaceText('{PRECIOENNUMERO}',valor.toLocaleString('es-CO'));
  body.replaceText('{VALORENLETRA}', valorLetra);
  body.replaceText('{CONCEPTO}', concepto)
  docCC.saveAndClose();

  let pdf = docCC.getAs('application/pdf').setName('CTA_COB CNVT ASAMBLEA '+modalidad+' '+cliente+'.pdf');
  let pdfCreado = folder_CC.createFile(pdf);
  let pdfUrl = pdfCreado.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.VIEW).getUrl();
    
  hoja2.getRange(index+1,DOCSH2+1).setValue(ctaUrl);
  hoja2.getRange(index+1,PDFH2+1).setValue(pdfUrl);

  alertarEnvioCorreo('Cuenta',fila, pdfUrl);
}

// Funcion encargada de actualizar los valores de la hoja 'CUENTAS' en el Menu 'Funcuines Conectivate'
function actualizarValores() {
  let ultimaFilaH2 = hoja2.getDataRange().getLastRow();
  let rangosACambiar = 'B2:B';
  let datosH2 = hoja2.getDataRange().getValues();
  for (let i = 3; i < datosH2.length; i++) {
    let modalidadDato = datosH2[i-1][MODALIDADH2];
    let acompañamientocheckDato = datosH2[i-1][ACOMPAÑAMIENTOCHECKH2];
    let arrvaloresDato = datosH2[i-1][ARRVALORES];
    let valorTotal = mostrarValor(modalidadDato,acompañamientocheckDato,arrvaloresDato)
    let datosDpH2 = hoja2.getDataRange().getDisplayValues();
    let arrDuracion = datosDpH2[i-1][DURACIONH2].split(':');
    let hora = arrDuracion[0];
    if (hora > 5) {      
        let hAdiconal = hora-5;
        let vAdicional = hAdiconal*25000;
        valorTotal += vAdicional
    }
    hoja2.getRange(i,2)
      .setValue(valorTotal);

  }
  
}