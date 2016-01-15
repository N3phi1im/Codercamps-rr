'use strict';
namespace app.Controllers {
  export class UserController {
    public user;

    public login(user) {
      this.UserService.login(this.user).then((res) => {
        this.$location.path('/');
      })
    }

    public register(user) {
      this.UserService.register(this.user).then((res) => {
        this.$location.path('/');
      });
    };

    constructor(private UserService: app.Services.UserService,
    private $location: ng.ILocationService) {

    }
  }
  angular.module('app').controller('UserController', UserController);
}
