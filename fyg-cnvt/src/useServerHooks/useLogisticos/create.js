import { parsedParams } from "../useCreate";
import {API_CNVT , API_GAS} from "../../Globals/API"

function apiPeticion (method , type , body , cbErr , cbSuccess) {
    let response;
    fetch(API_CNVT+'/globals' , {
        method : method,
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({url : `${API_GAS}?type=${type}` , body : body})
    })
    .then(response => response.json())
    .then(data => {
        response = JSON.parse(data);
        cbSuccess(response)
    })
    .catch(err => {
        response = `Error : ${err}`;
        cbErr(response)
    });
};

export function enviarDataLogisticos (obj , type, cb) {
    const params = parsedParams(obj);

    const errorHandler = (response) => {
        alert(response);
    };

    const successHandler =(response)=> {
        console.log(response);
        cb();
    };

    const response = apiPeticion('POST' , type , params , errorHandler , successHandler);
    
};

