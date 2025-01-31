import {Router} from "express";

// const API_GAS = 'https://script.google.com/macros/s/AKfycbwLRlVsi-oHEUklkA1eqk0Y4dcOT3Rti5Z73Wu7g9djF-ETgZr3OD6jW48rkQYbuci5nA/exec' //4.8.5.2.1 solucion en problema con la fecha
const API_GAS = 'https://script.google.com/macros/s/AKfycbzG5bk4vnX6ix2QSM3sqUP-97U59jI2Tc2-Ix35ZGX_ag4yP8zG1ObTucRv6AsDECxWOw/exec' //servidor de conectivate V1.0.6

const registrosRouter = Router();

const PORT = 3000;

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

// 'POST' Para enviar la API en el parametro url desde front. 
registrosRouter.post('/globals' , ( req , res ) => {
    const {url , body} = req.body;
    // console.log(body);
    
    fetch(url , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
    })
    .then(response => response.text())
    .then(data => res.json(data))
    .catch( e => {
        console.log(e);
        res.send(e)
    });
        
})

registrosRouter.put('/sendmail/:type/:id',(req , res)=> {
    const { type , id } = req.params;
    const body = req.body;
    
    const requestBody = {id:id , data : body};
    
    console.log('api : '+API_GAS+"?type=sendMail&docType="+type);
    console.log(JSON.stringify(requestBody));
    // console.log(API_GAS+"?type=sendMail&docType="+type)
    fetch(API_GAS+"?type=sendMail&docType="+type, {
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

registrosRouter.patch('/pdf/:id' , (req , res) => {
    const { id }= req.params;
    const body = req.body;

    const requestBody = {id:id , data : body};
    // console.log(requestBody)

    fetch(API_GAS+'?type=createpdf&docType=COTIZACION', {
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

    // console.log(API_GAS+'?type=updateDocs&docType='+type);
    // console.log(body);

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
