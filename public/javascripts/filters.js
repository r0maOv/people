var app = angular.module('people');

app.filter('firstLetter', function () {
    return function (input) {
        if (input)
            return input[0].toUpperCase() + input.substring(1);
    }
});