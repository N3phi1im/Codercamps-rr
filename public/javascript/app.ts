'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource'])
    .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {


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
    // :id is linked to $routeParams['id'] on the BookUpdateController
    // :apple would be linked to $routeParams['apple']
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
}
