const storage = require('electron-storage');
const jstorage = require('electron-json-storage');
const path = require('path')
const fs = require('fs')

var object;

/**
 * @summary Obtener Objecto JSON
 * @function
 * @publica
 *
 * @description
 * Obtiene un objeto apartir de un archivo json y lo guarda en el objeto
 * "object", retorna una promesa
 *
 *
 **/
exports.getOBjc = function(file) {
    return new Promise(function(resolve, reject) {
        var arc = (file == undefined) ? 'settings' : file
        jstorage.get(arc, function(error, data) {
            if (error) {
                reject(error);
            }
            object = data;
            resolve()
        })
    });
}

/**
 * @summary Pone un  Objecto  en un archivo JSON
 * @function
 * @publica
 *
 * @description
 * coloca el objecto "object" dentro de un archivo JSON y regresa una promesa
 *
 *
 **/
exports.setObject = function(obj) {
    return new Promise(function(resolve, reject) {
        var ob = (obj == undefined) ? object : obj
        jstorage.set('settings', ob, function(error) {
            if (error) reject(erro);
            resolve()
        })
    });
}

/**
 * @summary Obtener item del Objecto "object"
 * @function
 * @publica
 *
 * @description
 * Obtiene un item del objeto "object" y retorna su valor, si el item es otro objeto
 * , segundo parametro sirve para buscar un item especfico de el, de otra forma devolvera
 * el objecto completo
 *
 * @param {item} String
 * @param {item} String (Opcional)
 **/
exports.getItemObj = function(item, item2) {
    if (item2 === undefined) {
        return object[item]
    } else {
        return object[item][item2]
    }
}

/**
 * @summary Modifica un item del Objecto "object"
 * @function
 * @publica
 *
 * @description
 * Modifica un item del objeto "object" , si el item es otro objeto
 * , segundo parametro sirve para modificar un item especfico de el, de otra forma
 * modificara el objecto completo
 *
 * qparam {data} String || Int || Object || Boolean
 * @param {item} String
 * @param {item} String (Opcional)
 **/
exports.setItemObject = function(data, item, item2) {
    if (item2 === undefined) {
        object[item] = data
    } else {
        object[item][item2] = data
    }
}