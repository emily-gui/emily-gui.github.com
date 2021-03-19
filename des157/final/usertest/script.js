(function (){
    "use strict";
    console.log("reading js");

    alert('Hello there, welcome! To complete this user test, please do the following:\n\n1. Play five rounds to test out the game.\n2. Interact with both Roll Again and Pass buttons.\n3. Adjust the screen window size while playing.');

    let startGame = document.getElementById('startgame');
    let gameControl = document.getElementById('gamecontrol');
    let game = document.getElementById('game');
    
    let score1 = document.getElementById('score1');
    let score2 = document.getElementById('score2');

    let actionArea = document.getElementById('actions');

    const diceSound = new Audio('sounds/dice.mp3');
    const snakeEyesSound = new Audio('sounds/snake-eyes.mp3');
    const oneRolledSound = new Audio('sounds/one-rolled.mp3');
    const winSound = new Audio('sounds/win.mp3');

    let turn = document.getElementById('turn');
    let turnFlip = document.getElementById('turn-flip');
    let leftLight = document.getElementById('left-image');
    let leftDark = document.getElementById('left-image-off');
    let rightLight = document.getElementById('right-image');
    let rightDark = document.getElementById('right-image-off');

    let gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 
            'images/4die.png', 'images/5die.png', 'images/6die.png'],
        players: ['PLAYER 1', 'PLAYER 2'],
        score: [0, 0],
        score1: 0,
        score2: 0,
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){

        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '';
        gameControl.innerHTML += '<button id="quit">Exit the Game?</button>';

        document.getElementById("quit").addEventListener('click', function(){
            location.reload();
        });

        console.log(gameData.index);
        setUpTurn();

    });

    function setUpTurn(){
        actionArea.innerHTML = '<p><br><br><br><br><br></p><button id="roll">Roll the Dice</button>';
        game.innerHTML = `${gameData.players[gameData.index]}'s turn</p>`;
        showCurrScore();

        // overlay color change
        if (gameData.players[gameData.index] === 'PLAYER 1') {
            leftOn();
        }
        else {
            rightOn();
        }

        document.getElementById('roll').addEventListener('click', function(){
            diceSound.play();
            throwDice();
        })
    };

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>${gameData.players[gameData.index]}'s turn</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">
                            <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        // if two 1's are rolled
        if (gameData.rollSum === 2){
            snakeEyesSound.play();
            game.innerHTML += '<p></br></br></br>Oh sugarsnaps! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            showCurrScore();

            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            oneRolledSound.play();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            game.innerHTML += `<p></br></br></br>Sorry, one of your rolls was a one.</br>
                                    Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            /* actionArea.innerHTML = '<button id="rollagain">Roll Again</button> OR <button id="pass">Pass</button>'; */
            actionArea.innerHTML = '<div id="roll"><button id="rollagain">Roll Again</button></div>';
            actionArea.innerHTML += '<div id="pass"><button id="orpass">Pass</button></div>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();

        }
    };

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            winSound.play();
            showCurrScore();
            score.innerHTML = `<p>${gameData.players[gameData.index]} 
                wins with ${gameData.score[gameData.index]} points!</p>`;

            actionArea.innerHTML = "";
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }

        else {
            showCurrScore();
        }
    };

    function showCurrScore(){
        score1.innerHTML = gameData.score[0];
        score2.innerHTML = gameData.score[1];
    };

    function leftOn(){
        turn.style.visibility = 'visible';
        turnFlip.style.visibility = 'hidden';

        leftLight.style.visibility = 'visible';
        leftDark.style.visibility = 'hidden';
        rightLight.style.visibility = 'hidden';
        rightDark.style.visibility = 'visible';
    };

    function rightOn(){
        turn.style.visibility = 'hidden';
        turnFlip.style.visibility = 'visible';

        leftLight.style.visibility = 'hidden';
        leftDark.style.visibility = 'visible';
        rightLight.style.visibility = 'visible';
        rightDark.style.visibility = 'hidden';
    };

}());