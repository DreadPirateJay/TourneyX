'use strict';
angular.module('tourneyx', [
  'ionic','ionic.service.core',
  'tourneyx.controllers',
  'tourneyx.services',
  'LocalForageModule'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })

  .state('tourneys', {
    url: '/tourneys',
    templateUrl: 'templates/list.html',
    controller: 'TourneysCtrl as ctrl'
  })

  .state('registerTourney', {
    url: '/tourneys/registe/:id',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl as ctrl'
  })

  .state('showTourney', {
    url: '/tourneys/:id',
    templateUrl: 'templates/show.html',
    controller: 'TourneyCtrl as ctrl'
  })

  .state('tab.submit', {
    url: '/submit',
    views: {
      'tab-submit': {
        templateUrl: 'templates/tab-submit.html',
        controller: 'SubmitCtrl as ctrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
