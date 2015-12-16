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

    logout: function () {
      $localForage.removeItem('userId').then(function (value) {
        $rootScope.$broadcast('event:auth-logout-complete');
      });
    },

    getUserId: function () {
      return $localForage.getItem('userId');
    }
  };
})

.factory('Tourneys', function ($http, $filter, apiUrl) {
  var tourneys = [
    {
      id: 1,
      name: 'TourneyX Test',
      location: 'Madison, MS',
      startDate: '2015-12-12',
      endDate: '2015-12-31',
      teamTourney: false,
      fishTypes: ['Bass'],
      entryFee: 'Free'
    },
    {
      id: 2,
      name: 'TourneyX Test w/ Teams',
      location: 'Madison, MS',
      startDate: '2015-12-13',
      endDate: '2015-12-31',
      teamTourney: true,
      fishTypes: ['Bass'],
      entryFee: 'Free'
    }
  ];

  return {
    get: function (id) {
      // return $http.get(apiUrl + '/get.json?action=tourney_list');
      if (id) {
        return $filter('filter')(tourneys, function (t) {
          return t.id === parseInt(id, 10);
        })[0];
      } else {
        return tourneys;
      }
    }
  };
})

.factory('User', function ($q, $localForage) {
  return {
    getRegTourneys: function () {
      var dfd = $q.defer();

      $localForage.setItem('registeredTourneys', [1]).then(function () {
        dfd.resolve($localForage.getItem('registeredTourneys'));
      });

      return dfd.promise;
    },

    getId: function () {
      return $localForage.getItem('userId');
    }
  };
});
