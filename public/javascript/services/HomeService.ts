"use strict";
namespace app.Services {
  export class HomeService {

    public BookResource;

    public getAll() {
      // GET: /books
      return this.BookResource.query();
    }

    public getBook(bookId) {
      // GET: /books/{{bookId}}
      return this.BookResource.get({ id: bookId });
    }

    public saveBook(book) {
      // POST: /books
      return this.BookResource.save(book).$promise;
    };

    public updateBook(book) {
      // PUT: /books/{{book._id}}
      return this.BookResource.update({ id: book._id }, book).$promise;
    }

    public deleteBook(bookId) {
      // DELETE: /books?_id={{id}}
      return this.BookResource.delete({ _id: bookId }).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService) {

      this.BookResource = $resource("/books/:id", null,
        {
          'update': { method: 'PUT' }
        });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
