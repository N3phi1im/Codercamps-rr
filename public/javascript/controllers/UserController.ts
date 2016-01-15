'use strict';
namespace app.Controllers {
  export class UserController {
    public login(user) {
      this.UserService.login(user).then((res) => {
        this.$location.path('/');
      })
    }

    public register(user) {
      this.UserService.register(user).then((res) => {
        this.$location.path('/');
      });
    };

    constructor(private UserService: app.Services.UserService,
    private $location: ng.ILocationService) {

    }
  }
  angular.module('app').controller('UserController', UserController);
}
