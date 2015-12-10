angular.module('starter.services', [])

.constant('loginUrl', 'http://dev.tourneyx.com/api/v1/post.json?action=user_login')

.factory('Auth', ['$http', 'loginUrl', function($http, loginUrl) {
  return {
    login: function (creds) {
      return $http.get(loginUrl + '&username=' + creds.username + '&password=' + creds.password);
    }
  };
}])
