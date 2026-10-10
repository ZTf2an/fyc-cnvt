import { API_CNVT, API_GAS } from "../Globals/API";

/**
 * Peticion Get para extraer datos del Servidor GAS.
 * @param {String} path 
 * @param {Function} onSuccess 
 * @param {Function} onError 
 */
export function apiGet(path, onSuccess, onError) {
    fetch(API_CNVT + path)
        .then(response => response.json())
        .then(data => {
            onSuccess(data);
        })
        .catch(error => { 
            if (onError) onError(error);
        });
};

/**
 * Realiza una petición POST centralizada hacia la API.
 * @param {Object} querys - Objeto que contiene las llaves y valores para los parámetros de la URL.
 * @param {Object} body - Objeto o datos que se enviarán en el cuerpo de la petición.
 * @param {Function} onSuccess - Callback que se ejecuta si la petición es exitosa.
 * @param {Function} onError - Callback que se ejecuta si ocurre un error.
*/
export function apiPost (querys , body , onSuccess , onError) {
    const keys = Object.keys(querys);
    const arrQuery = keys.map( key => `${key}=${querys[key]}`).join('&');
    const url = `${API_GAS}?${arrQuery}`;
    // console.log(url)

    fetch( API_CNVT+'/globals' , {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({url : url , body : body})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.startsWith("<")) {
            const exception = data.match(/Exception:[^<]+/) || data.match(/TypeError:[^<]+/);
            throw `No se guardaron los cambios \n ${exception[0]}`;
        };
        onSuccess(data)
    })
    .catch( error => {
        console.log(error)
        onError(error)
    });
    
}
