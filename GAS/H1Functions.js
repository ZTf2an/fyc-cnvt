function formatearColumnas() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetRegistro = ss.getSheetByName('REGISTRO');
    var rangosFormatoMoneda = sheetRegistro.getRangeList(['C3:C','M3:M','N3:N','O3:O']);
    var rangoFormatoFecha = sheetRegistro.getRangeList(['F2:F']);
    
    rangoFormatoFecha.setNumberFormat('d"/"mm"/"yy')
    rangosFormatoMoneda.setNumberFormat("[$ $]#,##0");

  }

function pintarFilaAceptado(){
  let h1 = ss.getSheetByName("REGISTRO");
  // lr = h1.getLastRow();
  // lc = h1.getLastColumn();
  let range = h1.getRange("A3:T400")
  h1.clearConditionalFormatRules()

  rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=$T3=true")
    .setBackground("#B7E1CD")
    .setRanges([range])
    .build();
  
  rules = h1.getConditionalFormatRules();
  rules.push(rule);
  hoja1.setConditionalFormatRules(rules)
}

function pintarPasadas() {
  let range = hoja2.getRange("A3:T200");
  hoja2.clearConditionalFormatRules();

  rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("$D3<HOY()")
    .setBackground("#FF6D01")
    .setRanges([range])
    .build();

    rule = hoja2.getConditionalFormatRules();
    rues.push(rule);
    hoja2.setConditionalFormatRules(rule)
}

function pintarPagadas() {
  let range = hoja2.getRange("A3:T200");
  hoja2.clearConditionalFormatRules();

  rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=($O3+$P3)>($C3-($C3*0.06))")
    .setBackground("#6AA84F")
    .setRanges([range])
    .build();

    rule = hoja2.getConditionalFormatRules();
    rues.push(rule);
    hoja2.setConditionalFormatRules(rule)
}