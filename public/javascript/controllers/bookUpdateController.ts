"use strict";
namespace app.Controllers {
  export class BookUpdateController {
    public book; // creates a this.book property

    public update(id) {
      this.HomeService.updateBook(this.book).then((res) => {
        this.$location.path("/");
      });
    }

    constructor(private HomeService: app.Services.HomeService, private $location: ng.ILocationService, private $routeParams: ng.route.IRouteParamsService) {
      // $routeParams['id'] is linked to :id on the /update route on app.ts
      this.book = HomeService.getBook($routeParams["id"]);
    };
  }
  angular.module('app').controller("BookUpdateController", BookUpdateController);
}
