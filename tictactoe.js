/**
 * TicTacToe
 *
 * @param nextGame {Function}
 * @constructor
 */
var TicTacToe = function (nextGame) {

    this.nextGame = nextGame;

    this.el = document.getElementById('ticTacToe');

    this.play = true;
    this.icon = true; // false = x; true = o
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

    this.buildBoard();
};


/**
 * getSquare
 *
 * @param index {Number}
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
 * gets the status of a square and matches the icon in play
 *
 * @returns {Boolean}
 */
TicTacToe.prototype.getStatus = function (index) {

    var square = this.getSquare(index),
        icon = square.className === 'cross';

     return !!square.played && (icon === this.icon);
};


/**
 * getSquaresInPlay
 * gets the remaining squares in play that haven't been played
 *
 * @param counts {Boolean}
 * @returns {Number}
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
 * @returns {string}
 */
TicTacToe.prototype.getRandom = function () {

    var squaresLeft = this.getSquaresInPlay(),
        rand = Math.round(Math.random() * (squaresLeft.length - 1));

    if (squaresLeft[rand]) {
        return squaresLeft[rand].getAttribute('data-index');
    }
};


/**
 * getCompleteText
 * gets the complete text to display at the end of a game
 *
 * @returns {string}
 */
TicTacToe.prototype.getCompleteText = function () {

    var icon = this.icon ? 'crosses' : 'noughts',
        text = 'Game over, ' + icon + ' win this time. \n',
        squaresLeft = this.getSquaresInPlay(true);

    if (!squaresLeft) {
        text = 'No winner this time. \n';
    }

    return text;
};


/**
 * buildBoard
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

            if (tictactoe.play) {
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
 * @param evt {Event.Object} !optional
 * @param index {Number} !optional
 */
TicTacToe.prototype.playSquare = function (evt, index) {

    var square;

    index = evt ? evt.currentTarget.getAttribute('data-index') : index;

    square = this.getSquare(index);

    if (square.played) {
        return;
    }

    if (this.icon) {
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

    var accumulative,
        gameOver = false,
        squaresLeft = this.getSquaresInPlay(true);

    index = +index;

    // iterate the possibles to check for win
    this.wins.forEach(function (wins) {

        accumulative = true;

        if (wins.indexOf(index) < 0 || gameOver) {
            return;
        }

        wins.forEach(function (win) {
            if (!this.getStatus(win)) {
                accumulative = false;
            }
        }, this);

        if (accumulative || !squaresLeft) {
            gameOver = this.gameOver();
        }
    }, this);

    // only swap to next player if game still in play
    if (this.play) {
        this.icon = !this.icon;

        if (!this.icon) {
            this.computerTurn();
        }
    }
};


/**
 * gameOver
 * stops play
 */
TicTacToe.prototype.gameOver = function () {

    var score = document.createElement('div'),
        button = document.createElement('button');

    this.play = false;

    button.innerText = 'Play Again';

    score.className = 'score';
    score.innerText = this.getCompleteText();
    score.appendChild(button);

    this.el.appendChild(score);

    button.addEventListener('click', this.nextGame, false);

    return this;
};


/**
 * computerTurn
 * works out the computers next move and stops the user getting three in a row
 */
TicTacToe.prototype.computerTurn = function () {

    var play = null;

    this.wins.forEach(function (wins) {

        var userWin = 0,
            userMarker = null,
            played = 0;

        wins.forEach(function (win) {

            var square = this.getSquare(win);

            if (square.played) {
                played += 1;
            }

            if (square.className === 'cross') {
                userWin += 1;
            } else {
                userMarker = win;
            }
        }, this);

        if (userWin === 2 && played < 3) {
            play = userMarker || null;
        }
    }, this);

    play = (play === null) ? this.getRandom() : play;

    this.playSquare(null, play);

    // maybe put a small delay on the move, so as to emulate the computer is
    // thinking about the move
};



// loop for continual play
var newGame = function () {
    return new TicTacToe(newGame);
};

// start the game
newGame();
