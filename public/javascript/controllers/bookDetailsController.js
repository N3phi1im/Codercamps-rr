"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BookDetailsController = (function () {
            function BookDetailsController(HomeService, CommentService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.CommentService = CommentService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.book = HomeService.getBook($routeParams['id']);
            }
            BookDetailsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment,
                    book: this.book._id
                };
                this.CommentService.saveComment(comment).then(function (res) {
                    _this.book.comments.push(res);
                });
            };
            BookDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentService.deleteComment(comment).then(function (res) {
                    _this.book.comments.splice(_this.book.comments.indexOf(comment), 1);
                });
            };
            return BookDetailsController;
        })();
        Controllers.BookDetailsController = BookDetailsController;
        angular.module('app').controller('BookDetailsController', BookDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
