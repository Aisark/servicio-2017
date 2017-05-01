const res = require('../js/resolucion.js');
const PUZZLE_DIFFICULTY = 3
const PUZZLE_HOVER_TINT = '#378A37';

var _efecto = document.getElementById('efecto')
var _enviar = document.getElementById('enviar')
var _respuesta = document.getElementById('respuestas')
var _intentos = document.getElementById('intentos')
var _ban = {intent:0} //piezas que se puedan mover

var _canvas
var _stage

var _img
var _pieces
var _Width
var _Height
var _puzzleWidth
var _puzzleHeight
var _pieceWidthImg //tamaño de la anchura de la piezas en la imagen original
var _pieceHeightImg //tamaño de la altura de la piezas en la imagen original
var _pieceWidthCanvas  //tamaño de la anchura de la piezas en el canvas
var _pieceHeightCanvas //tamaño de la altura de la piezas en el canvas
var _currentPiece
var _currentDropPiece

var _mouse

function init() {
  _img = new Image()
  _img.addEventListener('load',onImage,false)
  _img.src = '../img/img-1.jpg'
}

function onImage() {
  _pieceWidthImg = Math.floor(_img.width / PUZZLE_DIFFICULTY)
  _pieceHeightImg = Math.floor(_img.height / PUZZLE_DIFFICULTY)
  _pieceWidthCanvas = 850 / PUZZLE_DIFFICULTY
  _pieceHeightCanvas = 480 / PUZZLE_DIFFICULTY
  _puzzleWidth = _pieceWidthCanvas * PUZZLE_DIFFICULTY;
  _puzzleHeight = _pieceHeightCanvas * PUZZLE_DIFFICULTY;
  _Width = _pieceWidthImg * PUZZLE_DIFFICULTY;
  _Height = _pieceHeightImg * PUZZLE_DIFFICULTY;
  setCanvas();
  initPuzzle();
}

function setCanvas(){
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.width =  _puzzleWidth
    _canvas.height = _puzzleHeight
    _canvas.style.border = "1px solid black";
}

function initPuzzle(){
    _pieces = [];
    _mouse = {x:0,y:0};
    _currentPiece = null;
    _currentDropPiece = null;
    _stage.drawImage(_img,0, 0, _Width, _Height, 0, 0, _puzzleWidth, _puzzleHeight );
    createTitle("Click para Iniciar");
    buildPieces();
    _canvas.style.backgroundColor = "white"
    _enviar.classList.add('disabled')
    _respuesta.disabled = true
}

function createTitle(msg){
    _stage.fillStyle = "#000000";
    _stage.globalAlpha = .4;
    _stage.fillRect(100,  _puzzleHeight - 40,_puzzleWidth - 200,40);
    _stage.fillStyle = "#FFFFFF";
    _stage.globalAlpha = 1;
    _stage.textAlign = "center";
    _stage.textBaseline = "middle";
    _stage.font = "20px Arial";
    _stage.fillText(msg,_puzzleWidth / 2,  _puzzleHeight - 20);
}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        _pieces.push(piece);
        xPos += _pieceWidthImg;
        if(xPos >= _Width){
            xPos = 0;
            yPos += _pieceHeightImg;
        }
    }

    _canvas.addEventListener("mousedown",onceShuffle)
}

function onceShuffle() {
  _enviar.classList.remove('disabled')
  _respuesta.disabled = false
  _canvas.removeEventListener('mousedown',onceShuffle)
  shufflePuzzle()
}

