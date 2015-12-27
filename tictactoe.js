/**
 * TicTacToe
 * user is always crosses computer is noughts
 */
var TicTacToe = function () {

    this.play = true;
    this.icon = false; // false = x; true . o
    this.boxes = [];

    this.wins = [
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
 * getBox
 *
 * @param index {Number}
 * @returns {Object}
 */
TicTacToe.prototype.getBox = function (index) {

    var box = this.boxes[index];

    if (box) {
        return box;
    }

    throw new Error('Box out of range: ' + index);
};


/**
 * getStatus
 * gets the status of a box and matches the icon in play
 *
 * @returns {Boolean}
 */
TicTacToe.prototype.getStatus = function (index) {

    var box = this.getBox(index),
        icon = box.className === 'cross';

     return !!box.played && (icon === this.icon);
};


/**
 * buildBoard
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

        this.boxes.push(item);

        list.appendChild(item);
    }

    document.body.appendChild(list);
};


/**
 * playSquare
 * event handler for when a square is clicked
 *
 * @param evt {Event.Object}
 */
TicTacToe.prototype.playSquare = function (evt) {

    var index = evt.currentTarget.getAttribute('data-index'),
        box = this.getBox(index);

    if (box.played) {
        return;
    }

    if (this.icon) {
        box.classList.add('cross');
        box.cross = true;
        //this.computerTurn();
    } else {
        box.classList.add('nought');
        box.nought = true;
    }

    box.played = true;

    this.checkForWin(index);
};


/**
 * checkForWin
 *
 * @param index {Number|String}
 */
TicTacToe.prototype.checkForWin = function (index) {

    var accumulative;

    index = +index;

    // notes
    // first check either side (potentially up to x2 each way)
    // then check up and down (potentially 2 each way)
    // then diagonals both directions


    this.wins.forEach(function (wins) {

        accumulative = true;

        if (wins.indexOf(index) < 0) {
            return;
        }

        wins.forEach(function (win) {
            if (!this.getStatus(win)) {
                accumulative = false;
            }
        }, this);

        if (accumulative) {
            this.gameOver();
        }

    }, this);


    if (this.play) {
        this.icon = !this.icon;
    }
};


/**
 * gameOver
 * stops play
 */
TicTacToe.prototype.gameOver = function () {

    var icon = this.icon ? 'crosses' : 'noughts',
        score = document.createElement('div');

    this.play = false;

    score.className = 'score';
    score.innerHTML = 'Game over, ' + icon + ' win this time.';
    document.body.appendChild(score);
};


/**
 * computerTurn
 * @TODO
 */
TicTacToe.prototype.computerTurn = function () {

    var unPlayed = this.boxes.filter(function (box) {
        return !box.played;
    });

    unPlayed.forEach(function (el) {

    // do your magic here

    }, this);
};






// instantiate the class
var tictactoe = new TicTacToe();