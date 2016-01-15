'use strict';
namespace app.Controllers {
  export class HomeController {

    public books;

    public delete(id) {
        this.HomeService.deleteBook(id).then((res) => {
            this.$location.path("/");
        });
    }

    constructor(private HomeService: app.Services.HomeService,
                private $location: ng.ILocationService,
                private $routeParams: ng.route.IRouteParamsService

    ) {
      this.books = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
