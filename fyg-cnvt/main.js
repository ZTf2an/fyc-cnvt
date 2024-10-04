import { app, BrowserWindow, Menu } from 'electron';
import server from './server/index.js'

// const cors = require('cors')

const port = 3000;

function createWindow() {
    const win = new BrowserWindow({
        width : 800,
        height : 600 ,
        webPreferences : {
            nodeIntegration : true,
            contextIsolation : false,
            devTools : false 
        },
    });

    win.loadURL('http://localhost:5173');
}

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

app.on('ready' , () => {
    Menu.setApplicationMenu(null);
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})