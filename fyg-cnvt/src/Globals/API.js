// export const API_GAS = "https://script.google.com/macros/s/AKfycbyDeatgg0OPrcTP3bCuKw5ZOlWp271fRW6A9sLHTXObZ4vqYHoY8CsnLNVHJb2L4MuWKQ/exec" // realizada con tio alejandro
// export const API_GAS = "https://script.google.com/macros/s/AKfycbzbKY4c15J30vJOfKgXgG4Mph1BYiyTcE62tydAPzPqj3qXdpjCuDWGUjpkCeO8HD9aDA/exec" // falla porque no devuelve success, y con el parametro cot devuelve error de cors
export const API_GAS = "https://script.google.com/macros/s/AKfycbywAqOck0l_1kw1Bdi_xKGZaHDavXUfx0_XgHlCublvoIlmuGKqv-hQ3angjomaN8rFnA/exec"

export const API_CNVT = "http://localhost:3000/api/v1/registros"
// export const API_CNVT = "http://home.koeficiente.com:3000/api/v1/registros"
// export const API_CNVT = "https://api.conectivate.com:3000/api/v1/registros"

/*
import numberToWords from 'number-to-words'

const number = numberToWords.numberToWords(25, {lang : 'es'});
console.log(number)
*/

import numbers2words from 'numbers2words';

const translator = new numbers2words("ES_ES");
console.log(translator.toWords(15221215));