const remote = require('electron').remote

const closeBrows = document.getElementById('closeBrows')
const recargar = document.getElementById('reload')
const mini = document.getElementById('minimizar')

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

closeBrows.onclick = cerrar
recargar.onclick = reload
mini.onclick = minimizar
//----------------------