function shufflePuzzle(e){
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    var xPos2 = 0;
    var yPos2 = 0;

    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.xPos2 = xPos2;
        piece.yPos = yPos;
        piece.yPos2 = yPos2;
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidthImg, _pieceHeightImg, xPos2, yPos2, _pieceWidthCanvas, _pieceHeightCanvas);
        _stage.strokeRect(xPos2, yPos2, _pieceWidthCanvas,_pieceHeightCanvas);
        xPos += _pieceWidthImg;
        xPos2 += _pieceWidthCanvas;
        if(xPos >= _Width){
            xPos = 0;
            xPos2 = 0;
            yPos += _pieceHeightImg;
            yPos2 += _pieceHeightCanvas;
        }
    }

    _canvas.onmousedown = onPuzzleClick;

}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e){

  if(_ban.intent>0){
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX;
        _mouse.y = e.layerY;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX;
        _mouse.y = e.offsetY;
    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        _stage.clearRect(_currentPiece.xPos2,_currentPiece.yPos2,_pieceWidthCanvas,_pieceHeightCanvas);
        _stage.save();
        _stage.globalAlpha = .9;
        _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidthImg, _pieceHeightImg, _mouse.x - (_pieceWidthCanvas / 2), _mouse.y - (_pieceHeightCanvas / 2), _pieceWidthCanvas, _pieceHeightCanvas);
        _stage.restore();
        _canvas.onmousemove = updatePuzzle;
        _canvas.onmouseup = pieceDropped;

    }
  }else{
    _efecto.src = "../effects/Computer-Error.mp3"
    _efecto.volume = .3
    _efecto.play()
  }


}

function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < piece.xPos2 || _mouse.x > (piece.xPos2 + _pieceWidthCanvas) || _mouse.y < piece.yPos2 || _mouse.y > (piece.yPos2 + _pieceHeightCanvas)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e){
    _currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX;
        _mouse.y = e.layerY;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX;
        _mouse.y = e.offsetY;
    }
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(piece == _currentPiece){
            continue;
        }
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidthImg, _pieceHeightImg, piece.xPos2, piece.yPos2, _pieceWidthCanvas, _pieceHeightCanvas);
        _stage.strokeRect(piece.xPos2, piece.yPos2, _pieceWidthCanvas,_pieceHeightCanvas);
        if(_currentDropPiece == null){
            if(_mouse.x < piece.xPos2 || _mouse.x > (piece.xPos2 + _pieceWidthCanvas) || _mouse.y < piece.yPos2 || _mouse.y > (piece.yPos2 + _pieceHeightCanvas)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                _stage.save();
                _stage.globalAlpha = .4;
                _stage.fillStyle = PUZZLE_HOVER_TINT;
                _stage.fillRect(_currentDropPiece.xPos2,_currentDropPiece.yPos2,_pieceWidthCanvas, _pieceHeightCanvas);
                _stage.restore();
            }
        }
    }
    _stage.save();
    _stage.globalAlpha = .6;
    _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidthImg, _pieceHeightImg, _mouse.x - (_pieceWidthCanvas / 2), _mouse.y - (_pieceHeightCanvas / 2), _pieceWidthCanvas, _pieceHeightCanvas);
    _stage.restore();
    _stage.strokeRect( _mouse.x - (_pieceWidthCanvas / 2), _mouse.y - (_pieceHeightCanvas / 2), _pieceWidthCanvas,_pieceHeightCanvas);0
}

function pieceDropped(e){
    _canvas.onmousemove = null;
    _canvas.onmouseup = null;
    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos,xPos2:_currentPiece.xPos2,yPos2:_currentPiece.yPos2};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;

        _currentPiece.xPos2 = _currentDropPiece.xPos2;
        _currentPiece.yPos2 = _currentDropPiece.yPos2;
        _currentDropPiece.xPos2 = tmp.xPos2;
        _currentDropPiece.yPos2 = tmp.yPos2;
        _ban.intent--//actualiza los intentos para mover piezas
        _intentos.innerHTML = _ban.intent
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin(){
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidthImg, _pieceHeightImg, piece.xPos2, piece.yPos2, _pieceWidthCanvas, _pieceHeightCanvas);
        _stage.strokeRect(piece.xPos2, piece.yPos2, _pieceWidthCanvas,_pieceHeightCanvas);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}

function gameOver(){
    _canvas.onmousedown = null;
    _canvas.onmousemove = null;
    _canvas.onmouseup = null;
    res.terminos.goods = 0
    _ban.intent=0//actualiza los intentos para mover piezas
    _intentos.innerHTML = _ban.intent
    initPuzzle();
}

//document.getElementById('reinicio').onclick = gameOver

exports.init = init();
exports.canv = _canvas
exports._ban = _ban
