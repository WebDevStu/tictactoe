/**
 * TicTacToe
 * constructor for the class
 *
 * @param scores {Object} persisted scores state, pulled from storage or defaults
 * @param nextGame {Function} callback method to start a new game
 *
 * @constructor
 */
var TicTacToe = function (scores, nextGame) {

    this.scores = scores;
    this.nextGame = nextGame;

    this.el = document.getElementById('ticTacToe');

    this.gameInPlay = true;
    this.symbol = true; // false = x; true = o
    this.squares = [];
    this.wins   = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [6, 4, 2],
        [0, 4, 8]
    ];

    this.buildBoard()
        .setScores();
};


/**
 * getSquare
 * gets the square as indicated by the passed in index, throws out of range
 * error.
 *
 * @param index {Number} 0-8
 * @returns {Object}
 */
TicTacToe.prototype.getSquare = function (index) {

    var square = this.squares[index];

    if (square) {
        return square;
    }

    throw new Error('Square out of range: ' + index);
};


/**
 * getStatus
 * gets the status of a square being played and matching the symbol in play
 *
 * @returns {Boolean}
 */
TicTacToe.prototype.getStatus = function (index) {

    var square = this.getSquare(index),
        symbol = square.className === 'cross';

     return !!square.played && (symbol === this.symbol);
};


/**
 * getSquaresInPlay
 * gets the remaining squares in play that haven't been played, optional param
 * to only return the counts
 *
 * @param counts {Boolean} !optional
 * @returns {Number|Array} either the total counts or an array of squares
 */
TicTacToe.prototype.getSquaresInPlay = function (counts) {

    var squares = this.squares.filter(function (square) {
        return !square.played;
    });

    if (counts) {
        return squares.length;
    }

    return squares;
};


/**
 * getRandom
 * randomly selects an un-played square
 *
 * @TODO this method needs to use the AI class to work out where the user will play next o_O
 *
 * @returns {number}
 */
TicTacToe.prototype.getRandom = function () {

    var squaresLeft = this.getSquaresInPlay(),
        rand = Math.round(Math.random() * (squaresLeft.length - 1));

    if (squaresLeft[rand]) {
        return +squaresLeft[rand].getAttribute('data-index');
    }
};


/**
 * getCompleteText
 * gets the complete text to display at the end of a game
 *
 * @returns {string}
 */
TicTacToe.prototype.getCompleteText = function (win) {

    var symbol = this.symbol ? 'crosses' : 'noughts';

    if (!win) {
        return 'No winner this time. \n';
    }

    return 'Game over, ' + symbol + ' win this time. \n';
};


/**
 * buildBoard
 * creates all the dom elements for the game to start and bind events to the
 * squares
 *
 * @returns TicTacToe {Object}
 */
TicTacToe.prototype.buildBoard = function () {

    var tictactoe = this,
        list = document.createElement('ul'),
        item,
        i;

    list.className = 'tictactoe';

    for (i = 0; i < 9; i += 1) {

        item = document.createElement('li');
        item.setAttribute('data-index', i);

        item.addEventListener('click', function (evt) {

            if (tictactoe.gameInPlay) {
                tictactoe.playSquare.call(tictactoe, evt);
            }
        }, false);

        this.squares.push(item);

        list.appendChild(item);
    }

    this.el.innerHTML = '';
    this.el.appendChild(list);

    return this;
};


/**
 * playSquare
 * event handler for when a square is clicked
 *
 * @param evt {Event.Object} !optional if sending through index
 * @param index {Number} !optional if event handler
 */
TicTacToe.prototype.playSquare = function (evt, index) {

    var square;

    index = evt ? evt.currentTarget.getAttribute('data-index') : index;

    square = this.getSquare(index);

    if (square.played) {
        return;
    }

    if (this.symbol) {
        square.classList.add('cross');
        square.cross = true;
    } else {
        square.classList.add('nought');
        square.nought = true;
    }

    square.played = true;

    this.checkForWin(index);
};


/**
 * checkForWin
 *
 * @param index {Number|String}
 */
TicTacToe.prototype.checkForWin = function (index) {

    var winningLine,
        gameOver = false,
        squaresLeft = this.getSquaresInPlay(true);

    index = +index;

    // iterate the possibles to check for win
    this.wins.forEach(function (wins) {

        winningLine = true;

        if (wins.indexOf(index) < 0 || gameOver) {
            return;
        }

        wins.forEach(function (win) {
            if (!this.getStatus(win)) {
                winningLine = false;
            }
        }, this);

        if (winningLine || !squaresLeft) {
            gameOver = this.gameOver(winningLine);
        }
    }, this);

    // only swap to next player if game still in play
    if (this.gameInPlay) {
        this.symbol = !this.symbol;

        if (!this.symbol) {
            this.computerTurn();
        }
    }
};


/**
 * computerTurn
 * works out the computers next move and stops the user getting three in a row
 */
TicTacToe.prototype.computerTurn = function () {

    // find possible nought win
    var nextMove = this.getNextPlayable('nought');

    // if no win possible check for user win and block
    if (!nextMove) {
        nextMove = this.getNextPlayable('cross');

        // if play still not set - select a random position
        if (!nextMove) {
            nextMove = this.getRandom();
        }
    }

    // play chosen square
    this.playSquare(null, nextMove);
};


/**
 * getNextPlayable
 * iterates the possible wins and returns a play square to play next
 *
 * @param className {String}
 * @returns {*}
 */
TicTacToe.prototype.getNextPlayable = function (className) {

    var squareToPlay = null,
        winningSquare,
        playedCount,
        marker,
        square;

    this.wins.forEach(function (wins) {

        winningSquare = 0;
        marker = null;
        playedCount = 0;

        wins.forEach(function (win) {

            square = this.getSquare(win);

            if (square.played) {
                playedCount += 1;
            }

            if (square.className === className) {
                winningSquare += 1;
            } else {
                marker = win;
            }
        }, this);

        if (winningSquare === 2 && playedCount < 3) {
            squareToPlay = marker || null;
        }
    }, this);

    return squareToPlay;
};


/**
 * gameOver
 * stops play
 *
 * @param win {Boolean} is there a win on the board
 */
TicTacToe.prototype.gameOver = function (win) {

    var score = document.createElement('div'),
        button = document.createElement('button');

    button.innerText = 'Play Again';
    button.addEventListener('click', this.nextGame, false);

    score.className = 'message';
    score.innerText = this.getCompleteText(win);
    score.appendChild(button);

    this.el.appendChild(score);

    this.updateScores(win);
    this.gameInPlay = false;

    return this;
};


/**
 * updateScores
 * updates the dom with the winning score
 *
 * @param win {Boolean}
 */
TicTacToe.prototype.updateScores = function (win) {

    var winner = 'ties';

    if (win) {
        winner = this.symbol ? 'you' : 'computer';
    }

    this.scores[winner] += 1;
    this.setScores();

    localStorage.setItem('scores', JSON.stringify(this.scores));
};


/**
 * setScores
 * sets the scores to the DOM
 */
TicTacToe.prototype.setScores = function () {

    var prop;

    for (prop in this.scores) {
        if (this.scores.hasOwnProperty(prop)) {
            document.querySelector('.' + prop).innerHTML = this.scores[prop];
        }
    }
};


// instantiate the class and start the game
var saved = localStorage.getItem('scores'),
    defaults = {
        you: 0,
        ties: 0,
        computer: 0
    },
    scores = saved ? JSON.parse(saved) : defaults,

    // loop for continual play
    newGame = function () {
        return new TicTacToe(scores, newGame);
    };

// start the game loop
newGame();
