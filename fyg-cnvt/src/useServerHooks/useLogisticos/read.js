import { API_CNVT , API_GAS } from "../../Globals/API";

export function getData (succesCB) {
    let response
    fetch(API_CNVT+'/globals' , {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url : `${API_GAS}?type=getLogs` , body : {}})
    })
    .then(response => response.json())
    .then(data => {
        response = JSON.parse(data);
        succesCB(response);
        return response;
        // cbSuccess(response)
    })
    .catch(err => {
        response = `Error : ${err}`;
        alert(response);
        // cbErr(response)
    });
    
};