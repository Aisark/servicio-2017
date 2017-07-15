const remote = require('electron').remote

//Cierra la ventana  actual
function cerrar() {
    var win = remote.getCurrentWindow()
    win.close()
}
//Recarga la ventana actual
function reload() {
    var win = remote.getCurrentWindow()
    win.reload()
}
//Minimizar la ventana actual
function minimizar() {
    var win = remote.getCurrentWindow()
    win.minimize();
}

$('#closeBrows').click(function() {
    cerrar()
})

$('#reload').click(function() {
    reload()
})

$('#minimizar').click(function() {
    minimizar()
})

//----------------------