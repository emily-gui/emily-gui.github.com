(function (){
    "use strict";
    console.log("reading js");

    var startGame = document.getElementById('startgame');
    var gameControl = document.getElementById('gamecontrol');
    var game = document.getElementById('game');
    var score = document.getElementById('score');
    var actionArea = document.getElementById('actions');

    var gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', 
            '4die.jpg', '5die.jpg', '6die.jpg'],
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
        gameControl.innerHTML = '<h2>The Game has started!</h2>';
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
            throwDice();
        })
    };

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; // using ceil could result in zero! :(
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">
                            <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        // if two 1's are rolled
        if (gameData.rollSum === 2){
            // console.log("Snake Eyes!");
            
            // zero out score
            // set up turn

            game.innerHTML += '<p>Oh sugarsnaps! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); // switch player
            // show the current score
            showCurrScore();

            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            // console.log("One 1 was rolled!");
            
            // zero out score

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
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}
                                ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}
                                ${gameData.score[1]}</strong>.</p>`;
    };

}());