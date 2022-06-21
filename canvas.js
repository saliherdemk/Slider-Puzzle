var rows = 3; // global
var cols = 3; // global
var w,h;
var board;
var source;

function setup() {
    createCanvas(600, 600);
    source = createCapture(VIDEO)
    source.size(600,600)
    source.hide()
    w = width / cols;
    h = width / rows;

    board = new Board(w,h);
    for (let i = 0; i < cols; i++) {
        for(let j = 0;j < rows;j++){
            let img = createImage(w,h)
            let tile = new Tile(i,j,img,w,h);
            board.setIndex(i,j,tile);
        }
    }
    board.setLastPiece(board.tiles[rows - 1][cols - 1])
    board.tiles[cols - 1][rows - 1] = -1

}

function mousePressed(){
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if( i < 3 && j < 3 && i > -1 && j > -1) board.move(i,j) 
}


function draw(){
    background(0)
    board.updateTiles(source)
    board.draw();

    if(!board.isSolved()){
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              let x = i * w;
              let y = j * h;
              strokeWeight(2);
              noFill();
              rect(x, y, w, h);
            }
          }    
    }
    // else{
    //     board.tiles[rows - 1][cols - 1] = board.lastPiece
    // }
    
}

