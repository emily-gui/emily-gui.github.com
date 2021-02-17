(function () {
    "use strict";
    console.log("reading js");

    /* code reference for moveImage function: https://www.w3schools.com/howto/howto_js_draggable.asp */
    moveImage(document.getElementById("gallery"));

    function moveImage(image) {
        var pos1 = 0, 
            pos2 = 0, 
            pos3 = 0, 
            pos4 = 0;

        if (document.getElementById(image.id + "1")) {
            document.getElementById(image.id + "1").onmousedown = cursorPosition;

        /* still testing out way to be able to move each image individually */
        
/*         } else if (document.getElementById(image.id + "2")) {
            document.getElementById(image.id + "2").onmousedown = cursorPosition;

        } else if (document.getElementById(image.id + "3")) {
            document.getElementById(image.id + "3").onmousedown = cursorPosition;

        } else if (document.getElementById(image.id + "4")) {
            document.getElementById(image.id + "4").onmousedown = cursorPosition;

        } else if (document.getElementById(image.id + "5")) {
            document.getElementById(image.id + "5").onmousedown = cursorPosition; */

        } else {
            image.onmousedown = cursorPosition;
        }

/*         var imageNum = [1, 2, 3, 4, 5];
        for (var i=0; i<imageNum.length; i++) {
            if (document.getElementById(image.id + "1")) {
                document.getElementById(image.id + "1").onmousedown = cursorPosition;
    
            } else if (document.getElementById(image.id + "2")) {
                document.getElementById(image.id + "2").onmousedown = cursorPosition;
    
            } else if (document.getElementById(image.id + "3")) {
                document.getElementById(image.id + "3").onmousedown = cursorPosition;
    
            } else if (document.getElementById(image.id + "4")) {
                document.getElementById(image.id + "4").onmousedown = cursorPosition;
    
            } else if (document.getElementById(image.id + "5")) {
                document.getElementById(image.id + "5").onmousedown = cursorPosition;
    
            } else {
                image.onmousedown = cursorPosition;
            }
            i++;
        } */

        function cursorPosition(move) {
            move.preventDefault();
            
            pos3 = move.clientX;
            pos4 = move.clientY;

            document.onmouseup = stopImage;
            document.onmousemove = imagePostion;
        }

        function imagePostion(move) {
            move.preventDefault();
    
            pos1 = pos3 - move.clientX;
            pos2 = pos4 - move.clientY;

            pos3 = move.clientX;
            pos4 = move.clientY;
            
            image.style.top = (image.offsetTop - pos2) + "px";
            image.style.left = (image.offsetLeft - pos1) + "px";
        }

        function stopImage() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


    
    /********************** testing out overlays *************************/

/*     const openBtns = document.querySelectorAll('.open');
    const closeBtns = document.querySelectorAll('.close');

    for (const eachBtn of openBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // do stuff here...
        });
    }
    
    for (const eachBtn of closeBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // do stuff here...
        });
    }

    for (const eachBtn of openBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const thisBtn = event.target.id;
            document.getElementById(`ol-${thisBtn}`).className = 'overlay showing';
        });
    }

    for (const eachBtn of closeBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.showing').className = 'overlay hidden';
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'overlay hidden';
        }
    }); */

    /********************** testing out slideshow *************************/

/*     const myImages = [
        'image1.jpg', 
        'image2.jpg', 
        'image3.jpg', 
        'image4.jpg', 
        'image5.jpg'];
    
        let currentImage = 0;
    
        const slide = document.getElementById('myimage');
    
        document.getElementById('next').addEventListener('click', nextPhoto);
    
        function nextPhoto(){
            currentImage++; //increment the counter
            //set the source for the slide to the next image
            if (currentImage > myImages.length-1) {
            //If the user is at the end of the array...
            currentImage = 0;
            }
            slide.src =`images/${myImages[currentImage]}`;
        }
    
        document.getElementById('previous').addEventListener('click', previousPhoto);
    
        function previousPhoto() {
            currentImage--; //decrement the counter
            //set the source for the slide to the previous image
    
            if (currentImage < 0) {
                //If the user is at the beginning of the array...
                currentImage = myImages.length - 1;
            }
            slide.src = `images/${myImages[currentImage]}`;
        } */

}());