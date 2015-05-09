(function () {
    'use strict';

    angular
        .module('cmp.common')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$cookies', '$http'];

    function authenticationService($cookies, $http) {
        return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getUser: getUser
        };
        function login(username, password) {
            return $http.post('/api/v1/auth/login/', {
                username: username, password: password
            }).then(loginSuccess);

            function loginSuccess(data) {
                storeUserData(data.data);
            }
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/').then(logoutSuccess);

            function logoutSuccess(data) {
                delete $cookies.authenticatedAccount;
            }
        }

        function isAuthenticated() {
            return $cookies.authenticatedAccount ? true : false;
        }

        function getUser() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function storeUserData(data) {
            $cookies.authenticatedAccount = JSON.stringify(data.user);
        }

    }

})();