"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.BookResource = $resource("/books");
            }
            HomeService.prototype.getAll = function () {
                return this.BookResource.query();
            };
            ;
            HomeService.prototype.saveBook = function (book) {
                return this.BookResource.save(book).$promise;
            };
            ;
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
