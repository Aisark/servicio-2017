const res = require('../../js/Equations/resolucion.js');

var _func = document.getElementById('solFun')
var _sumTer = document.getElementById('solTerSem')
var _reunTer = document.getElementById('reunTerm')
var _sumTS = document.getElementById('sumTS')
var _resX = document.getElementById('resX')
var aux = ['', '', '', '']

function procSolucion() {
    _func.innerHTML = res.getData('m1') + ' = ' + res.getData('m2')
    _sumTer.innerHTML = sumTerm()
    _reunTer.innerHTML = reunTerm()
    _sumTS.innerHTML = res.getData('x') + 'x' + ' = ' + res.getData('c')
    _resX.innerHTML = 'x = ' + res.getData('c') + '/' + res.getData('x')
}

function sumTerm() {
    aux[0] = (res.getData('m1X') === 0) ? '' : res.getData('m1X')
    aux[1] = (res.getData('m1I') === 0) ? 0 : res.getData('m1I')
    aux[2] = (res.getData('m2X') === 0) ? '' : res.getData('m2X')
    aux[3] = (res.getData('m2I') === 0) ? 0 : res.getData('m2I')

    var s1 = (aux[1] >= 0 && aux[0] != '') ? '+' : ''
    var s2 = (aux[3] >= 0 && aux[2] != '') ? '+' : ''
    var x1 = (aux[0] == '') ? '' : 'x'
    var x2 = (aux[2] == '') ? '' : 'x'

    return aux[0] + x1 + s1 + aux[1] + ' = ' + aux[2] + x2 + s2 + aux[3]
}

function reunTerm() {
    var a1 = (aux[2] === '') ? 0 : (-1 * aux[2])
    var a2 = (aux[1] === 0) ? 0 : (-1 * aux[1])

    var s1 = (a1 >= 0 && aux[0] != '') ? '+' : ''
    var s2 = (a2 >= 0) ? '+' : ''
    var x1 = (aux[0] == '') ? '' : 'x'
    var x2 = (aux[2] == '') ? '' : 'x'

    return aux[0] + x1 + s1 + a1 + x2 + ' = ' + aux[3] + s2 + a2
}


exports.procSol = function() {
    procSolucion()
}