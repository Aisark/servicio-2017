const btn = require('../js/Events/btn.js');
const proceso = require('../js/Equations/procSolucion');
const pasos = require('../js/Equations/pasos.js');

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    var _closeV = document.getElementById('closeTM')
    var _video = document.getElementById('vTutorial')


    $('#tipsM').modal({
      complete: function () { _video.pause() },
      ready: function () { setTimeout(function () {
        _video.play()
      }, 1000);}
    });

    $('#solucionM').modal({
      ready: function () {proceso.procSol()},
      complete: function () {
        btn.updateEcua()
        pasos.resetSteps();
      }
    });

  });
