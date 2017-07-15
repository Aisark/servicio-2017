const res = require('../../js/Equations/resolucion.js');
const puzzle = require('../../js/Canvas/rompecabezas.js')

var _siguiente = document.getElementById('siguiente')
var _tips = document.getElementById('tips')
var _answer = document.getElementById('respuestas')
var _resueltas = document.getElementById('resueltas')
var _score = document.getElementById('score')
var _intentos = document.getElementById('intentos')
var _icono = document.getElementById('bien')
var _efecto = document.getElementById('efecto')
var _closeSM = document.getElementById('closeSM')

/**
 * @summary Procesa la respuesta enviada
 *
 **/
function sendAnswer() {
    if (checkAnswer()) {
        _answer.disabled = true
        iconAnimation(1)
        updateCorrects()
        setIntentos()
        _intentos.innerHTML = puzzle.getMoves('intent')
    } else {
        iconAnimation(0)
        updateErrors(1)
    }
}

/**
 * @summary Verifica si la respuesta enviada es correcta
 *
 **/
function checkAnswer() {
    var reciAns
    var resl = (res.getData('c') / res.getData('x')).toFixed(2)
    var ans = $('#respuestas').val()

    if (ans.includes('/')) {
        var divs = ans.split('/')
        reciAns = (parseInt(divs[0]) / parseInt(divs[1])).toFixed(2)
    } else {
        reciAns = (parseFloat(ans)).toFixed(2)
        console.log(reciAns + '=' + resl);
    }


    return (resl == reciAns) ? true : false

}

/**
 * @summary Actualiza las respuestas correctas
 *
 **/
function updateCorrects() {
    res.modData('correct', 1)
    res.modData('global', 1)
    res.modData('score', 100)
    _resueltas.innerHTML = res.getData('global')
    _score.innerHTML = res.getData('score') + ' Exp'
    updateErrors(0)
}

/**
 * @summary Actualiza los errores del usuario
 **/
function updateErrors(data) {
    if (data == 0) {
        res.setData('errors', 0)
    } else {
        if (res.getData('score') > 0) res.modData('score', -50)
        _score.innerHTML = res.getData('score') + ' Exp'
        res.modData('errors', 1)
    }
    checkErrors()
}

/**
 * @summary Comprueba los errores del usuario
 **/
function checkErrors() {
    if (res.getData('errors') == 0) {
        _answer.value = ''
        _tips.classList.add('hide')
        _siguiente.classList.add('hide')
        res.setEcuacion()
    } else {
        if (res.getData('errors') === 3) {
            _tips.classList.remove('hide')
        } else if (res.getData('errors') === 5) {
            _siguiente.classList.remove('hide')
        }
    }
}

//Pone el numero de intentos que se tiene para mover piezas
function setIntentos() {
    switch (res.getData('correct')) {
        case 1:
            puzzle.setMoves('intent', 1)
            break;
        case 2:
            puzzle.setMoves('intent', 2)
            break;
        case 3:
            puzzle.setMoves('intent', 3)
            break;
        default:
            puzzle.setMoves('intent', 4)
    }
}

//Captura el evento por teclas dentro del input respuestas,
//si es ENTER lanza la funcion mostrar()
function enter(e) {
    if (e.keyCode == 13) {
        if ($('#respuestas').val().match('([0-9]+[\\/\\.]?[0-9]+)|([0-9]+)')) {
            sendAnswer()
        } else {
            soundEffect('../effects/Wrong-answer-sound-effect.mp3')
        }
        return false
    }
}

//Animacion y efecto de sonidos de los iconos al cometer errores o al acertar
function iconAnimation(num) {
    var icono = (num == 1) ? 'done' : 'close'
    var bien = ['green-text', 'text-darken-4']
    var mal = ['red-text', 'text-darken-4']
    var clases = (num == 1) ? bien : mal
    var a_src = (num == 1) ? '../effects/Correct-answer.mp3' : '../effects/Wrong-answer-sound-effect.mp3'

    _icono.innerHTML = icono
    for (i of clases) {
        _icono.classList.add(i)
    }

    soundEffect(a_src)

    _icono.classList.remove('hide')

    setTimeout(function() {
        _icono.classList.add('hide')
        for (i of clases) {
            _icono.classList.remove(i)
        }
    }, 2000);


}

/**
 * @summary Efectos de sonido
 **/
function soundEffect(src) {
    _efecto.src = src
    _efecto.volume = .1
    _efecto.play()
}

//Al cargas la pagina game.html lanza la funcion setEcuacion()
//y pone el simbolo igual entre los terminos
window.onload = () => {
    res.setEcuacion();
}

//Eventos en los distintos botones
_answer.onkeypress = enter

//Variables y funciones exportadas
exports.updateEcua = function() {
    updateErrors(0)
}