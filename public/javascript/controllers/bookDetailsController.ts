"use strict";
namespace app.Controllers {
  export class BookDetailsController {
    public book;
    public comment: String;

    public addComment() {
      let comment = {
        message: this.comment,
        book: this.book._id
      };
      this.CommentService.saveComment(comment).then((res) => {
        this.book.comments.push(res);
      });
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private CommentService: app.Services.CommentService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
      ) {
        this.book = HomeService.getBook( $routeParams['id'] );
    }
  }

  angular.module('app').controller('BookDetailsController', BookDetailsController);
}
