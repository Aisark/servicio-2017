//const db = require('../js/ScriptsDB/database.js');
function logUSer(user,tipo) {
  var pasw = $('#pass'+user).val()
  var user = $('#user'+user).val()

  if(!user==''&&!pasw==''){
    db.getUser(user,tipo).then(function (data) {
      if(data.PWORD===pasw){
        Materialize.toast('Bienvenido '+user, 4000)
      }else{
        Materialize.toast('Contraseña Incorrecta', 4000)
      }
    })
    .catch(function () {
      Materialize.toast('El usuario no esta registrado', 4000)
    })
  }else{
    Materialize.toast('Datos vacios', 4000)
  }

}

$('#senStuden').on('click',function () {
  logUSer('Stu','ALUMNOS')
})

$('#sendMa').on('click',function () {
  logUSer('Teach','MAESTROS')
})

$(document).ready(function () {
  
})
