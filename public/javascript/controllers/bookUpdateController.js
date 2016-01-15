"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BookUpdateController = (function () {
            function BookUpdateController(HomeService, $location, $routeParams) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.book = HomeService.getBook($routeParams["id"]);
            }
            BookUpdateController.prototype.update = function (id) {
                var _this = this;
                this.HomeService.updateBook(this.book).then(function (res) {
                    _this.$location.path("/");
                });
            };
            ;
            return BookUpdateController;
        })();
        Controllers.BookUpdateController = BookUpdateController;
        angular.module('app').controller("BookUpdateController", BookUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
