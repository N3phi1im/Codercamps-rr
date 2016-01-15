'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(UserService, $location) {
                this.UserService = UserService;
                this.$location = $location;
            }
            UserController.prototype.login = function (user) {
                var _this = this;
                this.UserService.login(this.user).then(function (res) {
                    _this.$location.path('/');
                });
            };
            UserController.prototype.register = function (user) {
                var _this = this;
                this.UserService.register(this.user).then(function (res) {
                    _this.$location.path('/');
                });
            };
            ;
            return UserController;
        })();
        Controllers.UserController = UserController;
        angular.module('app').controller('UserController', UserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
