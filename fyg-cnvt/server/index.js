import routerApi from './router.js';
import express from 'express';
const server = express();


const port = 3000;


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

// siguientes lineas para node
server.listen(port, () => {
console.log('Mi port '+ port);
});

// export default server;