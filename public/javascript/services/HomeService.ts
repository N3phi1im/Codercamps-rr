"use strict";
namespace app.Services {
  export class HomeService {

    public BookResource;

    public getAll() {
      return this.BookResource.query();
    };

    public saveBook(book){
        return this.BookResource.save(book).$promise;
    };

    constructor(private $resource: ng.resource.IResourceService) {
      this.BookResource = $resource("/books");
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
