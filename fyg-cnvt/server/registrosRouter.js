import {response, Router} from "express";
// const API_GAS = 'https://script.google.com/macros/s/AKfycbwuJD1i_5S42OQG_gCtVANZFh0SjhlvBy3GANCs7CAVJUYV4fzv2I5uCsNUp6Pota8-4g/exec';
// const API_GAS = 'https://script.google.com/macros/s/AKfycbzhiL4IE3JZudFUjMNX0AW6nwT6egYdhG9p0h-ZxNdF6xvbiEN0MjcFG4Ly8XHP30L59g/exec'; //4.8.1
// const API_GAS = 'https://script.google.com/macros/s/AKfycbw9Niqw-bZdFoBA8iUqLcxjXc4um-zQnNTvuQh4XVBe3JcAqgKIXDrkSwmLYNzIkfscDg/exec'; //4.8.2
// const API_GAS = 'https://script.google.com/macros/s/AKfycbyUlKIgKLfMhDI7_KJ1QGSnsL9Apmq2R50AwIKM4SKVbZbsC1Bp-ddGBAnjM9UmFSMeSA/exec'; //4.8.3 genera el pdf
const API_GAS = 'https://script.google.com/macros/s/AKfycbzckZX55bfEToBElAL9trNUi3RK-M6c8EkrhFr_PYNRfPfnbu2WAbK5niU3y5-fDFCidg/exec'; //4.8.4 actualiza el pdf

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

registrosRouter.patch('/pdf/:id' , (req , res) => {
    const { id }= req.params;
    const body = req.body;

    const requestBody = {id:id , data : body};

    fetch(API_GAS+'?type=createPDF', {
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
