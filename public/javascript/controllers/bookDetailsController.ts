"use strict";
namespace app.Controllers {
  export class BookDetailsController {
    public book;

    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
      ) {
        this.book = HomeService.getBook( $routeParams['id'] );
    }
  }

  angular.module('app').controller('BookDetailsController', BookDetailsController);
}
