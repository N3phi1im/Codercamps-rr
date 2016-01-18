"use strict";
namespace app.Services {
  export class CommentService {
    private commentResource;

    public saveComment(comment) {
      return this.commentResource.save(comment).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.commentResource = $resource('/api/comments/:id');
    }
  }
  angular.module('app').service('CommentService', CommentService);
}
