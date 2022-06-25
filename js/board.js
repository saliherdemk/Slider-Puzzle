class Board{
    constructor(w,h){
        this.tiles = new Array(rows * cols);
        this.w = w;
        this.h = h;
        this.blankSpot = [Math.floor((this.tiles.length - 1) / rows),(this.tiles.length - 1) % rows];
        this.lastPiece;

    }

    setIndex(i,tile){
        this.tiles[i] = tile;

    }

    setLastPiece(tile){
        this.lastPiece = tile

    }

    setBlankSpot(index){
        this.blankSpot = [Math.floor(index / rows),index % rows]
    }

    renderLastPiece(){
        let tile = this.lastPiece
        let w = this.w;
        let h = this.h;
        let x = tile.originI * w;
        let y = tile.originJ * h;
        if(this.isSolved() || isOriginalShown){
            tile.img.copy(source,x,y,w,h,0,0,w,h)
            tile.drawOriginal()
            
        } else if(this.blankSpot[0] == rows -1 && this.blankSpot[1] == cols - 1){
            fill(0)
            rect(x, y, w, h);

        }
        
    }

    updateTiles(source){
        let w = this.w;
        let h = this.h;
        for (let i = 0; i < this.tiles.length; i++) {
                let tile = this.tiles[i]
                if(tile != -1){
                    let x = Math.floor(tile.currPos / rows) * w;
                    let y = tile.currPos % rows * h;
                    tile.img.copy(source,x,y,w,h,0,0,w,h);
                }
            }
    }

    isNeighbor(t1){
        if (t1 == -1) return false;
        let [a1,a2] = this.blankSpot;
        let [i,j] = t1.getCurrIndexes();
        let c1 = abs(i - a1)
        let c2 = abs(j - a2)
        if((c1 != c2) && (c1 < 2) && c2 < 2) return true;
        return false;
    }

    move(i,j){
        isFirstRender = false;
        let index = i * cols + j;
        let tile = this.tiles[index];
        let a = this.isNeighbor(tile)
        let [a1,a2] = this.blankSpot
        if(a){
            let blankIndex = a1 * cols + a2;

            let temp = this.tiles[index];
            this.tiles[index] = this.tiles[blankIndex]
            this.tiles[blankIndex] = temp;
            this.blankSpot = [i,j]
            tile.setIndex(blankIndex);

        }
        console.log(this.tiles)
    }

    isSolvable(arr){
        var numberInversions = 0;
        var prepArr = []
        var isSolvable = false;
        var blankRow;

        for(let i = 0; i < arr.length;i++){
            if(arr[i] == -1) {
                prepArr.push(-1)
                continue
            }
            let col = arr[i].currI;
            let row = arr[i].currJ;

            prepArr.push(cols * col + row);
        }


        for(let i = 0;i < prepArr.length;i++){
            if(prepArr[i] == -1){
                blankRow = i % rows;

                continue
            }
            for(let j = i + 1;j < prepArr.length;j++){
                if(prepArr[i] > prepArr[j] && prepArr[j] != -1 ){
                    numberInversions++
                }
            }
        }
        if(cols % 2){
            isSolvable = !(numberInversions % 2)
        } else{
            if(rows % 2){
                if((numberInversions + blankRow) % 2 == 1){
                    isSolvable = true;
                } else{
                    isSolvable = false;
                }
            } else{
                if((numberInversions + blankRow) % 2 == 0){
                    isSolvable = true;
                } else{
                    isSolvable = false;
                }
            }
        }

    }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    shuffleArray(array) {

        for (var i = 0; i < array.length; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }
        this.isSolvable(array)
    }

    flat(arr){
        let a = new Array(rows * cols - 1)
        for(let i = 0;i< rows;i++){
            for(let j = 0;j < cols; j++){
                let tile = arr[i][j];
                if(tile == -1){
                    a[this.blankSpot[0] * cols + this.blankSpot[1]] = -1
                    continue
                }
                let index = (tile.currJ * cols) + tile.currI;
                a[index] = tile;
            }
        }

        
        return a;
    }

    // https://stackoverflow.com/questions/52241641/shuffling-multidimensional-array-in-js
    shuffleTiles(){
        let arr = this.tiles.map((x)=>x);
        arr = this.flat(arr);
        console.log(arr)

        this.shuffleArray(arr);
        const shuffledArr = arr.reduce((acc, i) => {
            if(acc[acc.length-1].length >= cols) {
              acc.push([]);
            }
            acc[acc.length-1].push(i);
            return acc;
          }, [[]]);
        
        for(let i = 0;i < rows;i++){
            for(let j = 0;j < cols;j++){
                if(shuffledArr[i][j] == -1){
                    this.blankSpot = [i,j]
                } else{
                    shuffledArr[i][j].setIndexes(i,j)
                }
            }
        }
        

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
        for (let i = 0; i < this.tiles.length; i++) {
                if(isOriginalShown){
                    this.tiles[i] != -1 && this.tiles[i].drawOriginal();
                    continue
                }
                this.tiles[i] != -1 && this.tiles[i].draw();
                
            }

    }
}

 function myF(rows,cols){
    var newArray = []
    for(let i = 0; i < rows;i++){
        newArray[i] = new Array(cols).fill(null)
    }
    return newArray
}

