var rows = 5; // global
var cols = 5; // global
var w,h;
var board;
var source;
var currImage;
var isOriginalShown = false;
var dropzone;

function handleDrag(){
    dropzone.style("background-color","lightblue")
    
}

function handleDragLeave(){
    dropzone.style("background-color","white")

}

function preload(){
    currImage = loadImage("media/defaultImage.jpeg");
    source = currImage;
}

function setup() {
    let cnv = createCanvas(600, 600);
    cnv.parent('container')
    cnv.style("position","absolute")
    cnv.center()

    dropzone = select(".left")
    dropzone.dragOver(handleDrag)
    dropzone.dragLeave(handleDragLeave)


    source.resize(600,600)
   
    w = width / rows;
    h = height / cols;

    board = new Board(w,h);
    for (let i = 0; i < rows; i++) {
        for(let j = 0;j < cols;j++){
            let img = createImage(w,h)
            let tile = new Tile(i,j,img,w,h);
            board.setIndex(i,j,tile);
            
        }
    }
    board.setLastPiece(board.tiles[rows - 1][cols - 1])
    board.tiles[rows - 1][cols - 1] = -1
}

function mousePressed(){
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if( i < rows && j < cols && i > -1 && j > -1 && !isOriginalShown) board.move(i,j) 
}

function draw(){
    background(0)
    
    board.updateTiles(source)
    board.draw();

    if(!board.isSolved() && !isOriginalShown){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              let x = i * w;
              let y = j * h;
              strokeWeight(2);
              noFill();
              rect(x, y, w, h);
            }
          }  
    }
    board.renderLastPiece()

}