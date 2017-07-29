const r = require('../../js/Equations/resolucion.js');
const config = require('../../modulos/config.js')
const func = require('../../js/Equations/funciones.js')

var etp = {
    "tip1": "",
    "tip2": "",
    "tip3": "",
    "tip4": "",
    "tip5": ""
}

exports.getObj = function(nivel) {
    return new Promise(function(resolve, reject) {
        config.getOBjc('steps').then(function() {
            setTips(nivel).then(function() {
                resolve()
            })
        })
    });

}

function setTips(type) {
    return new Promise(function(resolve, reject) {
        var tips = config.getItemObj(type)
        setEtapas(type)
        for (var key in tips) {
            $('.' + key).each(function(i, ele) {
                var txt = (i == 0) ? tips[key] : etp[key]
                $(this).text(txt)
            })
        }
    });
}

function setEtapas(t) {
    etp.tip1 = r.getData('ecuacion')[0] + ' = ' + r.getData('ecuacion')[1]
    etp.tip2 = (t == "1") ? clsCeros(r.getData('mp')) : clsCeros(r.getData('m')[0] + ' = ' + r.getData('m')[1])
    etp.tip3 = (t == "1") ? clsCeros(r.getData('mp2')) : clsCeros(r.getData('mp'))
    etp.tip4 = (t == "1") ? r.getData('mp3') : clsCeros(r.getData('mp2'))
    etp.tip5 = (t == "1") ? "" : r.getData('mp3')
}


function clsCeros(str) {
    var cad = ""
    var arr = str.split('=')
    cad = cls(arr[0]) + ' = ' + cls(arr[1])
    return cad

}

function cls(str) {
    var cad = ""
    var arr = str.split(' ')
    console.log(arr);
    arr.forEach(function(element, ind) {
        if (element != "") {
            if (element.includes("x")) {
                var num = parseInt(element.replace("x", ""))
                cad += (ind != 0) ? ((num >= 0) ? ' + ' + num + 'x' : ' - ' + (-1 * num) + 'x') : num + 'x'
            } else if (!isNaN(element)) {
                var num = parseInt(element)
                cad += (ind != 0) ? ((num >= 0) ? ' + ' + num : ' - ' + (-1 * num)) : num
            }
        }
    });
    return cad
}

//