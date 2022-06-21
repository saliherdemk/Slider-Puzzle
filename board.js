class Board{
    constructor(rows,cols,w,h){
        this.tiles = createNDimArray([rows,cols]);
        this.solvedArr = createNDimArray([rows,cols]);
        this.w = w;
        this.h = h;
        this.blankSpot = [rows - 1,cols - 1];
    }

    setIndex(i,j,tile){
        this.tiles[i][j] = tile;
        this.solvedArr[i][j] = tile;

    }

    updateTiles(source){
        w = this.w;
        h = this.h;
        for (let i = 0; i < cols; i++) {
            for(let j = 0;j < rows;j++){
                let x = i * w;
                let y = j * h;
                this.tiles[i][j] != -1 && this.tiles[i][j].img.copy(source,x,y,w,h,0,0,w,h);
            }
        }
    }

    findBlank(){
        for(let i = 0;i < rows;i++){
            for(let j = 0;j < cols;j++){
                if(this.tiles[i][j] == -1) return [i,j]
            }
        }
    }

    isNeighbor(t1){
        // let [a1,a2] = this.findBlank();
        let [a1,a2] = this.blankSpot
        let c1 = abs(t1.i - a1)
        let c2 = abs(t1.j - a2)
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
    }

    
    draw(){
        // console.log(this.solvedArr)
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