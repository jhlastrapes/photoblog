/*eslint-disable*/


var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var captionText = document.getElementById("caption");
var modalImg = document.getElementsByClassName("modal-content")[0];
var blurredBG = document.getElementById("blurredBG");

var images = [
  "images/colorado_1F.jpg",
  "images/utah_1F.jpg",
  "images/utah_2F.jpg",
  "images/venice_1F.jpg",
  "images/colorado_4F.jpg",
  "images/venice_2F.jpg",
  "images/burano_1F.jpg",
  "images/italyF.jpg",
  "images/utah_3F.jpg",
  "images/colorado_2F.jpg",
  "images/venice_3F.jpg",
  "images/burano_2F.jpg",
  "images/colorado_3F.jpg",
];

var captions = [
  "Boulder, CO",
  "Moab, UT",
  "Salt Flats, UT",
  "Venice, Italy",
  "Morrison, CO",
  "Venice, Italy",
  "Burano, Italy",
  "Italy",
  "Salt Lake City, UT",
  "Boulder, CO",
  "Venice, Italy",
  "Burano, Italy",
  "Independence Pass, CO"
]


// function for modal
function modalFunction(arg){
  modal.style.display = "block";
  // grabs full size photo
  imageSource = [arg.src.slice(0, -4), 'F', arg.src.slice(-4)].join('');
  // blurs background
  blurredBG.classList.add("bodyModalBG");
  // assigns the image URL to the modalImg .src attribute
  modalImg.src = (imageSource);
  captionText.innerHTML = arg.title;
  // add click functionality to modal image for full resolution
  modalImg.addEventListener("click", openFull);
  // moves through photos with arrow buttons
  cyclePhotos();
  // return to main page
  xClick();
};

// gives ability to move through photos using the left and right arrows
function cyclePhotos(){
  // checks if on modal page
  var checkBlurred = String(blurredBG.classList.value);
  if(checkBlurred === "bodyModalBG"){  
    // keeps track of current image
    // for web use to resolve issue involving occasional "www." ommission
    // if(modalImg.src.slice(7, 11) === "www."){
    //   currentImage = modalImg.src.substring(38);
    // }
    // else {
    //   currentImage = modalImg.src.substring(34);
    // };
    currentImage = modalImg.src.substring(53);
    // looks for image adress in images array
    for(var i = 0; i < images.length; i++){
      if(images[i] === currentImage){
        $("body").on("keyup", {id: i}, function(e){
          // retrieve i after jquery function and reassign to variable "j"
          var j = e.data.id;
          // right arrow key event
          if (e.which === 39 && currentImage !== images[12]){
            handleCycleImages(j+1);
          }
          // left arrow key event
          else if (e.which === 37 && currentImage !== images[0]){
            handleCycleImages(j-1);
          };
        }); 
      };
    };
  };
};

function handleCycleImages(backOrForward){
  // change modalImg.src to next photo as well as caption
  modalImg.src = images[backOrForward];
  captionText.innerHTML = captions[backOrForward];
  // remove event handler for next cycle to not exponentially add event handlers and slow down page 
  $("body").off("keyup");
  cyclePhotos();
}

// x-button functionality in modal
function xClick(){
  span.onclick = function(){
    modal.style.display = "none";
    blurredBG.classList.remove("bodyModalBG");
    // removes event listener to prevent multiple windows
    modalImg.removeEventListener("click", openFull);
  };
};

// name of function necessary to use "removeEventListener" in xClick() function
function openFull(){
  window.open(currentImage);
};



// makes photo black and white on click
$("#images div img").on("mousedown", function(){
  $(this).addClass("clickDown");
});

$("#images div img").on("mouseup", function(){
  $(this).removeClass("clickDown");  
  modalFunction(this);
});

// $("#me").on("mousedown", function(){
//   $(this).addClass("clickDown");
// });

// $("#me").on("mouseup", function(){
//   $(this).removeClass("clickDown");  
//   modalFunction(this);
// });



