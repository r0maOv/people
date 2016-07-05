var app = angular.module('people');

app.controller('PersonCtrl', ['$scope', '$http', 'FileUpload', function ($scope, $http, FileUpload) {
    var self = this;

    self.callSrv = function () {
        // FileUpload.uploadFileToUrl(self.profile, '/api/people');
    };

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



    self.test = 'test';

    self.person = {};

    self.postData = function () {
        console.log(self.person);
    };

}]);

app.directive('uploadFile', ['$http', '$parse', function ($http, $parse) {
    return {
        restrict: 'A',
        controller: 'PersonCtrl',
        link: function (scope, el, attr, ctrl) {
            var getter = $parse(attr.uploadFile);
            var setter = getter.assign;

            el.bind('change', function(){
                scope.$apply(function(){
                    setter(scope, el[0].files[0]);
                });

                ctrl.callSrv();
            });

        }
    }
}]);

app.directive('tabs', [function () {
    return {
        restrict: 'E',
        scope: true,
        // controller: ['$scope', function ($scope) {
        //     this.tabs = $scope.tabs = [];
        //
        //     $scope.selectTab = function (tab) {
        //         angular.forEach($scope.tabs, function (tab) {
        //             tab.selected = false
        //         });
        //         tab.selected = true;
        //     };
        //
        //     this.addTab = function (tab) {
        //       $scope.tabs.push(tab);
        //     };
        // }],
        controller: 'PersonCtrl',
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
            title: '@'
            // PVm: '@myCtrl'
        },
        link: function (scope, elem, attrs, ctrl) {
            ctrl.addTab(scope);

            console.log(ctrl);

        },
        transclude: true,
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

app.service('FileUpload', ['$document', '$http', function ($document, $http) {

    this.uploadFileToUrl = function(file, uploadUrl){

        var formData = new FormData($document.find('form'));
        formData.append('file', file);

        $http.post(uploadUrl, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (res) {
            console.log(res.data);
        }, function (err) {
            console.log(err.data);
        });
    };
}]);