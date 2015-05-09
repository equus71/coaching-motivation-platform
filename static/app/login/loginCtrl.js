(function () {
    'use strict';

    angular
        .module('cmp.login', ['cmp.common'])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authenticationService', '$state'];

    function LoginCtrl(authenticationService, $state) {
        var vm = this;

        vm.login = login;

        function login(){
            if(vm.loginForm.$valid){
                authenticationService.login(vm.username, vm.password).then(loginSuccess, loginFailure);
            }

            function loginSuccess(data) {
                $state.go('board.dashboard');
            }

            function loginFailure(data) {
                //TODO: give error
            }
        }
    }

})();