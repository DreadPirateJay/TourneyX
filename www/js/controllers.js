angular.module('starter.controllers', [])

.controller('LoginCtrl', [
  '$http',
  '$ionicPopup',
  'Auth',
  '$localForage',
  '$state',
  function ($http, $ionicPopup, Auth, $localForage, $state) {
    $localForage.getItem('userId', function (userId) {
      if (userId) { $state.go('tab.tourneys'); }
    });

    this.login = function () {
      Auth.login(this.creds)
      .success(function (response) {
        $localForage
        .setItem('userId', response.data)
        .then(function () {
          $state.go('tab.tourneys');
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

.controller('TourneysCtrl', [function(){

}]);