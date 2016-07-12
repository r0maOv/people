var app = angular.module('people');

app.controller('PersonCtrl', ['$http', '$scope', 'fileUpload', function ($http, $scope, fileUpload) { 
    var self = this;

    // fill dropdowns with data
    $http.get('/api/languages/').then(function (lang) {
        self.languages = lang.data;
    });

    $http.get('/api/education/').then(function (edu) {
        self.institutes = edu.data;
    });

    self.info = {};

    self.info.positions = [{id: 0, title:  null}];

    self.addPosition = function () {
        self.info.positions.push({id: 0, title:  null});
    };

    self.deletePosition = function (index) {
       self.info.positions.splice(index, 1);
    };

    self.uploadFile = function(){
        var file = self.info.avatar;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/api/people/";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };


    self.postData = function () {
        console.log(self.info);
    };

}]);