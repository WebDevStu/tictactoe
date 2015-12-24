/**
 * TicTacToe
 * user is always crosses computer is noughts
 */
var TicTacToe = function () {

    this.icon = false; // false = x; true . o
    this.boxes = [];

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
 *
 * @returns {Boolean}
 */
TicTacToe.prototype.getStatus = function (index) {

    var box = this.getBox(index);

    return box.played;
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
            tictactoe.playSquare.call(tictactoe, evt);
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
        //this.computerTurn();
    } else {
        box.classList.add('nought');
    }

    box.played = true;


    this.checkForWin(index);
};


/**
 * checkForWin
 *
 * @param index {Number}
 */
TicTacToe.prototype.checkForWin = function (index) {

    var toCheck = [];

    index = +index;

    console.dir(index);
    // notes
    // first check either side (potentially up to x2 each way)
    // then check up and down (potentially 2 each way)
    // then diagonals both directions


    // side to side check
    if (index % 3 === 0) {
        // start of row - check two after
        toCheck.push(index + 1, index + 2);
    } else if ((index - 1) % 3 === 0) {
        // middle row - one either side
        toCheck.push(index - 1, index + 1);
    } else if ((index - 2) % 3 === 0) {
        // end row - check two before
        toCheck.push(index - 1, index - 2);
    }



    this.icon = !this.icon;
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