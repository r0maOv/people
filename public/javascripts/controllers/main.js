angular.module('people', ['ui.router', 'ngRoute'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({ enabled: true });

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/list.html"
            })
            .state('language', {
                url: "/languages",
                templateUrl: "partials/languages.html",
                controller: 'LanguageCtrl',
                controllerAs: 'langVm'
            })
            .state('education', {
                url: "/education",
                templateUrl: "partials/education.html",
                controller: 'EducationCtrl',
                controllerAs: 'eduVm'
            })
            .state('person', {
                url: "/person",
                templateUrl: "partials/person.html",
                controller: 'PersonCtrl',
                controllerAs: 'PVm'
            })
            .state('not-found', {
                url: "/404",
                templateUrl: "partials/404.html"
            });
    })
    .directive('modalWrapper', function () {
        return {

        }
    });