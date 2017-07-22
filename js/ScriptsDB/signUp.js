const db = require('./basedatos.js')
const { ipcRenderer } = require('electron')
const config = require('../../modulos/config.js')

var datos = ['', '', '', '', '', 'H', 0] //['nombre','apP','apM','user','pass','sexo',0]

function setConf(data) {
    config.setItemObject(data[3], 'userData', 'userName')
    config.setItemObject(data[0], 'userData', 'name')
    config.setItemObject(data[1], 'userData', 'lastName')
    config.setObject()
}

function getDataUser(item, index) {
    $('#' + item + 'Us').change(function() {
        var valor = $(this).val()
        if (valor !== '' && valor.length > 2) {
            datos[index] = valor
        } else {
            datos[index] = ''
        }
    })
}

function checkUserAvi() {
    $('#nickUs').change(function() {
        var tipo = $('input:radio[name=tipoUser]:checked').val()
        var dato = $(this).val()
        if (dato.length > 3) {
            db.getUserAvia(tipo).then(function(array) {
                if (array.length > 0) {
                    array.forEach(function(ele) {
                        if (dato === ele.USERNAME) {
                            datos[3] = ''
                            Materialize.toast(dato + ' no esta disponible', 4000)
                        } else {
                            datos[3] = dato
                        }
                    })
                } else {
                    datos[3] = dato
                }
            })
        } else {
            Materialize.toast('El nombre de usuario debe contener minimo 4 letras', 4000)
            datos[3] = ''
        }
    })
}

function confirPass() {
    $('#cpassUs').change(function() {
        var pass = $('#passUs').val()
        var cpass = $(this).val()
        if (pass === cpass) {
            datos[4] = pass
        } else {
            Materialize.toast('La contraseña no coincide', 4000)
            datos[4] = ''
        }
    })
}

function getSex() {
    $('input:radio[name=sexo]').click(function() {
        datos[5] = $(this).val()
        console.log(datos[5]);
    })
}

function getIDMaestro() {
    $('#selMaes').change(function() {
        var id = parseInt($(this).val())
        datos[6] = id
    })
}

function sendSignUp() {
    $('#sendSign').click(function() {
        var tipo = $('input:radio[name=tipoUser]:checked').val()
        var flag = true
        for (var i = 0; i < datos.length; i++) {
            if (datos[i] === '' || datos[i] === 0) {
                flag = false
                break
            }
        }
        if (flag) {
            Materialize.toast('Datos correctos', 4000)
            if (tipo === 'ALUMNOS') {
                db.setStudents(datos).then(function() {
                    $('.habilitado').addClass('desabilitado')
                    $('.progress').removeClass('hide')
                    Materialize.toast('Usuario registrado', 4000)
                    db.close()
                    ipcRenderer.send('show-window', 0)
                })
                setConf(datos)
            } else {
                Materialize.toast('Sección de maestros en construcción', 4000)
            }
        } else {
            console.log(datos);
            Materialize.toast('Hay datos vacios', 4000)
        }
    })
}

$(document).ready(function() {
    getDataUser('name', 0)
    getDataUser('app', 1)
    getDataUser('apm', 2)
    checkUserAvi()
    confirPass()
    getSex()
    getIDMaestro()
    sendSignUp()
})


//