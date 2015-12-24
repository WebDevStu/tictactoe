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
        box = this.boxes[index];

    if (box.played) {
        return;
    }

    if (this.icon) {
        box.classList.add('cross');

        this.computerTurn();

    } else {
        box.classList.add('nought');
    }

    box.played = true;
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