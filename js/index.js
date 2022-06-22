function handleShuffle(){
    board.shuffleTiles()
}

function toggleOriginalImage(){
    isOriginalShown = !isOriginalShown 
}

function changeToVideo(){
    source = createCapture(VIDEO)
    source.size(600,600)
    source.hide()

}

function changeToImage(){
    source = currImage;
    source.resize(600,600)
    
}