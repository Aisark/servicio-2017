const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const path = require('path')
const url = require('url')

/**
 * @summary Open Menu principal
 * @function
 * @private
 *
 * @description
 * Abre el menu con un efecto de animación, y lo pone visible en el screen
 * 
 * @param {time} Numero de tipo entero
 *
 */
function openMenu(time) {
    Materialize.showStaggeredList('#menuButtons');
    setTimeout(function() {
        $('#menuButtons').removeClass('hide')
    }, time)
}

/**
 * @summary Open Modal
 * @function
 * @private
 *
 * @description
 * Abre un modal con el identificador con el que fue creado y lo habre
 * con un delay personalizado
 *
 * @param {mod} Cadena de texto
 * @param {time} Numero de tipo entero
 */
function openModal(mod, time) {
    setTimeout(function() {
        $('#' + mod).modal('open')
    }, time)
}

$(document).ready(function() {
    var animatedName = 'animated fadeOutRight'
    var animatedOne = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'


    $('.parallax').parallax();
    $('.scrollspy').scrollSpy({ scrollOffset: 0 });

    //Configuración de los madals
    $('#configs').modal({
        dismissible: false,
        opacity: .7,
        endingTop: '15%',
        outDuration: 300
    });
    $('#opcIni').modal({
        dismissible: false,
        opacity: .2,
        endingTop: '15%',
        inDuration: 200,
        outDuration: 200
    })

    //Abrir modals dinamicamente
    $('#iniciar').on('click', function() {
        openMenu(300)
    });
    $('#openConfig').on('click', function() {
        openModal('configs', 200)
    })

    //Abrir el modal de Opciones iniciales del juego
    $('#iniGame').on('click', function() {
        $('#menuButtons > li >a').addClass(animatedName).one(animatedOne, function() {
            $('#menuButtons').addClass('hide')
            $('#menuButtons > li >a').removeClass(animatedName)
            $('#opcIni').modal('open');
        });
    })

    //Cerrar modals dinamicamente
    $('#closeConfig').on('click', function() {
        $('#configs').modal('close');
    });
    $('#canGame').on('click', function() {
        $('#opcIni').modal('close')
        openMenu(200)
    })

    //Iniciar juego principal
    $('#agreGame').on('click', function() {
        var linkUrl = url.format({
            pathname: path.join(__dirname, '../../templates/main.html'),
            protocol: 'file:',
            slashes: true
        })
        $('#opcIni').modal('close');
        ipcRenderer.send('load-page', linkUrl)
    })

    //Cerrar aplicación
    $('#closeGame').on('click', function() {
        var win = remote.getCurrentWindow()
        win.close()
    })

});