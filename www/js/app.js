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

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.tourneys', {
    url: '/tourneys',
    views: {
      'tab-tourneys': {
        templateUrl: 'templates/tab-tourneys.html',
        controller: 'TourneysCtrl as ctrl'
      }
    }
  })

  .state('tab.submit', {
    url: '/submit',
    views: {
      'tab-submit': {
        templateUrl: 'templates/tab-submit.html',
        controller: 'SubmitCtrl as ctrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  });

  $urlRouterProvider.otherwise('/login');

});
