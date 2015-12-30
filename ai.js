


var AiInstance = null,

    /**
     * AI
     * AI class, the aim is to track the users actions and guess the most likely
     * box or pattern of boxes they are likely to place their noughts/crosses
     *
     * @constructor
     */
    AI = function (x) {


        /**
         * actual class constructor
         * @constructor
         */
        var Singleton = function () {

            this.x = x;

        };

        // ony return the instance
        return (function () {

            if (AiInstance === null) {
                AiInstance = new Singleton();
            }

            return AiInstance;
        } ());
    };



// test singleton
var one = new AI('foo'),
    two = new AI('bar');


console.log(one, two);



