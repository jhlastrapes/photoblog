/*eslint-disable*/


var modal = document.getElementById('myModal');
var closeBtn = document.getElementsByClassName("close")[0];
var leftArrow = document.getElementsByClassName("fa-angle-left")[0];
var leftArrowSpan = document.getElementsByClassName("leftArrow")[0];
var rightArrow = document.getElementsByClassName("fa-angle-right")[0];
var rightArrowSpan = document.getElementsByClassName("rightArrow")[0];
var captionText = document.getElementById("caption");
var modalImg = document.getElementsByClassName("modal-content")[0];
var blurredBG = document.getElementById("blurredBG");
var imageSpan = document.getElementsByClassName("imageSpan")[0];
var body = document.getElementsByTagName("body")[0];
var centerImageSpan = document.getElementsByClassName("centerImage")[0];


var images = [
  "images/colorado_1m.jpg",
  "images/utah_1m.jpg",
  "images/utah_2m.jpg",
  "images/venice_1m.jpg",
  "images/colorado_4m.jpg",
  "images/venice_2m.jpg",
  "images/burano_1m.jpg",
  "images/italym.jpg",
  "images/utah_3m.jpg",
  "images/colorado_2m.jpg",
  "images/venice_3m.jpg",
  "images/burano_2m.jpg",
  "images/colorado_3m.jpg",
];

var imagesFull = [
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
];


// modal function for desktops
function modalFunction(arg){
  modal.style.display = "block";
  // grabs med size photo
  imageSource = [arg.src.slice(0, -4), 'm', arg.src.slice(-4)].join('');
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


// for mobile
function modalFunctionMobile(arg){
  modal.style.display = "block";
  // hide default modal contents
  centerImageSpan.innerHTML = "";
  leftArrowSpan.style.display = "none";
  rightArrowSpan.style.display = "none";
  captionText.style.display = "none";  
  // blurs background
  blurredBG.classList.add("bodyModalBG");
  // keeps track of current image
  currentImageID = "m" + arg.id.substring(1);
  // create container for mobile images
  centerImageSpan.insertAdjacentHTML('beforeend', '<div id="mobileContainer"></div>');
  var mobileContainer = document.getElementById("mobileContainer");
  // inserts images html into container
  for(var i = 0; i < images.length; i++){
    mobileContainer.insertAdjacentHTML('beforeend', '<img src="' + images[i] + '" alt="' + captions[i] + '" title="Click for full-size photo in separate window" class="mobImg" id="mImg' + i + '"/>');
    // sets default image display value to "none"
    document.getElementsByClassName("mobImg")[i].style.display = "none";
    // assigns click listener for full-sized photos
    $("#mImg" + i).on("click", {id: i}, function(e){
      var j = e.data.id; // needed to convert i to j to avoid undefined return value
      window.open("http://www.jaylastrapes.com/photoblog/" + imagesFull[j]);
    });
  };
  // displays initial selected image
  document.getElementById(currentImageID).style.display = "inherit";
  // swipe functionality
  swipe();
  // return to main page
  xClick();
};

function swipe(){  
  // add event listeners to images
  for(var i = 0; i < images.length; i++){
    document.getElementsByClassName("mobImg")[i].addEventListener('touchstart', handleTouchStart, false);        
    document.getElementsByClassName("mobImg")[i].addEventListener('touchmove', handleTouchMove, false);
  };
  var xDown = null;                                                        
  var yDown = null;
  function getTouches(evt) {
    return evt.touches ||         // browser API
      evt.originalEvent.touches; // jQuery
  };                    
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };                                                
  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      // left swipe
      if ( xDiff > 0 ) {
        // changes image display
        for(var i = images.length-1; i > -1; i--){
          if(("mImg"+i) === currentImageID && currentImageID !== ("mImg"+(images.length-1))){
            document.getElementById(currentImageID).style.display = "none";
            currentImageID = "mImg"+(i+1);
            console.log(currentImageID);
            document.getElementById(currentImageID).style.display = "inherit";
          };
        };
      }
      // right swipe
      else {
        for(var i = 0; i < images.length; i++){
          if(("mImg"+i) === currentImageID && currentImageID !== ("mImg0")){
            document.getElementById(currentImageID).style.display = "none";
            currentImageID = "mImg"+(i-1);
            console.log(currentImageID);
            document.getElementById(currentImageID).style.display = "inherit";
          };
        };
      };
    } 
    else {
      // up swipe
      if ( yDiff > 0 ) {
      } 
      // down swipe
      else {
      };
    };
    /* reset values */
    xDown = null;
    yDown = null;
  };  
};


// gives ability to move through photos using the left and right arrows
function cyclePhotos(){
  // checks if on modal page
  var checkBlurred = String(blurredBG.classList.value);
  if(checkBlurred === "bodyModalBG"){  
    // for web use to resolve issue involving occasional "www." ommission
    // if(modalImg.src.slice(7, 11) === "www."){
    //   currentImage = modalImg.src.substring(38);
    // }
    // else {
    //   currentImage = modalImg.src.substring(34);
    // };
    // keeps track of current image
    currentImage = modalImg.src.substring(53);
    // hides left or right arrow if on first or last image on non-mobile pages
    // if (window.outerWidth > 550){
    //   if (currentImage === images[images.length-1]){
    //     rightArrow.style.visibility = "hidden";
    //   }
    //   else if (currentImage === images[0]){
    //     leftArrow.style.visibility = "hidden";
    //   }
    //   else {
    //     leftArrow.style.visibility = "visible";
    //     rightArrow.style.visibility = "visible";
    //   };
    // };
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

// x-button functionality in modal
function xClick(){
  closeBtn.onclick = function(){
    modal.style.display = "none";
    blurredBG.classList.remove("bodyModalBG");
    // removes event listener to prevent multiple windows
    modalImg.removeEventListener("click", openFull);
  };
};

// name of function necessary to use "removeEventListener" in xClick() function
function openFull(){
  window.open([modalImg.src.slice(0, -5), 'F', modalImg.src.slice(-4)].join(''));
};


// makes photo black and white on click
$("#images div img").on("mousedown", function(){
  $(this).addClass("clickDown");
});

// initializes main logic based on window size
$("#images div img").on("mouseup", function(){
  $(this).removeClass("clickDown");  
  if (window.outerWidth > 550 && window.outerHeight > 450){
    modalFunction(this);
  }
  else {
    modalFunctionMobile(this);
  }
});


// pre-loads images so image sizes in sizeModal() will retrieve properly 
if (document.images) {
  img1 = new Image();
  img2 = new Image();
  img3 = new Image();
  img4 = new Image();
  img5 = new Image();
  img6 = new Image();
  img7 = new Image();
  img8 = new Image();
  img9 = new Image();
  img10 = new Image();
  img11 = new Image();
  img12 = new Image();
  img13 = new Image();

  img1.src = "images/colorado_1m.jpg";
  img2.src = "images/utah_1m.jpg";
  img3.src = "images/utah_2m.jpg";
  img4.src = "images/venice_1m.jpg";
  img5.src = "images/colorado_4m.jpg";
  img6.src = "images/venice_2m.jpg";
  img7.src = "images/burano_1m.jpg";
  img8.src = "images/italym.jpg";
  img9.src = "images/utah_3m.jpg";
  img10.src = "images/colorado_2m.jpg";
  img11.src = "images/venice_3m.jpg";
  img12.src = "images/burano_2m.jpg";
  img13.src = "images/colorado_3m.jpg";
};