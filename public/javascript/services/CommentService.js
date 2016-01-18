"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var CommentService = (function () {
            function CommentService($resource) {
                this.$resource = $resource;
                this.commentResource = $resource('/api/comments/:id');
            }
            CommentService.prototype.saveComment = function (comment) {
                return this.commentResource.save(comment).$promise;
            };
            return CommentService;
        })();
        Services.CommentService = CommentService;
        angular.module('app').service('CommentService', CommentService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
