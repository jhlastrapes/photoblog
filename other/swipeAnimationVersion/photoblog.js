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
    // assigns click listener for full-sized photos (edge-tap verstion)
    // $("#mImg" + i).on("click", {id: i}, function(e){
    //   var j = e.data.id; // needed to convert i to j to avoid undefined return value
    //   window.open("http://www.jaylastrapes.com/photoblog/" + imagesFull[j]);
    // });
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
  var mobImageTouch = document.getElementsByClassName("mobImg");
  for(var i = 0; i < images.length; i++){
    mobImageTouch[i].addEventListener('touchstart', handleTouchStart, false);    
    mobImageTouch[i].addEventListener('touchend', handleTouchEnd, false);  
    mobImageTouch[i].addEventListener('touchmove', handleTouchMove, false);
  };

  var ongoingTouches = [];
  function handleTouchStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
      // keeps track of swipe starting location
      touchStartX = touches[i].pageX;
      touchStartY = touches[i].pageY;
    };
  };
  function handleTouchMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        // X-translation of image based on touch
        for(var j = 0; j < images.length; j++){
          // checks for current image
          if(("mImg"+j) === currentImageID){
            // left swipe (if not last image)
            if(currentImageID !== ("mImg"+(images.length-1)) && (touchStartX-touches[i].pageX) > 0){
              console.log('current image ID: ' + currentImageID);            
              var nextImageID = ("mImg"+(j+1));  // finds next image
              var nextDOM = document.getElementById(nextImageID);
              var currentDOM = document.getElementById(currentImageID);
              currentDOM.style.left = ((touches[i].pageX-touchStartX) + "px");
              nextDOM.style.display = "inherit";
              nextDOM.style.left = "100%"; // initial position of next image
              nextDOM.style.left = ((touches[i].pageX-touchStartX + 48) + "px");  // once movemnt is > 0px with 48px spacing
            }
            // right swipe (if not 1st image)
            else if(currentImageID !== "mImg0" && (touchStartX-touches[i].pageX) < 0){
              console.log('current image ID: ' + currentImageID);            
              var prevImageID = ("mImg"+(j-1));  // finds next image
              var prevDOM = document.getElementById(prevImageID);
              var currentDOM = document.getElementById(currentImageID);
              currentDOM.style.left = ((touches[i].pageX-touchStartX-window.outerWidth) + "px");
              prevDOM.style.display = "inherit";
              prevDOM.style.left = "-100%"; // initial position of next image
              prevDOM.style.left = ((touches[i].pageX-touchStartX-window.outerWidth-48) + "px");  // once movemnt is > 0px
            };
          };
        };
        console.log(touches[i].pageX-touchStartX);
        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        console.log(".");
      } 
      else {
        console.log("can't figure out which touch to continue");
      };
    };
  };
  function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  };
  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
      
      if (id == idToFind) {
        return i;
      };
    };
    return -1;    // not found
  };

  function handleTouchEnd(evt) {
    evt.preventDefault();
    console.log("touchend");
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      // var color = colorForTouch(touches[i]);
      var idx = ongoingTouchIndexById(touches[i].identifier);
  
      if (idx >= 0) {
        ongoingTouches.splice(idx, 1);  // remove it; we're done
        // grab end touch coordinates
        touchEndX = touches[i].pageX;
        touchEndY = touches[i].pageY;
        console.log(touchStartX-touchEndX)

        var fadeTime = 0.4 // transition time (in seconds)
        var transitionCode = ("left "+fadeTime+"s") 

        // opens full-size if swipe is less than 4px
        if (Math.abs(touchStartX-touchEndX) < 4 && Math.abs(touchStartY-touchEndY) < 4){
          for(var j = 0; j < images.length; j++){
            if(document.getElementsByClassName("mobImg")[j].style.display === "inherit"){
              currentSwipeImage = imagesFull[j];
            };
          };
          window.open("http://www.jaylastrapes.com/photoblog/" + currentSwipeImage);
        }

        // minimum swipe length restriction
        else if (Math.abs(touchStartX-touchEndX) < 50){
          for(var j = 0; j < images.length; j++){
            // short left swipe
            if (("mImg"+j) === currentImageID && (touchStartX-touchEndX) > 0){
              // last image end case
              if (currentImageID === ("mImg"+(images.length-1))){
                return;
              };
              // all other possibilities
              var currentDOM = document.getElementById(currentImageID);
              var nextImageID = ("mImg"+(j+1));
              var nextDOM = document.getElementById(nextImageID);
              // curent image
              currentDOM.style.transition = transitionCode;
              currentDOM.style.left = "0px";
              // next image
              nextDOM.style.transition = transitionCode;
              nextDOM.style.display = "inherit";
              nextDOM.style.left = "8%";  
              // after image position reset
              setTimeout(function(){
                currentDOM.style.display = "inherit";
                currentDOM.style.left = "0px";
                currentDOM.style.transition = "";
                nextDOM.style.display = "none";
                nextDOM.style.transition = "";
                nextDOM.style.left = "";
              }, (fadeTime*1000));
            }
            // short right swipe
            else if (("mImg"+j) === currentImageID){
              // 1st image end case
              if (currentImageID === "mImg0"){
                return;
              };
              // all other image possibilities
              var currentDOM = document.getElementById(currentImageID);
              var nextImageID = ("mImg"+(j-1));
              var nextDOM = document.getElementById(nextImageID);
              // current image
              currentDOM.style.transition = transitionCode;
              currentDOM.style.left = "-100%";
              // next image
              nextDOM.style.transition = transitionCode;
              nextDOM.style.display = "inherit";
              nextDOM.style.left = "-108%";  
              // after image position reset
              setTimeout(function(){
                currentDOM.style.display = "inherit";
                currentDOM.style.left = "0px";
                currentDOM.style.transition = "";
                nextDOM.style.display = "none";
                nextDOM.style.transition = "";
                nextDOM.style.left = "";
              }, (fadeTime*1000));
            };
          };
        }

        // completed left swipe
        else if ((touchStartX-touchEndX) > 50){
          for(var j = images.length-1; j > -1; j--){
            if (("mImg"+j) === currentImageID){
              // last image end case
              if (currentImageID === ("mImg"+(images.length-1))){
                return;
              };
              // all other image possibilities
              var currentDOM = document.getElementById(currentImageID);
              var nextImageID = ("mImg"+(j+1));
              var nextDOM = document.getElementById(nextImageID);
              console.log(currentImageID + " " + nextImageID);
              // current image
              currentDOM.style.transition = transitionCode;
              currentDOM.style.left = "-108%";
              // next image
              nextDOM.style.transition = transitionCode;
              nextDOM.style.display = "inherit";
              nextDOM.style.left = "-100%";   
              // necessary for timing of image swap and transitions          
              setTimeout(function(){
                currentDOM.style.display = "none";
                currentDOM.style.left = "";
                currentDOM.style.transition = "";
                nextDOM.style.transition = "";
                nextDOM.style.left = "0px";
              }, (fadeTime*1000));
              currentImageID = nextImageID;
            };
          };
        }

        // completed right swipe
        else if ((touchStartX-touchEndX) < -50){
          for(var j = 0; j < images.length; j++){
            if(("mImg"+j) === currentImageID){
              // 1st image end case
              if (currentImageID === "mImg0"){
                return;
              };
              // all other image possibilities
              var currentDOM = document.getElementById(currentImageID);
              var nextImageID = ("mImg"+(j-1));
              var nextDOM = document.getElementById(nextImageID);
              console.log(currentImageID + " " + nextImageID);
              // current image
              currentDOM.style.transition = transitionCode;
              currentDOM.style.left = "8%";
              // next image
              nextDOM.style.transition = transitionCode;
              nextDOM.style.display = "inherit";
              nextDOM.style.left = "0px";
              // necessary for timing of image swap and transitions             
              setTimeout(function(){
                currentDOM.style.display = "none";
                currentDOM.style.left = "";
                currentDOM.style.transition = "";
                nextDOM.style.transition = "";
              }, (fadeTime*1000));
              currentImageID = nextImageID;
            };
          };
        };
      } 
      else {
        console.log("can't figure out which touch to end");
      };
    };
  };
};



// gives ability to move through photos using the left and right arrows
function cyclePhotos(){
  // checks if on modal page
  var checkBlurred = String(blurredBG.classList.value);
  if(checkBlurred === "bodyModalBG"){  
    // for web use to resolve issue involving occasional "www." ommission
    if(modalImg.src.slice(7, 11) === "www."){
      currentImage = modalImg.src.substring(38);
    }
    else {
      currentImage = modalImg.src.substring(34);
    };
    // keeps track of current image
    // currentImage = modalImg.src.substring(53);
    // hides left or right arrow if on first or last image on non-mobile pages
    if (window.outerWidth > 550){
      if (currentImage === images[images.length-1]){
        rightArrow.style.visibility = "hidden";
      }
      else if (currentImage === images[0]){
        leftArrow.style.visibility = "hidden";
      }
      else {
        leftArrow.style.visibility = "visible";
        rightArrow.style.visibility = "visible";
      };
    };
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