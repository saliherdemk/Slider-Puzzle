class Tile{
    constructor(originI,originJ,img,w,h){
        this.originI = originI;
        this.originJ = originJ;
        this.currI = originI;
        this.currJ = originJ;
        this.img = img;
        this.w = w;
        this.h = h;

    }

    setImage(img){
        this.img = img;
    }

    setIndexes(i,j){
        this.currI = i;
        this.currJ = j;
    }

    draw(){
        image(this.img,this.currI * this.w,this.currJ * this.h,this.w,this.h)
    }
}