const storage = require('electron-storage');
const jstorage = require('electron-json-storage');
const path = require('path')
const fs = require('fs')

var object;

var setObject= function (callback) {

}
exports.getOBjc = function () {
  return new Promise(function(resolve, reject) {
    jstorage.get('settings',function (error,data) {
      if(error){
        reject(error);
      }
      object = data;
      resolve(data)
    })
  });
}
exports.setObject = function () {
  return new Promise(function(resolve, reject) {
    jstorage.set('settings',object,function (error) {
      if (error) reject(erro);
      resolve()
    })
  });
}
exports.getItemObj = function (item,item2) {
  if(item2===undefined){
    return object[item]
  }else{
    return object[item][item2]
  }

}
exports.setItemObject = function (data,item,item2) {
  if(item2===undefined){
    object[item] = data
  }else{
    object[item][item2] = data
  }
}
