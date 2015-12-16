'use strict';
angular.module('tourneyx.controllers', ['ngCordova', 'angularMoment'])

.controller('LoginCtrl', function (
  $scope,
  $state,
  $http,
  $ionicPopup,
  Auth
) {
  Auth.getUserId().then(function (userId) {
    if (userId) {
      $state.go('tourneys');
    }
  });

  this.login = function () {
    Auth.login(this.creds);

    $scope.$on('event:auth-login-confirmed', function () {
      $state.go('tourneys');
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

.controller('NavBtnsCtrl', function ($scope, Auth) {
  $scope.logout = Auth.logout;
})

.controller('TourneysCtrl', function ($rootScope, $scope, $state, Tourneys, User) {
  this.tourneys = Tourneys.get();

  User.getRegTourneys().then(function (regTourneys) {
    this.tourneys.map(function (tourney) {
      if (regTourneys.indexOf(tourney.id) > 0) {
        tourney.registered = true
      } else {
        tourney.registered = false;
      }
      return tourney;
    }.bind(this));
  }.bind(this));

  this.click = function (tourneyId) {
    User.getRegTourneys().then(function (regIds) {
      if (regIds.indexOf(tourneyId) >= 0) {
        $state.go('showTourney', { id: tourneyId });
      } else {
        $state.go('registerTourney', { id: tourneyId });
      }
    }.bind(this));
  };

  $scope.$on('event:auth-logout-complete', function () {
    $state.go('login');
  });
})

.controller('RegisterCtrl', function ($stateParams, Tourneys) {
  this.tourney = Tourneys.get($stateParams.id);

  console.log(this.tourney);
})

.controller('TourneyCtrl', function ($state, $stateParams, Tourneys) {
  this.tourney = Tourneys.get($stateParams.id);


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