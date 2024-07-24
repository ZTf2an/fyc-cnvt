const FOLDER_ID = '190d_SRqqCdf7G7IbsAZAQI4Fy-FHavST';
const TEMPLATE_ID_V = '1vVaWn8g0urfR592XFvBOLtQWa3FcZykBvrmaoWQeaCs';
const TEMPLATE_ID_P = '1pdvOuSHhiUbXvaSoSVGntxLyXTDlUfM67QjF5zOkGzg';
const TEMPLATE_ID_M = '1nbpxDZ2rsA-SKRRqmPnxl2ql8aLzFtGervK4RmTl2gA';
const TEMPLATE_ID_VP = '1Cu4dqsfgsuV8JXO55czyYo2Sq4xagaGmiLVf9t2MLSY';
const TEMPLATE_ID_VM = '14UQSaOiQhhA_A1qe6GphLnP2M0B3Dfk0XjS_lW-0XOc';
const TEMPLATE_ID_PM = '13pOHkoCMJWfHojzJLERCyc2FVxLNDKgq-F1RacnZt8w';
const TEMPLATE_ID_VPM = '1jZGcivU9zvq8KUwyJh25deU6i7zWSMuiiW-asUBs1tk';
const ss = SpreadsheetApp.getActiveSpreadsheet();
const SHEET_COTIZACIONES =  ss.getSheetByName('REGISTRO');
// ctrl + "}" para quitar comentario.

// columnas Hoja 1
const ID = 0;
const NOMBRECONJUNTO = 1;
const PRECIO = 2;
const DES = 3;
const INC = 4;
const FECHA = 5;
const PREDIOS = 6;
const EMAIL = 7;
const TEL = 8;
const M_VIRTUAL = 9;
const M_PRESENCIAL = 10;
const M_MIXTA = 11;
const VAVIRTUAL = 12;
const VAPRESENCIAL = 13;
const VAMIXTA = 14;
const GENERADO = 15;
const PDF = 16;
const DOCS = 17;
const MODOEMAIL = 18;
const ACEPTA = 19;
const ACEPTADO = ACEPTA+1;

//2 SHEET GLOBALS
const hoja1 = ss.getSheetByName('REGISTRO');
const hoja2 = ss.getSheetByName('COBRANZA');
const hoja3 = ss.getSheetByName('ACTAS');
const hoja4 = ss.getSheetByName("LOGISTICOS");

const TEMPLATE_ID_VCC = '';
const TEMPLATE_ID_PCC = '';
const TEMPLATE_ID_MCC = '';

const FOLDER_CC= '1vsfeo9m-Cqxo8ystzeu4lKpiAHW2wXgg';
const TEMPLATES_CC_J = {
  "VIRT_AC" : '1QjJ70w3AKDctZNS4rboCbrOU-3TuCnol53pMAWZ-Z28',
  "VIRT": '1Cbuh7krGa-yqSQ7Nx2UNkkZCBLa0VOMFaepF32N3Lh4',
  "PRES": '1MIYpRtnwSTVrCcaPBtm5XHlZgr2cXTxePcZo_QV4tGE',
  "MIXT": '1Afl3j0dEx9OVdLlzoRHkRNwUQmWqCQyRS3FaOLAPN7A'
};
const TEMPLATES_CC_S = {
  "VIRT_AC" : '1pO2l2yR69_1CKb7cK61eco2I-LRotwY3lqoRMULTcYs',
  "VIRT": '19xDBj82MTmzelB_Mnz__x022s2VvUtwKXY9GyEAGjpU',
  "PRES": '1Vb98Vq9ERvIOFVLdJWro2vf_tFAKjsSGX_27WNhEGLs',
  "MIXT": '1bY9igEC0qm0s7VpzAHBVwj-ys4Ml2qKzjJ5VlgKO0Dw'
};
// const TEMPLATE_CC_VIRT_AC = '1QjJ70w3AKDctZNS4rboCbrOU-3TuCnol53pMAWZ-Z28'
// const TEMPLATE_CC_VIRT = '1Cbuh7krGa-yqSQ7Nx2UNkkZCBLa0VOMFaepF32N3Lh4'
// const TEMPLATE_CC_PRES = '1MIYpRtnwSTVrCcaPBtm5XHlZgr2cXTxePcZo_QV4tGE'
// const TEMPLATE_CC_MIXT = '1Afl3j0dEx9OVdLlzoRHkRNwUQmWqCQyRS3FaOLAPN7A'
const DOCUMENTOS_STEFFAN = {
  "CEDULA":"https://drive.google.com/file/d/1Lzwl_eCZXFhUAZF-WE-n2B24JIV88z6d/view?usp=drive_link",
  "CERTIFICACION":"https://drive.google.com/file/d/1wiJfgcNizoh2c8ZE3uwQ2YJcbcgXtwuC/view?usp=drive_link",
  "RUT":"https://drive.google.com/file/d/1wZdz_lYIGfjQ5iKBZJwNT8QOcTEZk6P-/view?usp=drive_link"
};
const DOCUMENTOS_JULIAN = {
  "CEDULA" : "https://drive.google.com/file/d/1IZCR6CKbiIeuNfozQ0P2ZFpk8xlnqwWr/view?usp=share_link",
  "CERTIFICACION" : "https://drive.google.com/file/d/1ErAO7n_DxZuUT8vQmOo-nlWMIf-_qICt/view?usp=share_link",
  "RUT" : "https://drive.google.com/file/d/15Bnf1TlzYv0aocPSGlN6PdOoUHBnIJ-B/view?usp=share_link"
}
// const CEDULA_JP_URL;
// const CERT_BANC_JP_URL = '';
// const RUT_JP_URL = '';

const FOLDER_ASAMBLEAS = '18gwyyxmNKqqCpkY8ldczwYJPIdQmmis1'

// COLUMNAS HOJA 2
const IDH2 = 0;
const NOMBRECONJUNTOH2 = 1;
const PRECIOH2 = 2;
const FECHAASAMBLEAH2 = 3;
const PREDIOSH2 = 4;
const DURACIONH2 = 5;
const EMAILH2 = 6;
const MODALIDADH2 = 7;
const ACOMPAÑAMIENTOCHECKH2 = 8;
const CARPETAH2 = 9;
const CARPETACHECK = 10;
const PDFH2 = 11;
const DOCSH2 = 12;
const CHECKGENERARCUENTA = 13;
const COMP1H2 = 14;
const COMP2H2 = 15;
const COMP3H2 = 16;
const MODOCUENTAH2 = 17;
const COTIZACIONH2 = 18;
const ARRVALORES = 19;


function doGet() {
  var template = HtmlService.createTemplateFromFile("COTIZADOR/Cotizador.html");
  template.pubUrl = "https://script.google.com/macros/s/AKfycby8NZSgSgS3DrOb2DXXaNrCj-ZydjeHMPogWRSQazG0/dev";
  var output = template.evaluate();
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output;
}

function include( fileName ) {
  return HtmlService.createTemplateFromFile( fileName )
  .getRawContent();

  //Originalmente es getContent, pero lo toma como error.
}