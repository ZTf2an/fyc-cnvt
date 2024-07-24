function onOpen(){
    const menu = SpreadsheetApp.getUi().createMenu('Conectivate')
    .addItem('📨  Generar y Enviar Cotizaciónes','generarCotizacion')
    .addItem('👉  Transferir Cotizaciones a Cuentas', 'seleccionarFila')
    .addItem('📂  Crear Carétas en Drive','iniciarProcesoCarpeta')
    .addItem('📑  Generar PDF faltantes', 'generarPDF')
    .addSeparator()
    //.addItem('🔄️ Actualizar Valores de Cuentas','actualizarValores')
    .addItem('Generar DOCS cuentas de cobro', 'iniciarProcesoCuenta')
    .addItem('📦  Enviar Informes al Cliente', 'enviarInformes')
    .addToUi();
}

function onEdit() {
    insertarAcomp();
  }