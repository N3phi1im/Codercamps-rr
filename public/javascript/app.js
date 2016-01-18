'use strict';
var App;
(function (App) {
    angular.module('app', ['ngRoute', 'ngResource'])
        .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/Home.html',
            controller: app.Controllers.HomeController,
            controllerAs: 'vm'
        })
            .when('/details/:id', {
            templateUrl: '/templates/bookDetails.html',
            controller: app.Controllers.BookDetailsController,
            controllerAs: 'vm'
        })
            .when('/booksCreate', {
            templateUrl: '/templates/booksCreate.html',
            controller: app.Controllers.BooksCreateController,
            controllerAs: 'vm'
        })
            .when('/update/:id', {
            templateUrl: '/templates/bookUpdate.html',
            controller: app.Controllers.BookUpdateController,
            controllerAs: 'vm'
        })
            .when('/login', {
            templateUrl: '/templates/Login.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        })
            .when('/register', {
            templateUrl: '/templates/Register.html',
            controller: app.Controllers.UserController,
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
    });
})(App || (App = {}));
