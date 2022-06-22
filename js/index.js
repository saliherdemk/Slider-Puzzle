const popupContainer = document.querySelector(".popup-container")
const chk = document.getElementById('chk');

navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

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
    sourceTypeImg = false

}

function changeToImage(){
    !sourceTypeImg && source.remove()
    source = currImage;
    sourceTypeImg = true
}

function closePopup(){
    popupContainer.style.display = "none";
    isOriginalShown = false;
}

function openPopup(){
    popupContainer.style.display = "flex";
    isOriginalShown = true
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

function blockClose(event){
    event.stopPropagation();

}

// https://stackoverflow.com/questions/42212214/how-to-check-with-javascript-that-webcam-is-being-used-in-chrome
chk.addEventListener('change', () => {
    sourceTypeImg = !sourceTypeImg
    if(sourceTypeImg){
        changeToImage()
    } else{
        changeToVideo()
    }

    var warning = select("#warning");
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            video: true
          },
          function(_) {
            null
          },
          function(_) {
            warning.style("display","flex")
            
          });
      }
});