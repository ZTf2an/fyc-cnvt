import routerApi from './router.js';
import express from 'express';
const server = express();

server.use(express.json())
server.use((req , res , next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers' , '*');
    res.header('Access-Control-Allow-Methods' , '*');
    next();
})

server.get('/',(req , res)=> {
    res.send('Hola mi server en express')
})

routerApi(server);

export default server;