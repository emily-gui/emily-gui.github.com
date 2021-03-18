(function (){
    "use strict";
    console.log("reading js");

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
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        showCurrScore();
        document.getElementById('roll').addEventListener('click', function(){
            diceSound.play();
            throwDice();
        })
    };

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; // using ceil could result in zero! :(
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">
                            <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        // if two 1's are rolled
        if (gameData.rollSum === 2){
            // zero out score
            // set up turn

            snakeEyesSound.play();
            game.innerHTML += '<p></br></br></br>Oh sugarsnaps! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            // show the current score
            showCurrScore();

            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            // zero out score

            oneRolledSound.play();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            game.innerHTML += `<p></br></br></br>Sorry, one of your rolls was a one.</br>
                                    Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> OR <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            // check to see if player won
            checkWinningCondition();

        }
    };

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            winSound.play();
            showCurrScore();
            score.innerHTML = `<h2>${gameData.players[gameData.index]} 
                wins with ${gameData.score[gameData.index]} points!</h2>`;

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

}());

/* (function (){
    "use strict";
    console.log("reading js");

    let startGame = document.getElementById('startgame');
    let gameControl = document.getElementById('gamecontrol');
    let game = document.getElementById('game');
    let score = document.getElementById('score');
    let actionArea = document.getElementById('actions');

    let score1 = document.getElementById('score1');
    let score1 = document.getElementById('score2');

    const diceSound = new Audio('sounds/dice.mp3');
    const snakeEyesSound = new Audio('sounds/snake-eyes.mp3');
    const oneRolledSound = new Audio('sounds/one-rolled.mp3');
    const winSound = new Audio('sounds/win.mp3');

    let gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 
            'images/4die.png', 'images/5die.png', 'images/6die.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){

        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = ' ';
        gameControl.innerHTML += '<button id="quit">Exit the Game?</button>';

        document.getElementById("quit").addEventListener('click', function(){
            location.reload();
        });

        console.log(gameData.index);
        setUpTurn();

    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            diceSound.play();
            throwDice();
        })
    };

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; // using ceil could result in zero! :(
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<div id="dice">
                                <img src="${gameData.dice[gameData.roll1-1]}">
                                <img src="${gameData.dice[gameData.roll2-1]}">
                            </div>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        // if two 1's are rolled
        if (gameData.rollSum === 2){
            // zero out score
            // set up turn

            snakeEyesSound.play();

            game.innerHTML += '<p>Oh sugarsnaps! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            // show the current score
            showCurrScore();

            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            // zero out score

            oneRolledSound.play();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            game.innerHTML += `<p>Sorry, one of your rolls was a one.</br>
                                    Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1
        else {
            // console.log("The game proceeds!")

            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            // check to see if player won
            checkWinningCondition();

        }
    };

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            winSound.play();
            score.innerHTML = `<h2>${gameData.players[gameData.index]} 
                wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = "";
            document.getElementById('quit').innerHTML = "Start a New Game";
        }

        else {
            // update score
            showCurrScore();
        }
    };

    function showCurrScore(){
        score1.innerHTML = `${gameData.score[0]}`;
        score2.innerHTML = `${gameData.score[1]}`;
    };

}()); */