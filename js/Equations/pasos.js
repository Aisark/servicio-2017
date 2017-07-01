const _nextStep = document.getElementById('nextStep')

var _steps = {curr:0}
var _pasos = document.getElementById('pasosUl').getElementsByTagName("li");

function showNextStep() {
  if (_steps.curr<_pasos.length) {
    //----------
    _pasos[_steps.curr].classList.remove('active')
    _pasos[_steps.curr].getElementsByTagName('div')[0].classList.remove('active');
    _pasos[_steps.curr].getElementsByTagName('div')[1].style.display = "none"
    //----------
    _pasos[_steps.curr+1].classList.remove('hide')
    _pasos[_steps.curr+1].classList.add('active')
    _pasos[_steps.curr+1].getElementsByTagName('div')[0].classList.add('active');
    _pasos[_steps.curr+1].getElementsByTagName('div')[1].style.display = "block"
    _pasos[_steps.curr+1].getElementsByClassName('collapsible-header')[0].classList.add('active');
    if ((_steps.curr+2)==_pasos.length) {
      _nextStep.classList.add('hide')
    }
    _steps.prev = _steps.curr
    _steps.curr = _steps.prev+1;
  }
}

exports.resetSteps = function() {
  _pasos[0].classList.add('active')
  _pasos[0].getElementsByTagName('div')[0].classList.add('active');
  _pasos[0].getElementsByTagName('div')[1].style.display = "block"

  for (var i = 1; i < _pasos.length; i++) {
    _pasos[i].classList.add('hide')
    _pasos[i].classList.remove('active')
    _pasos[i].getElementsByTagName('div')[0].classList.remove('active');
    _pasos[i].getElementsByTagName('div')[1].style.display = "none"
  }
  _steps = {curr:0}
  _nextStep.classList.remove('hide')
}

_nextStep.onclick = showNextStep

//
