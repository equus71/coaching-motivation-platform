(function () {
    'use strict';

    angular.module('cmp.dashboard')
        .directive('cmpContactsWidget', cmpContactsWidget);

    cmpContactsWidget.$inject = [];

    function cmpContactsWidget() {
        var directive = {
            restrict: 'E',
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/static/app/dashboard/contactsWidget.html'
        };

        ControllerFunc.$inject = ['contactsService'];

        return directive;

        function ControllerFunc(contactsService) {
            var vm = this;

            vm.contacts = [];
            vm.currentPage = 1;

            contactsService.getContacts().then(function(data){
                vm.contacts = data.contacts;
            });

        }
    }

})();