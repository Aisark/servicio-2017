const storage = require('electron-storage');
const jstorage = require('electron-json-storage');
const path = require('path')
const fs = require('fs');


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
function setFileJSON() {
  fs.readFile(path.join(__dirname,'files/settingsDefault.json'), 'utf8', function (err, data) {
    if (err){
      throw err
    } else {
      var obj = JSON.parse(data);
      creatJSON(obj)
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
function creatJSON(obj) {
  storage.set('storage/settings', obj)
  .then(() => {
  })
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
module.exports = ()=>{
  storage.isPathExists('storage/settings.json', (itDoes) => {
    if (itDoes) {
    }else {
      setFileJSON()
    }
  });
};
