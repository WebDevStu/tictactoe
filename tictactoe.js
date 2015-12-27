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
    this.icon = false; // false = x; true = o
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
 * @returns {Number}
 */
TicTacToe.prototype.getSquaresInPlay = function () {

    return this.squares.filter(function (square) {
        return !square.played;
    }).length;

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
        squaresLeft = this.getSquaresInPlay();

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
 * @param evt {Event.Object}
 */
TicTacToe.prototype.playSquare = function (evt) {

    var index = evt.currentTarget.getAttribute('data-index'),
        square = this.getSquare(index);

    if (square.played) {
        return;
    }

    if (this.icon) {
        square.classList.add('cross');
        square.cross = true;

        //this.computerTurn();
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
        squaresLeft = this.getSquaresInPlay();

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









// loop for continual play
var newGame = function () {
    return new TicTacToe(newGame);
};

// start the game
newGame();
