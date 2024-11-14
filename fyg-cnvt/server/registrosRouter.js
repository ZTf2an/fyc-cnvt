import {response, Router} from "express";
// const API_GAS = 'https://script.google.com/macros/s/AKfycbzhiL4IE3JZudFUjMNX0AW6nwT6egYdhG9p0h-ZxNdF6xvbiEN0MjcFG4Ly8XHP30L59g/exec'; //4.8.1
// const API_GAS = 'https://script.google.com/macros/s/AKfycbw9Niqw-bZdFoBA8iUqLcxjXc4um-zQnNTvuQh4XVBe3JcAqgKIXDrkSwmLYNzIkfscDg/exec'; //4.8.2
// const API_GAS = 'https://script.google.com/macros/s/AKfycbyUlKIgKLfMhDI7_KJ1QGSnsL9Apmq2R50AwIKM4SKVbZbsC1Bp-ddGBAnjM9UmFSMeSA/exec'; //4.8.3 genera el pdf
// const API_GAS = 'https://script.google.com/macros/s/AKfycbx0XAGOBoTq1NlDxtuRHmnemDKhmqK-sLfE-6FjFthWYnh6HSv2XQcGdRHEjULrwio_ig/exec'; //4.8.4 actualiza el pdf
// const API_GAS = 'https://script.google.com/macros/s/AKfycbxK_noTf21WDhgIKbLkF1IGUElNmxb9s1aNSNm-TI6k1Eva72s_trf7ZmpN1_XUlkvuyw/exec'; //4.8.5 actualiza el docs
// const API_GAS = 'https://script.google.com/macros/s/AKfycbxnppsgeX0DosU4vSZKab8E_984cbTFnivPGE0bCnBH2gWuXP-jyWWweaMsKyJAEXRbXA/exec'; //4.8.5.2 devuelve el url del pdf
const API_GAS = 'https://script.google.com/macros/s/AKfycbwLRlVsi-oHEUklkA1eqk0Y4dcOT3Rti5Z73Wu7g9djF-ETgZr3OD6jW48rkQYbuci5nA/exec' //4.8.5.2.1 solucion en problema con la fecha
const registrosRouter = Router();

registrosRouter.get('/',(req , res)=> {
    fetch(API_GAS)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch( e => console.log(e));
})

registrosRouter.post('/',(req , res)=> {
    const body = req.body;
    
    fetch(API_GAS+'?type=cot', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => res.json({
            status : data.status,
            msj : data.msj
        }))
        .catch( e => res.send(e));
})

registrosRouter.patch('/pdf/:id' , (req , res) => {
    const { id }= req.params;
    const body = req.body;

    const requestBody = {id:id , data : body};
    // console.log(requestBody)

    fetch(API_GAS+'?type=createpdf&doctype=COTIZACION', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            res.json({
                status : data.status,
                msj : data.msj ,
                url : data.url
            })
            console.log(data)
        })
        .catch( e => res.send(e));
})

registrosRouter.patch('/docs/:type/:id' , (req , res) => {
    const { id , type}= req.params;
    const body = req.body;

    const requestBody = {id:id , data : body};

    console.log(API_GAS+'?type=updateDocs&docType='+type)

    fetch(API_GAS+'?type=updateDocs&docType='+type, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => res.json({
            status : data.status,
            msj : data.msj ,
            url : data.url
        }))
        .catch( e => res.send(e));
        // .catch( e => console.log(e));
})

registrosRouter.patch('/:id' , (req , res) => {
    const { id }= req.params;
    const body = req.body;

    const requestBody = {id:id , data : body}

    fetch(API_GAS+'?type=edit', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => res.json({
            status : data.status,
            msj : data.msj
        }))
        .catch( e => res.send(e));
})

registrosRouter.put('/:id' , (req , res) => {
    const {id} = req.params;
    const body = req.body;

    const requestBody = {id : id , data : body}
    // console.log(requestBody)

    fetch(API_GAS+'?type=update' , {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => res.json({
        status : data.status ,
        msj : data.msj
    }))
    .catch( e => res.send(e));
})

export default registrosRouter;
