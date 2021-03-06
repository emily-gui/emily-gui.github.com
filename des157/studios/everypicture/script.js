(function () {
    "use strict";
    console.log("reading js");

    moveImage(document.getElementById("gallery"));
    

    function moveImage(image) {
        var pos1 = 0, 
            pos2 = 0, 
            pos3 = 0, 
            pos4 = 0;

        if (document.getElementById(image.id + "A")) {
            document.getElementById(image.id + "A").onmousedown = cursorPosition;
        } 
        else if (document.getElementById(image.id + "B")) {
            document.getElementById(image.id + "B").onmousedown = cursorPosition;
        } 
        else if (document.getElementById(image.id + "C")) {
            document.getElementById(image.id + "C").onmousedown = cursorPosition;
        }
        else if (document.getElementById(image.id + "D")) {
            document.getElementById(image.id + "D").onmousedown = cursorPosition;
        }
        else if (document.getElementById(image.id + "E")) {
            document.getElementById(image.id + "E").onmousedown = cursorPosition;
        }
        else {
            image.onmousedown = cursorPosition;
        }

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
    moveImage(document.getElementById("anotherGallery"));

    /* function moveImage(image) {
        var pos1 = 0, 
            pos2 = 0, 
            pos3 = 0, 
            pos4 = 0;

        if (document.getElementById(image.id + "1")) {
            document.getElementById(image.id + "1").onmousedown = cursorPosition;
        } 
        else {
            image.onmousedown = cursorPosition;
        }

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
    } */

}());