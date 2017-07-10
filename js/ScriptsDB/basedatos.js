const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const db = new sqlite3.Database('Users.db');

const tabMaes = 'CREATE TABLE MAESTROS(NOMBRE VARCHAR(30),AP_PAT VARCHAR(10),AP_MAT VARCHAR(10),PWORD VARCHAR(15),USERNAME VARCHAR(8) UNIQUE)'
const insMaes = 'insert into MAESTROS values("OBI","WAN","KENOBI","cooksith","benkeno")'
const tabAlum = 'CREATE TABLE ALUMNOS(NUMCON INT UNIQUE,NOMBRE VARCHAR(30),AP_PAT VARCHAR(10),AP_MAT VARCHAR(10),PWORD VARCHAR(15),USERNAME VARCHAR(8) UNIQUE,SEXO VARCHAR(1),ID_MAESTRO INTEGER,MAX_LVL_ECU VARCHAR(3),ECU_RESOL INT,ECU_FAIL INT,TIME_GAME INT,CHECK (SEXO IN ("H","M")),CHECK (MAX_LVL_ECU IN ("FAC","MED","DIF")),FOREIGN KEY (ID_MAESTRO) REFERENCES MAESTROS(rowid))'

/*db.serialize(function () {
  db.all('SELECT name FROM sqlite_master WHERE name ="myTable" and  type="table"',function (err,row) {
    if(err)console.log(err);
    if(row==undefined||row==null || row.length==0)console.log('no existe la tabla');
    console.log(row);
  })
})*/


exports.getUser = function (user,tipo) {
  return new Promise(function(resolve, reject) {
    db.parallelize(function () {
      var query = util.format( "select PWORD from %s where USERNAME='%s'",tipo,user)
      db.get(query,function (err,data) {
        if(err || data==undefined)reject(err)
        resolve(data)
      })
    })
  });
}

exports.getMaestros = function () {
  return new Promise(function(resolve, reject) {
    db.parallelize(function () {
      db.all('select rowid,NOMBRE,AP_PAT from MAESTROS',function (err,array) {
        if(err)reject(err)
        resolve(array)
      })
    })
  });
}

exports.setStudents = function (array) {
  return new Promise(function(resolve, reject) {
    db.parallelize(function () {
      db.run("insert into ALUMNOS (NOMBRE,AP_PAT,AP_MAT,USERNAME,PWORD,SEXO,ID_MAESTRO) values (?,?,?,?,?,?,?)",array,function (err) {
        if(err)reject(err)
        resolve()
      })
    })
  });
}

exports.getUserAvia = function (tipo) {
  return new Promise(function(resolve, reject) {
    db.parallelize(function () {
      var query = util.format( "select USERNAME from %s",tipo)
      db.all(query,function (err,array) {
        if(err || array==undefined)reject(err)
        resolve(array)
      })
    })
  });
}

exports.checkedTables = function () {
  return new Promise(function(resolve, reject) {
    db.serialize(function () {
      db.all('SELECT name FROM sqlite_master WHERE type="table"',function (err,row) {
        if(err||row==undefined||row==null || row.length==0){
          console.log('creando tablas');
          try {
            db.serialize(function () {
              db.run(tabMaes)
              db.run(tabAlum)
              db.run(insMaes)
            })
            resolve('Tablas creadas');
          } catch (e) {
            reject(e)
          }
        }else {
          resolve('Hay tablas existentes')
        }
      })
    })
  });
}

//
