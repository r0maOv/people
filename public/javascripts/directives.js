var app = angular.module('people');

// show modal window when delete items
app.directive('modal', function () {
    return {
        restrict: 'E',
        scope: {
            ctrlVm: '=ctrl',
            itemName: '='
        },
        templateUrl: './views/tmpl/modal.html'
    }
});

// calendar
app.directive('datepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, el) {
            $(el).datepicker({
                format: "dd-mm-yyyy",
                autoclose: true,
                todayHighlight: true,
                toggleActive: true
            });
        }
    }
});

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
        templateUrl: './views/tmpl/tabs.html'
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


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        // controller: 'PersonCtrl',
        link: function(scope, element, attrs, ctrl) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
