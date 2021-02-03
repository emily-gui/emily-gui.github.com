(function () {
    "use strict";
    console.log("reading js");

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
        const myText = `Hello! My name is ${wordsArray[0]}, and I am feeling ${wordsArray[1]} today.
                        My favorite color is ${wordsArray[2]}, and I love ${wordsArray[3]}.
                        That's just a little bit about me, but a saying I always go by is "${wordsArray[4]}"!
                        Thank you for introducing yourself, ${wordsArray[0]}. As a gift, here's a ${wordsArray[2]} ${wordsArray[3]} for you!`;
        madlib.innerHTML = myText;
    }

}());