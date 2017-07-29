const btn = require('../../js/Events/btn.js');
const pasos = require('../../js/Equations/pasos.js');
const config = require('../../modulos/config.js')
const str = require('../../modulos/format.js');

var _video = document.getElementById('vTutorial')

function modals() {
    $('#tipsM').modal({
        opacity: .8,
        dismissible: false,
        complete: function() { _video.pause() },
        ready: function() {
            setTimeout(function() {
                _video.play()
            }, 1000);
        }
    })
    $('#modalXp').modal({
        opacity: .3,
        ready: function() { $('ul.tabs').tabs(); }
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
    modals()
    loadObj()
    $('ul.tabs').tabs();
});