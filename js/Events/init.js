const btn = require('../../js/Events/btn.js');
const proceso = require('../../js/Equations/procSolucion');
const pasos = require('../../js/Equations/pasos.js');
const config = require('../../modulos/config.js')
const str = require('../../modulos/format.js');

function modals() {
    $('#tipsM').modal({
        complete: function() { _video.pause() },
        ready: function() {
            setTimeout(function() {
                _video.play()
            }, 1000);
        }
    })
    $('#solucionM').modal({
        ready: function() { proceso.procSol() },
        complete: function() {
            btn.updateEcua()
            pasos.resetSteps();
        }
    })
}

function loadObj() {
    config.getOBjc().then(function() {
        loadUser()
    })
}

function loadUser() {
    var obj = config.getItemObj('userData')
    var nombre = str.camelUp(obj['NOMBRE']) + str.camelUp(obj['AP_PAT']) + str.camelUp(obj['AP_MAT'])
    $('#nombre').text(nombre)
}

$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    var _video = document.getElementById('vTutorial')
    modals()
    loadObj()
});