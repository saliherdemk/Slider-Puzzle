const popupContainer = document.querySelector(".popup-container")

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
    sourceType = "video"

}

function changeToImage(){
    sourceType == "video" && source.remove()
    source = currImage;
    sourceType = "img"
}

function closePopup(){
    popupContainer.style.display = "none"
}

function openPopup(){
    popupContainer.style.display = "flex"
}

var uploadImage = function(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        preload(dataURL)
    };
    reader.readAsDataURL(input.files[0]);

};