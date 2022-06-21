class Board{
    constructor(w,h){
        this.tiles = createNDimArray([rows,cols]);
        this.w = w;
        this.h = h;
        this.blankSpot = [rows - 1,cols - 1];
        this.lastPiece;
    }

    setIndex(i,j,tile){
        this.tiles[i][j] = tile;

    }

    setLastPiece(img){
        this.lastPiece = img

    }

    updateTiles(source){
        w = this.w;
        h = this.h;
        for (let i = 0; i < cols; i++) {
            for(let j = 0;j < rows;j++){
                let tile = this.tiles[i][j]
                let x = tile.originI * w;
                let y = tile.originJ * h;
                tile != -1 && tile.img.copy(source,x,y,w,h,0,0,w,h);
            }
        }
    }

    isNeighbor(t1){
        let [a1,a2] = this.blankSpot
        let c1 = abs(t1.currI - a1)
        let c2 = abs(t1.currJ - a2)
        if((c1 != c2) && (c1 < 2) && c2 < 2) return true;
        return false;
    }

    move(i,j){
        let tile = this.tiles[i][j];
        let a = this.isNeighbor(tile)
        let [a1,a2] = this.blankSpot
        if(a){
            let temp = this.tiles[i][j];
            this.tiles[i][j] = this.tiles[a1][a2]
            this.tiles[a1][a2] = temp;
            this.blankSpot = [i,j]
            tile.setIndexes(a1,a2);

        }
        this.shuffleTiles(this.tiles)
    }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    shuffleTiles(arr){
        const oneDimArr = arr.reduce((a, b) => [...a, ...b], []);
        this.shuffleArray(oneDimArr); // this is your existing function
        const shuffled2DimArr = oneDimArr.reduce((acc, i) => {
            if(acc[acc.length-1].length >= cols) { // here we build 2 cols
              acc.push([]);
            }
            acc[acc.length-1].push(i);
            return acc;
          }, [[]]);
          console.log(shuffled2DimArr)
    }

    isSolved(){
        for (let i = 0; i < rows; i++) {
            for(let j = 0;j < cols;j++){
                let tile = this.tiles[i][j];
                if(tile.originI != tile.currI || tile.originJ != tile.currJ){
                    return false
                }
            }
        }
        return true
    }
    
    draw(){
        for (let i = 0; i < cols; i++) {
            for(let j = 0;j < rows;j++){
                this.tiles[i][j] != -1 && this.tiles[i][j].draw();
            }
        }

    }
}

// [0,0] [0,1] [0,2]
// [1,0] [1,1] [1,2]
// [2,0] [2,1] [2,2]


// https://stackoverflow.com/questions/12588618/javascript-n-dimensional-array-creation
function createNDimArray(dimensions) {
    if (dimensions.length > 0) {
        var dim = dimensions[0];
        var rest = dimensions.slice(1);
        var newArray = new Array();
        for (var i = 0; i < dim; i++) {
            newArray[i] = createNDimArray(rest);
        }
        return newArray;
     } else {
        return null;
     }
 }


 function myF(row,cols){
    var newArray = []
    for(let i = 0; i < row;i++){
        newArray[i] = new Array(cols).fill(null)
    }
    return newArray
}

