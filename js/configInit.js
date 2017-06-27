const noUiSlider = require('../noUiSlider/nouislider.min.js')
const wNumb = require('../noUiSlider/wNumb.js')
const config = require('../modulos/config.js')

var slider = document.getElementById('volRange')

noUiSlider.create(slider, {
  start: 100,
  connect: [true,false],
  step: 1,
  range: {'min': 0 , 'max': 10},
  format: wNumb({decimals: 0})
})

function loadObject() {
  config.getOBjc().then(function (data) {
    console.log('promise');
    console.log(data);
    $('#banner').text('Presiona para iniciar')
    $('.progress').addClass('hide')
    $('#iniciar').removeClass('hide disabled')
  })
}

$(document).ready(function () {
  loadObject()
})

$('#closeConfig').on('click',function () {
  var vol = slider.noUiSlider.get(),
      effec = $('#effSound').prop('checked')

  config.setItemObject(vol,"volEffects")
  config.setItemObject(effec,"stateEffects")
})
$('#agreGame').on('click',function () {
  var nPuzz = $('input:radio[name=dif1]:checked').val(),
      nEcua = $('input:radio[name=dif2]:checked').val(),
      urlImg = document.getElementById('urlimg').files[0].path

  config.setItemObject(nPuzz,'lvlPuzz')
  config.setItemObject(nEcua,'lvlEcua')
  config.setItemObject(urlImg,'urlImg')

  config.setObject().catch(function (error) {
    console.log(error);
  })
})



//
