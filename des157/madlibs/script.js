(function () {
    "use strict";
    console.log("reading js");

    // code starts from here

    const myForm = document.querySelector('#myForm');
    const madlib = document.querySelector('#madlib');

    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        const formData = document.querySelectorAll('input[type=text]');
        processData(formData);
    });

    function processData(formData) {
        let emptyFields = 0;
        const words = [];

        for (const eachWord of formData) {
            if (eachWord.value) {
                words.push(eachWord.value);
                eachWord.value = '';
            } else {
                emptyFields++;
            }

            if (emptyFields > 0) {
                madlib.innerHTML = 'Please fill out the fields';
            } else {
                makeMadLib(words);
            }
            
        }
    }

    function makeMadLib(wordsArray) {
        const myText = `Here are the words: ${wordsArray[0]}, ${wordsArray[1]}, ${wordsArray[2]}, and ${wordsArray[3]}.`;
        madlib.innerHTML = myText;
    }


    /************************ canvas *****************************/
    /* const userName = document.getElementById('userName').value;
    const userName = document.querySelector('#userName').value; */

    /* submit.addEventListener('click', function(event){
        event.preventDefault();
        // your code here
   }); */

   //Add a condition that registers specific inputs to create specific outputs or HTML/CSS changes, such as custom images or colors
   //Add error detection messages if users leave a field blank (also called "fallback messages")

   //updating your variable declarations from var to let and const as appropriate

   /************************ canvas *****************************/

})();