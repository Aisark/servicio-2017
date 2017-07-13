const noUiSlider = require('../../noUiSlider/nouislider.min.js')
const wNumb = require('../../noUiSlider/wNumb.js')
const config = require('../../modulos/config.js')

var slider = document.getElementById('volRange')

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
    config.getOBjc().then(function(data) {
        $('#banner').text('Presiona para iniciar')
        $('.progress').addClass('hide')
        $('#iniciar').removeClass('hide disabled')
    })
}

$(document).ready(function() {
    loadObject()
})

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
        urlImg = document.getElementById('urlimg').files[0].path

    config.setItemObject(nPuzz, 'lvlPuzz')
    config.setItemObject(nEcua, 'lvlEcua')
    config.setItemObject(urlImg, 'urlImg')

    config.setObject().catch(function(error) {
        console.log(error);
    })
})

//