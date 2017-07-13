const electron = require('electron')
const { app, BrowserWindow } = electron
const $ = jQuery = require('jquery')
const path = require('path')
const url = require('url')
const { ipcMain } = require('electron')
const os = require('os');
const setSett = require('./modulos/setSettings.js');
const dbsql = require('./js/ScriptsDB/basedatos.js')

let win

function createWindow(width, height) {

    //Si el OS es Windows, Crea una ventana sin marco
    var flag = (os.platform() === 'win32') ? false : true

    win = new BrowserWindow({
            width: width,
            height: height,
            autoHideMenuBar: true,
            backgroundColor: '#FFFFFFFF',
            icon: path.join(__dirname, 'icon/64x64.png'),
            show: false,
            frame: flag,
            nodeIntegration: true
        })
        //maximiza la ventana
    win.setResizable(false);

    win.on('closed', () => {
        win = null
    })
}

let logwin

function logwindow() {
    logwin = new BrowserWindow({
        parent: win,
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        show: false,
        icon: path.join(__dirname, 'icon/64x64.png'),
        frame: false,
        nodeIntegration: true
    })
    logwin.setResizable(false);
    logwin.webContents.on('did-finish-load', function() {
        setTimeout(function() {
            logwin.show()
        }, 500)
    })

    logwin.loadURL(url.format({
        //__dirname: direccion completa de la carpeta del projecto ejem: /home/aisark/Escritorio/servicio-2017
        pathname: path.join(__dirname, 'templates/login.html'), //<----- ruta de los archivos html
        protocol: 'file:',
        slashes: true
    }))
    logwin.on('closed', () => {
        var url = win.webContents.getURL()
        if (url == '' || url == undefined || url == null) {
            win.close()
        }
        logwin = null
    })
}

app.on('ready', () => {
    dbsql.checkedTables().then(function(msj) {
        console.log(msj);
    }).catch(function(err) {
        console.log(err);
    })
    logwindow()
    setSett()
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    createWindow(width, height)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//Enviar mensaje
ipcMain.on('load-page', (event, arg) => {
    win.loadURL(arg)
})

ipcMain.on('show-window', (event, arg) => {
        win.loadURL(url.format({
            //__dirname: direccion completa de la carpeta del projecto ejem: /home/aisark/Escritorio/servicio-2017
            pathname: path.join(__dirname, 'templates/index.html'), //<----- ruta de los archivos html
            protocol: 'file:',
            slashes: true
        }))
        win.webContents.on('did-finish-load', function() {
            setTimeout(function() {
                if (logwin != null) {
                    logwin.close()
                }
                win.show()
            }, 500)
        })
    })
    //--------------------