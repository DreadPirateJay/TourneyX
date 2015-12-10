'use strict';
angular.module('tourneyx.services', [])

.constant('loginUrl', 'http://dev.tourneyx.com/api/v1/post.json?action=user_login')
.constant('apiUrl', 'http://dev.tourneyx.com/api/v1')

.factory('Auth', function(
  $rootScope,
  $http,
  loginUrl,
  $localForage
) {
  return {
    login: function (creds) {
      $http.get(loginUrl
        + '&username='
        + creds.username
        + '&password='
        + creds.password)

      .success(function (data, status) {
        var userId = data.data;

        $localForage
        .setItem('userId', userId)
        .then(function () {
          $rootScope.$broadcast('event:auth-login-confirmed', data);
        });
      })
      .error(function (data, status) {
        $localForage.removeItem('userId');
        $rootScope.$broadcast('event:auth-login-failed', status);
      });
    },

    logout: function (user) {
      $localForage.removeItem('userId');
      $rootScope.$broadcast('event:auth-logout-complete');
    },

    getUser: function () {
      return $localForage.getItem('userId');
    }
  };
})

.factory('Tourneys', function ($http, apiUrl) {
  return {
    getTourneys: function () {
      // return $http.get(apiUrl + '/get.json?action=tourney_list');
      return [
        { id: 1, name: 'ABC Tournament', info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis rerum aut.' },
        { id: 2, name: 'XYZ Invitational', info: 'Est non earum, error itaque doloribus odit officiis magni possimus.'}
      ];
    }
  };
});
