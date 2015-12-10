'use strict';
angular.module('tourneyx.controllers', ['ngCordova'])

.controller('LoginCtrl', function (
  $scope,
  $state,
  $http,
  $ionicPopup,
  Auth
) {
  if (Auth.getUser()) {
    $state.go('tab.tourneys');
  }

  this.login = function () {
    Auth.login(this.creds);

    $scope.$on('event:auth-login-confirmed', function () {
      $state.go('tab.tourneys');
    });

    $scope.$on('event:auth-login-failed', function () {
      console.log('login failed');
      $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please check your credentials and try again.'
      });
    });
  };
})

.controller('TourneysCtrl', function (Tourneys) {

  this.tourneys = Tourneys.getTourneys();

})

.controller('SubmitCtrl', function ($ionicPlatform, $cordovaCamera) {
  this.imgUrl = 'http://placehold.it/300x300';

  $ionicPlatform.ready(function () {
    this.takePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 300,
        targetHeight: 300,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imgUrl) {
        alert(imgUrl);
      });
    };
  }.bind(this));
});