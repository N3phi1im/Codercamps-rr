'use strict';
namespace app.Services {
  export class UserService {
    public user = {};
    public UserLoginResource;
    public UserRegisterResource;

    public register(user) {
      return this.UserRegisterResource.save(user).$promise;
    };

    public login(user) {
      return this.UserLoginResource.save(user).$promise;
    }

    constructor(private $resource: ng.resource.IResourceService) {
      this.UserLoginResource = $resource('/users/login');
      this.UserRegisterResource = $resource('/users/register');
    }
  }

  angular.module('app').service('UserService', UserService);
}
