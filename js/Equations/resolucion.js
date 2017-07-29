const ecuacion = require('../../js/Equations/funciones.js');
const solu = require('../../js/Equations/solucion.js');

var _terminos = {
    errors: 0,
    correct: 0,
    global: 0,
    score: 0,
    lvl: "",
    ecuacion: [],
    m: ["", ""],
    mp: "",
    mp2: "",
    mp3: "",
    res: [0, 0]
}

//Suma la cantidad de terminos independientes y dependientes de ambos mienbros de una
//funcion
function respuesta() {
    var ax1 = _terminos.m[0].split(' ')
    var ax2 = _terminos.m[1].split(' ')

    var a1 = splitEcua(ax1)
    var a2 = splitEcua(ax2)
    _terminos.mp = a1[0] + "x " + a1[1] + " = " + a2[0] + "x " + a2[1]
    _terminos.mp2 = a1[0] + "x " + (-1 * a2[0]) + "x = " + a2[1] + " " + (-1 * a1[1])
    _terminos.mp3 = "x = " + (a2[1] - a1[1]) + "/" + (-1 * (a1[0] - a2[0]))
    _terminos.res[1] = (a1[0] - a2[0])
    _terminos.res[0] = (a2[1] - a1[1])
        //console.log(_terminos.c + '/' + _terminos.x);
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
        } else if (array[i] != "") {
            a[1] += parseInt(array[i])
        }
    }

    return a
}


exports.setEcuacion = function(lvl) {
    var n = ecuacion.ecuacion(lvl)
    _terminos.m[0] = (lvl == 1) ? n[0] : ecuacion.reduce(n[0])
    _terminos.m[1] = (lvl == 1) ? n[1] : ecuacion.reduce(n[1])
    respuesta()
    n[0] = (lvl == 1) ? n[0] : ecuacion.clsEcua(n[0])
    n[1] = (lvl == 1) ? n[1] : ecuacion.clsEcua(n[1])
    _terminos.ecuacion = n
    var cadena = n[0] + ' ' + ' = ' + ' ' + n[1]
    $('#ecuaMath').text(cadena)
    solu.getObj(lvl).then(function() {})
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