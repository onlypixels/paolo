// This plugin uses a jQuery control pattern.

(function ($) {

    function getRandomItem(array) {
        var randomNumber = Math.random();
        if (randomNumber == 1) {
            randomNumber = 0.9999;
        }
        var index = Math.floor((randomNumber * array.length));

        return array[index];
    }

    // Add any public methods here:
    
    var methods = {



        generateQuote: function () {

            var thisRef = $(this);
            var data = thisRef.data("Paolo_options");
            
            var phrase = data.phrase;
            var subjects = data.subjects;
            var verb_valency_1 = data.verb_valency_1;
            var objectList = data.objectList;
            var adjective = data.adjective;
            var verb_valency_2 = data.verb_valency_2;
            var verb_valency_2_plural_subject = data.verb_valency_2_plural_subject;

            var newQuote = getRandomItem(phrase);

            while (newQuote.indexOf("{") >= 0) {
                newQuote = newQuote.replace(/{subject}/, getRandomItem(subjects));
                newQuote = newQuote.replace(/{verb_valency_1}/, getRandomItem(verb_valency_1));
                newQuote = newQuote.replace(/{object}/, getRandomItem(objectList));
                newQuote = newQuote.replace(/{adjective}/, getRandomItem(adjective));
                newQuote = newQuote.replace(/{verb_valency_2}/, getRandomItem(verb_valency_2));
                newQuote = newQuote.replace(/{verb_valency_2_plural_subject}/, getRandomItem(verb_valency_2_plural_subject));

                // a to an
                newQuote = newQuote.replace(" a a", " an a");
                newQuote = newQuote.replace(" a e", " an e");
                newQuote = newQuote.replace(" a i", " an i");
                newQuote = newQuote.replace(" a o", " an o");
                newQuote = newQuote.replace(" a u", " an u");
                newQuote = newQuote.replace(/^A a/, "An a");
                newQuote = newQuote.replace(/^A e/, "An e");
                newQuote = newQuote.replace(/^A i/, "An i");
                newQuote = newQuote.replace(/^A o/, "An o");
                newQuote = newQuote.replace(/^A u/, "An u");


            }

            // underscore used to prevent swapping "a" for "an"
            newQuote = newQuote.replace(/_/g, "");

            thisRef.html(newQuote);

            return thisRef;
        }
        
    };

    $.fn.Paolo = function (controlArgument) {

        if (typeof controlArgument === 'string' && methods[controlArgument]) {
            // if we want to call the control to run a method on it, the first arg will be a string and will
            // exist in the methods object
            // call the method with the corresponding key from the methods object (passing through args)
            return methods[controlArgument].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (arguments.length == 0 || typeof controlArgument === 'object') {
            // if we are passing through no argument, or an object as the first arg
            // then we must be initialising our control


            // so take any argument that comes through, and add it to the defaults and put it in the opts var
            var opts = $.extend({}, $.fn.Paolo.defaults, controlArgument);

            // iterate and reformat each matched element and add functionality
            return this.each(function () {
                var thisRef = $(this);

                // add the options to the control
                thisRef.data("Paolo_options", opts);

                thisRef.Paolo("generateQuote");


            });

        } else {
            return this;
        }
    };

    // object that stores control's default properties
    $.fn.Paolo.defaults = {
        
subjects: [
"man",
"warrior",
"human",
"child",
"victim",
"persecuter",
"traveller",
"creature",
"seeker"]
,
objectList: [
"dream",
"_universe", // the underscore prevents swapping "a" for "an"
"life",
"suffering",
"lie",
"heart",
"something",
"universe",
"pain",
"loss",
"love",
"secret",
"memory",
"force",
"decision",
"mind",
"passion",
"nothing",
"hunger",
"creation",
"freedom",
"treasure",
"day",
"legend",
"experience",
"opportunity",
"quest"]
,verb_valency_1: [
"conspire",
"forget",
"love",
"teach",
"fear",
"wait",
"know",
"confuse",
"desire",
"remember",
"leave",
"return",
"arrive",
"strive",
"suffer",
"lead",
"fall",
"say yes",
"be busy",
"demand",
"give in",
"dance",
"expect",
"pretend",
"live",
"weep",
"destroy",
"create",
"trust",
"seek"
],
verb_valency_2: [
"eats",
"demands",
"pretends to be",
"lies to",
"asks",
"loves",
"creates",
"awaits",
"fails",
"succeeds",
"repeats",
"seeks"
],


verb_valency_2_plural_subject: [
"eat",
"demand",
"pretend to be",
"lie to",
"ask",
"love",
"create",
"await",
"give in to",
"fail",
"seek"
]
,
adjective: [
"better",
"painful",
"interesting",
"untamed",
"quick",
"sad",
"weak",
"strong",
"stronger",
"hard",
"wonderful",
"intense"],


phrase: [
"Every {subject} will {verb_valency_1} when they {verb_valency_1}. But no {object} is ever {adjective}.",
"It takes a {adjective} {subject} to {verb_valency_1}, but a {adjective} {subject} to {verb_valency_1}.",
"If a {subject} {verb_valency_2} a {object}, they must {verb_valency_1} or {verb_valency_1}.",
"To own a {object}, a {subject}  {verb_valency_2} a {object}, but it is the {adjective} {subject} who can {verb_valency_2_plural_subject} a {object}.",
"It's the possibility of having a {object} that makes a {object} {adjective}.",
"A {object}, a {object}, a {object}: These things will {verb_valency_2_plural_subject} a {subject}.",
"The true {subject} must {verb_valency_1} before they {verb_valency_1}, or they will forever {verb_valency_2_plural_subject} a {object}."
]



    };

})(jQuery);
