const remote = require('electron').remote
const confInit = require('../../js/Events/configInit');

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
function openModal(btn, mod, time) {
    $('#' + btn).on('click', function() {
        setTimeout(function() {
            $('#' + mod).modal('open')
        }, time)
    })

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
    $('#Perfil').modal({
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
    openModal('openConfig', 'configs', 200)
    openModal('openPerfil', 'Perfil', 200)


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
    $('#save').click(function() {
        confInit.saveNewData().then(function() {
            $('#Perfil').modal('close')
        }).catch(function(msj) {
            Materialize.toast(msj, 5000)
        })
    })
    $('#noSave').click(function() {
        confInit.cancelData()
        $('#Perfil').modal('close')
    })

    //Iniciar juego principal
    $('#agreGame').on('click', function() {
        $('#opcIni').modal('close');
    })

    //Cerrar aplicación
    $('#closeGame').on('click', function() {
        var win = remote.getCurrentWindow()
        win.close()
    })

});