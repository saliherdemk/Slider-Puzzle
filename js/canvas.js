var rows = 3; // global
var cols = 3; // global
var w,h;
var board;
var source;
var currImage;
var isOriginalShown = false;
var dropzone;
var sourceType = "img";


function gotFile(file){
    preload(file.data)
}

function preload(myImg = "media/defaultImage.jpeg"){
    currImage = loadImage(myImg);
    changeToImage()
    closePopup()
}

function setup() {
    let cnvContainer = select(".cnv-container")
    let cnv = createCanvas(600, 600);
    cnv.parent(cnvContainer)
    cnv.drop(gotFile);

    cnvContainer.center()
   
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
    if(sourceType == "img"){
        source.resize(600,600)
    }

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