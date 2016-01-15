"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BooksCreateController = (function () {
            function BooksCreateController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.book = {};
            }
            BooksCreateController.prototype.createBook = function () {
                var _this = this;
                this.HomeService.saveBook(this.book).then(function (res) {
                    _this.$location.path('/');
                });
            };
            return BooksCreateController;
        })();
        Controllers.BooksCreateController = BooksCreateController;
        angular.module('app').controller('BooksCreateController', BooksCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
