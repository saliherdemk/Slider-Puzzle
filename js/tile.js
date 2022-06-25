class Tile{
    constructor(originPos,img,w,h){
        this.originPos = originPos;
        this.currPos = originPos;
        this.img = img;
        this.w = w;
        this.h = h;

    }

    setImage(img){
        this.img = img;
    }

    setIndex(index){
        this.currPos = index;
    }

    getCurrIndexes(){
        let i = Math.floor(this.currPos / rows)
        let j = this.currPos % rows
        return [i,j]
        
    }

    drawOriginal(){
        let i = Math.floor(this.originPos / rows)
        let j = this.originPos % rows   
        image(this.img,i * this.w,j * this.h,this.w,this.h)

    }

    draw(){
        let [i,j] = this.getCurrIndexes()
        image(this.img,i * this.w,j * this.h,this.w,this.h)
    }
}