
// plan: self play - resolve and get all possible board finishes?
// make this a factory

/**
 * ai - to track each posible finish for the computer
 * @method
 * @returns {object}
 */
var ai = (function () {

    // private methods
    var _possibles = [],
        _hash = function (array) {

        };

    // exposed returned object
    return {

        get: function () {

        },



        findEveryWin: function () {

            var finishesLeft = true;

            // 9 squares
            // unique arrays
            // [1, 0, 1, 0, 1, 0, 1, 0, 1]
            // [null, 0, null, 0, null, 0, 1, 1, 1]
            // [null, 1, 1, 0, 1, 0, 0, 0...
            //
            //

            // console.log(ai.getCombinations([[], [], []]));
        },


        getCombinations: function (array) {

            var results = [],
                types = [0, 1, -1],
                clone;


            types.forEach(function (type) {

                array.forEach(function (accumulative) {
                    clone = accumulative.slice(0);
                    clone.push(type);
                    array.push(clone);
                });

            });



            return array;
        }


    };
} ());