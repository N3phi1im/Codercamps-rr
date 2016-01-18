"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BookDetailsController = (function () {
            function BookDetailsController(HomeService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.book = HomeService.getBook($routeParams['id']);
            }
            return BookDetailsController;
        })();
        Controllers.BookDetailsController = BookDetailsController;
        angular.module('app').controller('BookDetailsController', BookDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
