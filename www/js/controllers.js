angular.module('starter.controllers', [])

.controller('LoginCtrl', [
  '$http',
  '$ionicPopup',
  'Auth',
  '$localForage',
  '$state',
  function ($http, $ionicPopup, Auth, $localForage, $state) {
    this.login = function () {
      Auth.login(this.creds)
      .success(function (response) {
        $localForage
        .setItem('userId', response.data)
        .then(function () {
          $state.go('tab.dash');
        });
      })
      .error(function () {
        $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        })
      });
    };
  }
])

.controller('DashCtrl', [function(){

}]);