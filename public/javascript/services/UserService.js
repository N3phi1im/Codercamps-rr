'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.user = {};
                this.UserLoginResource = $resource('/users/login');
                this.UserRegisterResource = $resource('/users/register');
            }
            UserService.prototype.register = function (user) {
                return this.UserRegisterResource.save(user).$promise;
            };
            ;
            UserService.prototype.login = function (user) {
                return this.UserLoginResource.save(user).$promise;
            };
            return UserService;
        })();
        Services.UserService = UserService;
        angular.module('app').service('UserService', UserService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
