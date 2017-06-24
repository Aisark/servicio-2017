const {ipcRenderer} = require('electron')
const remote = require('electron').remote
const path = require('path')
const url = require('url')
const noUiSlider = require('../noUiSlider/nouislider.min.js')
const wNumb = require('../noUiSlider/wNumb.js')

var slider = document.getElementById('volRange');

noUiSlider.create(slider, {
  start: 100,
  connect: [true,false],
  step: 1,
  range: {'min': 0 , 'max': 10},
  format: wNumb({decimals: 0})
})

function openMenu() {
  Materialize.showStaggeredList('#menuButtons');
  setTimeout(function () {
    $('#menuButtons').removeClass('hide')
  },100)
}

$(document).ready(function(){
  var animatedName = 'animated fadeOutRight'
  var animatedOne = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

  $('.parallax').parallax();
  $('.scrollspy').scrollSpy({scrollOffset:0});

  //Configuración de los madals
  $('#registro').modal({
    dismissible:false,
    endingTop: '15%',
    outDuration: 300,
    complete: function () {
      openMenu()
    }
  });
  $('#configs').modal({
    dismissible:false,
    opacity: .7,
    endingTop: '15%',
    outDuration: 300
  });
  $('#opcIni').modal({
    dismissible:false,
    opacity: .2,
    endingTop: '15%',
    inDuration:200,
    outDuration: 200
  })

  //Abrir modals dinamicamente
  $('#iniciar').on('click',function () {
    setTimeout(function () {
      $('#registro').modal('open');
    },320)
  });
  $('#openConfig').on('click',function () {
    setTimeout(function () {
      $('#configs').modal('open');
    },200)
  })

  //Abrir el modal de Opciones iniciales del juego
  $('#iniGame').on('click',function () {
    $('#menuButtons > li >a').addClass(animatedName).one( animatedOne , function () {
      $('#menuButtons').addClass('hide')
      $('#menuButtons > li >a').removeClass(animatedName)
      $('#opcIni').modal('open');
    });
  })

  //Cerrar modals dinamicamente
  $('#subSesion').on('click',function () {
    $('#registro').modal('close');
  });
  $('#closeConfig').on('click',function () {
    $('#configs').modal('close');
  });
  $('#canGame').on('click',function () {
    $('#opcIni').modal('close')
    openMenu()
  })

  //Iniciar juego principal
  $('#agreGame').on('click',function () {
    var linkUrl = url.format({
        pathname: path.join(__dirname,'../templates/main.html'),
        protocol: 'file:',
        slashes: true
      })
      $('#opcIni').modal('close');
      ipcRenderer.send('load-page', linkUrl)
  })

  //Cerrar aplicación
  $('#closeGame').on('click',function () {
    var win = remote.getCurrentWindow()
    win.close()
  })

});
