const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const db = new sqlite3.Database('Users.db');


exports.getUser = function (user) {
  return new Promise(function(resolve, reject) {
    db.parallelize(function () {
      var query = util.format( "select USERNAME,PWORD from MAESTROS where USERNAME='%s'",user)
      db.get(query,function (err,data) {
        if(err || data==undefined)reject(err)
        resolve(data)
      })
    })
  });
}



//
