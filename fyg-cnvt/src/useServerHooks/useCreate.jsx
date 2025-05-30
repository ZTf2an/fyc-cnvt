import { API_CNVT, API_GAS } from "../Globals/API";
import { sumarMinuto } from "../Utils/sumarMinuto";

const parsedParams = (arr) => {
    let params = {};

    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i].name != "") {
            // params[arr[i].name] = arr[i].value;
            params[arr[i].name] = (arr[i].name == 'fecha') ? sumarMinuto(arr[i].value) : arr[i].value;
            
            arr[i].name == 'fecha' && console.log(sumarMinuto(arr[i].value));
        }; 
    };

    return params
}

const postData = (data , cb) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", API_CNVT+'/globals',true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            grabaOK(JSON.parse(response));
            cb();
        }
    };
    xmlhttp.onerror = function () {
        console.log("Error ajax");
    };
    // console.log(data);
    xmlhttp.send(JSON.stringify({url : API_GAS+'?type=cot' , body : data}));
}

const grabaOK = (response) => {
    if(response.status=="success"){
        //acciones si fue correcto
        alert(response.msj);
        // myModal.hide()
    }else{
        //acciones si fue erroneo
        alert("Error");
        return false
    }
}

export {parsedParams , postData}