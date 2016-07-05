var app = angular.module('people');

app.controller('PersonCtrl', ['$scope', '$http', 'Upload', function ($scope, $http, Upload) {
    var self = this;
    
    self.info = {};

    self.postData = function () {
        console.log(self.data);
    };


    self.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    self.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

}]);

app.directive('tabs', [function () {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function ($scope) {
            this.tabs = $scope.tabs = [];

            $scope.selectTab = function (tab) {
                angular.forEach($scope.tabs, function (tab) {
                    tab.selected = false
                });
                tab.selected = true;
            };

            this.addTab = function (tab) {
              $scope.tabs.push(tab);
            };
        }],
        transclude: true,
        template:
            '<div class="tabs"><h1>{{title}}</h1>' +
                '<ul class="nav nav-tabs">' +
                    '<li ng-repeat="tab in tabs" ng-class="{active: tab.selected}">' +
                        '<a href ng-click="selectTab(tab)">{{tab.title | firstLetter}}</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
            '<div ng-transclude></div>'
    }
}]);

app.directive('tab', function () {
    return {
        restrict: 'E',
        require: '^tabs',
        // make title visible inside the directive scope
        scope: {
            title: '@',
            person: '=ctrl'
        },
        link: function (scope, elem, attrs, ctrl) {
            ctrl.addTab(scope);
        },
        templateUrl: function (el, attr) {
            return './views/partials/person/' + attr.title + '.html';
        }
    }
});

app.filter('firstLetter', function () {
    return function (input) {
        if (input)
            return input[0].toUpperCase() + input.substring(1);
    }
});