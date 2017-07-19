function subFormat(cadena) {
    return cadena.substr(0, 1) + cadena.substr(1, cadena.length - 1).toLowerCase()
}

exports.camelUp = function(data) {
    var nwnombre = ''
    var arr = data.split(' ')
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length != 0) {
            nwnombre += subFormat(arr[i]) + ' '
        }
    }
    return nwnombre
}