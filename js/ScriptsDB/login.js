const db = require('./basedatos.js')
const {ipcRenderer} = require('electron')

function logUSer(user,tipo) {
  var pasw = $('#pass'+user).val()
  var user = $('#user'+user).val()

  if(!user==''&&!pasw==''){
    db.getUser(user,tipo).then(function (data) {
      if(data.PWORD===pasw){
        $('.habilitado').addClass('desabilitado')
        $('.progress').removeClass('hide')
        ipcRenderer.send('show-window',0)
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

function setTeachList() {
  try {
    db.getMaestros().then(function (array) {
      array.forEach(function (data) {
        var elem = '<option value="'+data.rowid+'">'+data.NOMBRE+' '+data.AP_PAT+'</option>'
        $('select').append(elem)
      })
      $('select').material_select();
    }).catch(function (err) {
      var elem = '<option>'+' No hay maestros '+'</option>'
      $('select').append(elem)
      Materialize.toast(err, 10000)
    })
  } catch (e) {
    Materialize.toast(e+' set',20000)
  }

}

$('#senStuden').on('click',function () {
  try {
    logUSer('Stu','ALUMNOS')
  } catch (e) {
    Materialize.toast(e,20000)
  }
})

$('#sendMa').on('click',function () {
  logUSer('Teach','MAESTROS')
})

$(document).ready(function () {
  try {
    setTeachList()
  } catch (e) {
    Materialize.toast(e,20000)
  }

})
