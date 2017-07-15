const ecuacion = require('../../js/Equations/funciones.js');

var _terminos = {
    errors: 0,
    correct: 0,
    global: 0,
    score: 0,
    m1X: 0,
    m1I: 0,
    m2X: 0,
    x: 0,
    c: 0
}

//Suma la cantidad de terminos independientes y dependientes de ambos mienbros de una
//funcion
function respuesta() {
    var ax1 = _terminos.m1.split(' ')
    var ax2 = _terminos.m2.split(' ')

    var a1 = splitEcua(ax1)
    var a2 = splitEcua(ax2)
    _terminos.m1X = a1[0]
    _terminos.m1I = a1[1]
    _terminos.m2X = a2[0]
    _terminos.m2I = a2[1]
    _terminos.x = (a1[0] - a2[0])
    _terminos.c = (a2[1] - a1[1])
}

//Devuelve un arreglo con la suma de las x en un termino, y los terminos independientes
function splitEcua(array) {
    var a = [0, 0]

    for (var i = 0; i < array.length; i++) {
        if (array[i].includes("x")) {
            switch (array[i]) {
                case 'x':
                    a[0]++
                        break;
                case '+x':
                    a[0]++
                        break;
                case '-x':
                    a[0]--
                        break;
                default:
                    a[0] += parseInt(array[i].replace("x", ""))
            }
        } else {
            a[1] += parseInt(array[i])
        }
    }

    return a
}


exports.setEcuacion = function() {
    var n = ecuacion.ecuacion()
    _terminos.m1 = n[0]
    _terminos.m2 = n[1]
    respuesta()
    var cadena = n[0] + ' ' + ' = ' + ' ' + n[1]
    $('#ecuaMath').text(cadena)
}


exports.getData = function(index) {
    return _terminos[index]
}
exports.setData = function(index, data) {
    _terminos[index] = data
}
exports.modData = function(index, data) {
    _terminos[index] += data

}