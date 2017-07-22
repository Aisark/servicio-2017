/*
 *    Genera una ecuacion  con un maximo de 4 terminos
 *    aleatoriamente en cada miembro, entre terminos
 *    independientes y dependientes, cuya suma total de
 *    x no sea igual a cero.
 */
var opPri = ['', '-']
var opSec = ['+', '-']
var ecuacionFinal


function numAle(ini, end) {
    return Math.floor(Math.random() * end) + ini
}

function facil(init, fin) {
    var ini = (init == undefined) ? 2 : init
    var ter = (fin == undefined) ? 4 : fin
    var miembro
    for (var i = 0; i < numAle(ini, ter); i++) {
        if (i === 0) {
            miembro = opPri[numAle(0, 2)] + termino(numAle(0, 2));
        } else {
            miembro += ' ' + opSec[numAle(0, 2)] + termino(numAle(0, 2));
        }
    }
    return miembro
}

function medio() {
    var miembro

    for (var i = 0; i < numAle(1, 2); i++) {
        if (i == 0) {
            miembro = opPri[numAle(0, 2)] + miParent(1, 2)
        } else {
            miembro += 'Y' + opSec[numAle(0, 2)] + miParent(1, 2)
        }
    }
    return miembro
}

function dificil() {
    var miembro

    for (var i = 0; i < numAle(1, 2); i++) {
        if (i == 0) {
            miembro = opPri[numAle(0, 2)] + termino(1) + miParent(1, 2)
        } else {
            miembro += 'Y' + opSec[numAle(0, 2)] + termino(1) + miParent(1, 2)
        }
    }
    return miembro
}

function reduce(equa) {
    var miembro = "",
        arra = equa.split('Y')
    arra.forEach(function(ele) {
        miembro += nwTermino(ele)
    });
    return miembro
}

function nwTermino(ter) {
    var fin = ter.search("\\("),
        mul = ter.substr(0, fin),
        nwter = ter.substr(fin, ter.length).replace(/[\(\)]/g, "").split(' '),
        nwmiembro = ""
    mul = (mul == "" || mul == "+") ? 1 : ((mul == "-") ? -1 : parseInt(mul))
    nwter.forEach(function(ele, index) {
        ele = (ele == 'x' || ele == '+x') ? '1x' : ((ele == '-x') ? '-1x' : ele)
        nwmiembro += (!ele.includes('x')) ? (mul * parseInt(ele)) + ' ' : (mul * parseInt(ele.replace('x', ''))) + 'x '
    });

    return nwmiembro
}

function miParent(ini, fin) {
    return '(' + facil(ini, fin) + ')'
}

//Regresa el termino generado aleatoriamente
function termino(tipo) {
    var term;

    if (tipo == 0) {
        var c = numAle(1, 10)
        term = (c == 1) ? 'x' : (c + 'x')
    } else {
        term = numAle(1, 10)
    }

    return term;
}

//Regresa un miembro con terminos aleatorios,
//con un maximo de 4 y un minimo de 1, con terminos
// dependientes e independientes
function miembro(dif) {
    var lvl = parseInt(dif)
    var miembro
    switch (lvl) {
        case 1:
            miembro = facil()
            break;
        case 2:
            miembro = medio()
            break;
        case 3:
            miembro = dificil()
            break;
    }
    return miembro
}

//Regresa verdadero, si un miembro contiene
//solamente terminos dependientes
function allContX(array) {
    var flag = true

    for (var i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) {
            flag = false;
            break;
        }
    }

    return flag;
}

//Regresa verdadero, si un miembro contiene
//solamente terminos independientes
function allContNumber(arreglo) {
    var flag = true
    for (var i = 0; i < arreglo.length; i++) {
        if (isNaN(arreglo[i])) {
            flag = false;
            break;
        }
    }

    return flag;
}

//Regresa array con  una ecuacion aleatorio, asegurandose
//que ningun miembro sea totalmente de un tipoNum
//determinado de terminos, si el evento del boton siguiente es lanzado
//regresa una ecuacion con la misma cantidad de terminos que la anterior
exports.ecuacion = function(lvl) {
    var aux = [miembro(lvl), miembro(lvl)]
    var miembros = [(lvl == 1) ? aux[0] : reduce(aux[0]), (lvl == 1) ? aux[1] : reduce(aux[1])]
    var flags = testEcuacion(miembros)

    while (flags[0] || flags[1]) {
        aux = [miembro(lvl), miembro(lvl)]
        miembros = [(lvl != 1) ? reduce(aux[0]) : aux[0], (lvl != 1) ? reduce(aux[1]) : aux[1]]
        flags = testEcuacion(miembros)
    }

    return aux
}

function testEcuacion(array) {
    var miem = [array[0].split(' '), array[1].split(' ')]
    var flags = [false, false]

    flags[0] = allContX(miem[0]) && allContX(miem[1]) || ZeroX(miem[0], miem[1])
    flags[1] = allContNumber(miem[0]) && allContNumber(miem[1]) || ZeroX(miem[0], miem[1])

    return flags
}


//Regresa verdadero si la suma total de las x es igual a cero
function ZeroX(array1, array2) {
    var a1 = countX(array1)
    var a2 = countX(array2)

    return ((a1 - a2) === 0)

}

//Suma el valor de todas las x
function countX(array) {
    var a = 0

    for (var i = 0; i < array.length; i++) {
        if (array[i].includes("x")) {
            switch (array[i]) {
                case 'x':
                    a++
                    break;
                case '-x':
                    a--
                    break;
                default:
                    a += parseInt(array[i].replace("x", ""))
            }
        }
    }

    return a
}

exports.reduce = (ecua) => { return reduce(ecua) }
exports.clsEcua = (ecua) => { return ecua.replace(/Y/g, ' ') }