const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=2UBkBwHcVUN_grW9DxuR0EpH3b1yhpP1uUxI9yOvSRK1lM4P0yNfpCqxZffqjN6Cn_y77y7jbmjMNmv6Q0hZO3KKN0HWT6UCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHgnESSZBCazMkIvcr73wjkJd6xIRZmAG0wTSFBye71slEhUC374m4KqhRlimzZh8kwRPVxkTg6IS2p9GZMaajcYgZBvSPGN59z9Jw9Md8uu&lib=M1_qYwtQ_7_jacpcpkhFADTZ1D43tM-ww'

async function conectar () {
    const response = await fetch(url);
    const data = await response.json()
    return data
}

(
    async () => {
        console.log( await conectar())
    }
)()


let url2 = 'https://script.google.com/macros/s/AKfycbywAqOck0l_1kw1Bdi_xKGZaHDavXUfx0_XgHlCublvoIlmuGKqv-hQ3angjomaN8rFnA/exec'

let obj = {
    "inputNombreCliente": "CONJUNTO PRUEBA 1",
    "inputFecha": "2024-09-07",
    "inputCorreo": "correoelectronicodelcliente@prueba1.com",
    "inputNumeroTelefonico": "3001231456",
    "flexCheckMVirtual": "on",
    "flexCheckMPresencialT": "on",
    "flexCheckMPresencialC": "on",
    "flexCheckMMixta": "on",
    "inputPredios": "100",
    "inputValor": "945000",
    "inputDescuento": "10",
    "inputIncremento": "",
    "inputValorAcoVirtual": "500.000",
    "inputValorAcoPresencial": "0",
    "inputValorControles": "0",
    "inputValorAcoMixta": "800.000",
    "inputSerActa": "on",
    "inputSerSonido": "on",
    "inputSerCabinas": "2",
    "inputSerMicrofonos": "4",
    "inputSerPatinadores": "2",
    "inputSerVotacion": "on",
    "inputSerLogisticos": "2",
    "inputSerFilmacion": "on",
    "inputSerVideoBeam1": "on",
    "inputSerVideoBeam": "1",
    "inputSerTelon": "1",
    "inputSerCircuitoCerrado": "on",
    "inputSerSalones": "2"
}
// ?type=cot
fetch(`${url2}?type=cot`,{
    method : 'POST' ,
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(obj)
})
    // .then(response => console.log(response))
    .then(response => response.json())
    .then(data => console.log('Respuesta : ' , data))
    .catch(error => console.error('Ocurrió un error: ' , error))




fetch('http://18.224.40.203:3000/')
    .then(response => response.text())
    .then(data=>console.log(data))