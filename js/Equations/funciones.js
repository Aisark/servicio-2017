/*
*    Genera una ecuacion  con un maximo de 4 terminos
*    aleatoriamente en cada miembro, entre terminos
*    independientes y dependientes, cuya suma total de
*    x no sea igual a cero.
*/
var operFirst = ['','-']
var operLast = ['+','-']
var ecuacionFinal

//Regresa un numero aleatorio del 0 al 1
//que sirve para definir el tipo de operador
function tipoNum(){
  return Math.floor(Math.floor(Math.random() * 2));
}

//Regresa un numero aleatorio del 1 al 4
//define la cantidad de terminos de un miembro
function cantTerminos() {
  return Math.floor(Math.random() * 4) + 1;
}

//Regresa un numero aleatorio del 1 al 10 que
//define el coeficiente de termino dependiente
//o un termino independiente
function coefiNum(){
  return Math.floor(Math.random() * 10) + 1;
}

//Regresa el termino generado aleatoriamente
function termino(tipo) {
  var term;

  if(tipo==0){
    var c = coefiNum();
    term = (c==1) ? 'x':(c + 'x')
  }
  else{
    term = coefiNum()
  }

  return term;
}

//Regresa un miembro con terminos aleatorios,
//con un maximo de 4 y un minimo de 1, con terminos
// dependientes e independientes
function miembro() {
  var miembro
  for (var i = 0; i < cantTerminos(); i++) {
    if(i===0){
      miembro = operFirst[tipoNum()]+termino(tipoNum());
    }else{
      miembro += ' ' + operLast[tipoNum()]+termino(tipoNum());
    }
  }

  return miembro
}

//Regresa verdadero, si un miembro contiene
//solamente terminos dependientes
function allContX(array) {
  var flag = true

  for (var i = 0; i < array.length; i++) {
    if(!isNaN(array[i])){
      flag =false;
      break;
    }
  }

  return flag;
}

//Regresa verdadero, si un miembro contiene
//solamente terminos independientes
function allContNumber(arreglo) {
  var flag = true
  for (var i = 0; i < arreglo.length; i++) {
    if(isNaN(arreglo[i])){
      flag =false;
      break;
    }
  }

  return flag;
}

//Regresa array con  una ecuacion aleatorio, asegurandose
//que ningun miembro sea totalmente de un tipoNum
//determinado de terminos, si el evento del boton siguiente es lanzado
//regresa una ecuacion con la misma cantidad de terminos que la anterior
exports.ecuacion = function () {
  var miembros = [miembro(),miembro()]
  var arr1 = miembros[0].split(' ')
  var arr2 = miembros[1].split(' ')
  var flag1 = allContX(arr1) && allContX(arr2) || ZeroX(arr1,arr2)
  var flag2 = allContNumber(arr1) && allContNumber(arr2) || ZeroX(arr1,arr2)

  while (flag1 || flag2) {
    miembros[0] = miembro()
    miembros[1] = miembro()
    arr1 = miembros[0].split(' ')
    arr2 = miembros[1].split(' ')
    flag1 = allContX(arr1) && allContX(arr2) || ZeroX(arr1,arr2)
    flag2 = allContNumber(arr2) && allContNumber(arr2) || ZeroX(arr1,arr2)
  }

  return miembros

}

//Regresa verdadero si la suma total de las x es igual a cero
function ZeroX(array1,array2) {
  var a1 = contX(array1)
  var a2 = contX(array2)

  return ((a1-a2)===0)

}

//Suma el valor de todas las x
function contX(array) {
  var a = 0

  for (var i = 0; i < array.length; i++) {
    if(array[i].includes("x")){
      switch (array[i]) {
        case 'x':
          a++
          break;
        case '-x':
          a--
          break;
        default:
          a+=  parseInt(array[i].replace("x",""))
      }
    }
  }

  return a
}

exports.cantTerminos = ()=>{return cantTerminos()}
