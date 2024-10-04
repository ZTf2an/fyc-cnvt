import { app, BrowserWindow } from 'electron';
import express from 'express';
import routerApi from './serverRoutes/server.js';
// const cors = require('cors')
const server = express();
const port = 3000;

function createWindow() {
    const win = new BrowserWindow({
        width : 800,
        height : 600 ,
        webPreferences : {
            nodeIntegration : true,
            contextIsolation : false,
        },
    });

    win.loadURL('http://localhost:5173');
}

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


app.whenReady()
    .then(() => {
        server.listen(port, () => {
        console.log('Mi port '+ port);
        createWindow();
    });

});

app.on('window-all-closed' , () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})