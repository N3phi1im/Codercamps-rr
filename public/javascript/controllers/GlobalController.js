"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var GlobalController = (function () {
            function GlobalController() {
            }
            return GlobalController;
        })();
        Controllers.GlobalController = GlobalController;
        angular.module('app').controller('GlobalController', GlobalController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
