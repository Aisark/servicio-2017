const storage = require('electron-storage');
const jstorage = require('electron-json-storage');
const path = require('path')
const fs = require('fs');

const stt = 'settings'
const stp = 'steps'

/**
 * @summary Set file settings.json
 * @function
 * @private
 *
 * @description
 * Copia un archivo json por deafult, y lo copia en un objeto javascript
 *
 * @param {obj} objeto javascript
 */
function setFileJSON(file) {
    fs.readFile(path.join(__dirname, 'files/' + file + '.json'), 'utf8', function(err, data) {
        if (err) {
            throw err
        } else {
            var obj = JSON.parse(data);
            creatJSON(obj, file)
        }
    });
}

/**
 * @summary Creat file settings.json
 * @function
 * @private
 *
 * @description
 * Crea el directorio userData y dentro el JSON 'settings.json'
 *
 * @param {obj} objeto javascript
 **/
function creatJSON(obj, file) {
    storage.set('storage/' + file, obj)
        .then(() => {})
        .catch(err => {
            console.error(err);
        });
}

/**
 * @summary Check settings.json
 * @function
 * @public
 *
 * @description
 * Verifica que el archivo 'settings.json' y el fichero 'userData' existe en el
 * directorio de datos del sistema de la aplicacion, si no existe
 * crea el directorio userData y dentro el JSON 'settings.json'
 *
 * @param {obj} objeto javascript
 **/
module.exports = () => {
    storage.isPathExists('storage/' + stt + '.json', (itDoes) => {
        if (itDoes) {} else {
            setFileJSON(stt)
        }
    });
    storage.isPathExists('storage/' + stp + '.json', (itDoes) => {
        if (!itDoes) {
            setFileJSON(stp)
        }
    });
};