angular.module('people')
    .controller('PersonCtrl', ['$http', function ($http) {
        var self = this;
        
        self.url = 'person/private.html';
    }]);