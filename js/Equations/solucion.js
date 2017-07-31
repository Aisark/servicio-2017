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
var _cont = 1
var _lvl = 0
exports.getObj = function(nivel) {
    return new Promise(function(resolve, reject) {
        config.getOBjc('steps').then(function() {
            _lvl = nivel
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

function showStep() {
    $('.panels a').click(function() {
        $(this).addClass('hide')
        _cont++
        var tab = 'step' + (_cont)
        $("[href='#" + tab + "']").removeClass('hide')
        $('ul.tabs').tabs('select_tab', tab)
        showContent()
    })
}

function showContent() {
    var cnt = '#step' + _cont
    setTimeout(function() {
        $(cnt + ' .card-panel').removeClass('hide')
    }, 1000)
    setTimeout(function() {
        $(cnt + ' h5').removeClass('hide')
    }, 3000)
    if (_lvl == 1) {
        if (_cont < 4) {
            setTimeout(function() {
                $(cnt + ' a').removeClass('hide')
            }, 6000)
        } else {
            setTimeout(function() {
                $('#modalXp .modal-close').removeClass('hide')
            }, 6000)
        }
    } else {
        if (_cont < 5) {
            setTimeout(function() {
                $(cnt + ' a').removeClass('hide')
            }, 6000)
        } else {
            setTimeout(function() {
                $('#modalXp .modal-close').removeClass('hide')
            }, 6000)
        }
    }
}

exports.reset = () => {
    _cont = 1
    $('ul.tabs').tabs('select_tab', 'step1')
    $('.panels .card-panel, .panels h5, #modalXp .modal-close').addClass('hide')
    for (var i = 2; i < 6; i++) {
        var tab = 'step' + (i)
        $("[href='#" + tab + "']").addClass('hide')
    }
}
exports.showContent = () => {
    showContent()
}
$(document).ready(function() {
    showStep()
})

//