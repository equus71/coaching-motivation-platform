(function () {
    'use strict';

    angular
        .module('cmp.dashboard')
        .factory('statsService', statsService);

    statsService.$inject = ['$http', '$q', 'lodash'];

    function statsService($http, $q, lodash) {
        return{
            getStats: getStats
        };

        function getStats() {
            var deferred = $q.defer();
            $http.get('/static/json/stats.json').success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

    }

})();