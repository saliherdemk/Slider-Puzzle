class Tile{
    constructor(i,j,img,w,h){
        this.i = i;
        this.j = j;
        this.img = img;
        this.w = w;
        this.h = h;

    }

    setImage(img){
        this.img = img;
    }

    draw(){
        image(this.img,this.i * this.w,this.j * this.h,this.w,this.h)
    }
}