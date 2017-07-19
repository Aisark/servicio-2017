const db = require('./basedatos.js')
const { ipcRenderer } = require('electron')
const config = require('../../modulos/config.js')

function logUSer(user, tipo) {
    var pasw = $('#pass' + user).val()
    var user = $('#user' + user).val()

    if (!user == '' && !pasw == '') {
        db.getUser(user, tipo).then(function(data) {
            if (data.PWORD === pasw) {
                $('.habilitado').addClass('desabilitado')
                $('.progress').removeClass('hide')
                setConfig(user, data)
                db.close()
                ipcRenderer.send('show-window', 0)
                Materialize.toast('Bienvenido ' + user, 4000)
            } else {
                Materialize.toast('Contraseña Incorrecta', 4000)
            }
        }).catch(function() {
            Materialize.toast('El usuario no esta registrado', 4000)
        })
    } else {
        Materialize.toast('Datos vacios', 4000)
    }

}


function setConfig(user, data) {
    config.setItemObject(user, 'userData', 'USERNAME')
    config.setItemObject(data.NOMBRE, 'userData', 'NOMBRE')
    config.setItemObject(data.AP_PAT, 'userData', 'AP_PAT')
    config.setItemObject(data.AP_MAT, 'userData', 'AP_MAT')
    config.setObject()
}

function setTeachList() {
    db.getMaestros().then(function(array) {
        array.forEach(function(data) {
            var elem = '<option value="' + data.rowid + '">' + data.NOMBRE + ' ' + data.AP_PAT + '</option>'
            $('select').append(elem)
        })
        $('select').material_select();
    }).catch(function(err) {
        var elem = '<option>' + ' No hay maestros ' + '</option>'
        $('select').append(elem)
        Materialize.toast(err, 10000)
    })
}

$('#senStuden').on('click', function() {
    logUSer('Stu', 'ALUMNOS')
})

$('#passStu').keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault()
        logUSer('Stu', 'ALUMNOS')
    }
})

$('#sendMa').on('click', function() {
    logUSer('Teach', 'MAESTROS')
})

$(document).ready(function() {
    setTeachList()
    config.getOBjc().then(function() {})
})