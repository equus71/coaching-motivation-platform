(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpUserAccount', cmpUserAccount);

    cmpUserAccount.$inject = [];

    function cmpUserAccount() {
        var directive = {
            restrict: 'E',
            controller: controllerFunc,
            controllerAs: "vmu",
            templateUrl: "board/userAccountDirective.html"
        };
        controllerFunc.$inject = ['$state', 'authenticationService'];

        return directive;

        function controllerFunc($state, authenticationService) {
            var vm = this;

            vm.user = authenticationService.getUser();
            vm.logout = logout;

            function logout(){
                authenticationService.logout().then(logoutSuccess);

                function logoutSuccess(){
                    $state.go('login');
                }
            }

        }
    }
})();