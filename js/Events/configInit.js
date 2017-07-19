const noUiSlider = require('../../noUiSlider/nouislider.min.js')
const wNumb = require('../../noUiSlider/wNumb.js')
const config = require('../../modulos/config.js')
const db = require('../../js/ScriptsDB/basedatos.js')

var slider = document.getElementById('volRange')

var usData = {}
var newpw = "",
    chpw = false,
    usuario = "",
    chuser = false

/**
 * @summary Creat object noUislider
 * @Object
 * @private
 *
 * @description
 * Crea un slider en base al DOM html que se le pase por parametro
 * personalizado con un objeto
 *
 * @param {slider} DOM html
 * @param {object} Objecto html
 **/
noUiSlider.create(slider, {
    start: 100,
    connect: [true, false],
    step: 1,
    range: { 'min': 0, 'max': 10 },
    format: wNumb({ decimals: 0 })
})

/**
 * @summary Carga las configuraciones
 * @function
 * @private
 *
 * @description
 * Carga las configuraciones del juego mediante una promesa, cuando se cumple
 * el preloader es retirado y muestra el boton de iniciar
 *
 *
 **/
function loadObject() {
    config.getOBjc().then(function() {
        usData = Object.assign(config.getItemObj('userData'))
        var nombre = usData.NOMBRE + ' ' + usData.AP_PAT
        $('#banner').text('BIENVENIDO ' + nombre)
        setDataConfi()
    })
}

function iteDataobj() {
    for (var key in usData) {
        if (usData.hasOwnProperty(key)) {
            $('#' + key).val(usData[key])
        }
    }
}

function setDataConfi() {
    iteDataobj()
    Materialize.updateTextFields()
}

exports.saveNewData = function() {
    return new Promise(function(resolve, reject) {
        var pass = $('#PWORD').val()
        if (pass !== "") {
            db.isPassCorrect(pass, usData.USERNAME, 'ALUMNOS').then(function(bol) {
                var object = {}
                var inputs = $('.updb')
                if (bol) {
                    for (var key in inputs) {
                        if (inputs.hasOwnProperty(key)) {
                            var input = inputs[key]
                            var id = input.id
                            if (input.localName == 'input') {
                                if (input.value != usData[id] && id != 'USERNAME') {
                                    object[id] = input.value
                                }
                            }
                        }
                    }
                    if (chpw) {
                        object['PWORD'] = newpw
                    }
                    if (chuser) {
                        object['USERNAME'] = usuario
                    }
                    if (Object.keys(object).length != 0) {
                        var user = usData['USERNAME']
                        for (var key in object) {
                            if (object.hasOwnProperty(key) && key != 'PWORD') {
                                usData[key] = object
                            }
                        }
                        config.setItemObject(usData, 'userData')
                        db.updatePerf(object, 'ALUMNOS', user).catch(function(error) {
                            reject('No se actualizaron los datos')
                        })
                    }
                    restInpuPw()
                    resolve()
                } else {
                    reject('Contraseña incorrecta')
                }
            })
        } else {
            reject('Ingresa la contraseña')
        }
    });


}

exports.cancelData = function() {
    iteDataobj()
    restInpuPw()
    Materialize.updateTextFields()
}

function confirPass() {
    $('#PWORDCN').change(function() {
        var pass = $('#PWORDN').val()
        var cpass = $(this).val()
        if (pass !== cpass) {
            chpw = false
            Materialize.toast('La contraseña no coincide', 4000)
        } else {
            if (pass !== undefined && cpass !== undefined) {
                newpw = pass
                chpw = true
            } else {
                chpw = false
            }

        }
    })
}

function restInpuPw() {
    $('#PWORD').val('')
    $('#PWORDCN').val('')
    $('#PWORDN').val('')
}

function checkUser() {
    $('#USERNAME').change(function() {
        usuario = $(this).val()
        if (usuario.length > 3) {
            db.getUserAvia('ALUMNOS').then(function(array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].USERNAME === usuario) {
                        chuser = false
                        Materialize.toast('Nombre de usuario no valido', 4000)
                        break
                    } else {
                        chuser = true
                    }
                }
            })
        } else {
            chuser = false
            Materialize.toast('Nombre de usuario no valido ' + chuser, 4000)
        }
    })
}


/**
 * @summary Actualizar configuraciones
 * @function
 * @private
 *
 * @description
 * Actualiza las configuraciones del modal "Configuraciones"
 * y son enviadas para su posterior guardado en el sistema
 *
 * @param {click} event
 * @param {callback} Funcion a ejecutar
 **/
$('#closeConfig').on('click', function() {
    var vol = slider.noUiSlider.get(),
        effec = $('#effSound').prop('checked')

    config.setItemObject(vol, "volEffects")
    config.setItemObject(effec, "stateEffects")
})

/**
 * @summary Actualizar Opciones del juego
 * @function
 * @private
 *
 * @description
 * Actualiza las opcines iniciales del juego y las guarda en le sistema antes de
 * cambiar de pantalla mediante una promesa
 *
 * @param {click} event
 * @param {callback} Funcion a ejecutar
 **/
$('#agreGame').on('click', function() {
    var nPuzz = $('input:radio[name=dif1]:checked').val(),
        nEcua = $('input:radio[name=dif2]:checked').val(),
        url = document.getElementById('urlimg').files,
        urlImg = (url.length !== 0) ? url[0].path : ""

    config.setItemObject(nPuzz, 'lvlPuzz')
    config.setItemObject(nEcua, 'lvlEcua')
    config.setItemObject(urlImg, 'urlImg')

    config.setObject().catch(function(error) {})
})


$(document).ready(function() {
    loadObject()
    confirPass()
    checkUser()
})


//