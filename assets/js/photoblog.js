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
    if(modalImg.src.slice(7, 11) === "www."){
      currentImage = modalImg.src.substring(38);
    }
    else {
      currentImage = modalImg.src.substring(34);
    };
    // looks for image address in images array
    for(var i = 0; i < images.length; i++){
      if(images[i] === currentImage){    
        // detectswipe('img01', myFunction);
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
        // left arrow mouse functionality          
        $(".leftArrow").on("click", {id: i}, function(e){
          var j = e.data.id;
          if (currentImage !== images[0]){
            handleCycleImages(j-1);
          };
        });
        // right arrow mouse functionality
        $(".rightArrow").on("click", {id: i}, function(e){
          var j = e.data.id;
          if (currentImage !== images[12]){
            handleCycleImages(j+1);            
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
  // removes arrow event handlers
  $(".leftArrow").off("click");
  $(".rightArrow").off("click");
  cyclePhotos();
}

// function detectswipe(el,func) {
//   swipe_det = new Object();
//   swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
//   var min_x = 30;  //min x swipe for horizontal swipe
//   var max_x = 30;  //max x difference for vertical swipe
//   var min_y = 50;  //min y swipe for vertical swipe
//   var max_y = 60;  //max y difference for horizontal swipe
//   var direc = "";
//   ele = document.getElementById(el);
//   ele.addEventListener('touchstart',function(e){
//     var t = e.touches[0];
//     swipe_det.sX = t.screenX; 
//     swipe_det.sY = t.screenY;
//   },false);
//   ele.addEventListener('touchmove',function(e){
//     e.preventDefault();
//     var t = e.touches[0];
//     swipe_det.eX = t.screenX; 
//     swipe_det.eY = t.screenY;    
//   },false);
//   ele.addEventListener('touchend',function(e){
//     //horizontal detection
//     if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
//       if(swipe_det.eX > swipe_det.sX) direc = "r";
//       else direc = "l";
//     }
//     vertical detection
//     else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
//       if(swipe_det.eY > swipe_det.sY) direc = "d";
//       else direc = "u";
//     }

//     if (direc != "") {
//       if(typeof func == 'function') func(el,direc);
//     }
//     direc = "";
//     swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
//   },false);  
// }

// function myFunction(el,d) {  
//   alert("you swiped on element with id '"+el+"' to "+d+" direction");
//   alert(String(d));
//   if(d === r){
//     handleCycleImages(i+1);
//   }
//   else if(String(d) === "l"){
//     handleCycleImages(i-1);
//   };
// };


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



