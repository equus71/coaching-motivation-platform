(function () {
    'use strict';

    angular
        .module('cmp.contacts', ['cmp.common', 'ngLodash'])
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['$state', 'contactsService'];

    function ContactsCtrl($state, contactsService) {
        var vm = this;

        vm.goToContact = toContact;
        vm.typeFilterOptions = [
            {name: 'Wszystkie', value: null},
            {name: 'Aktywne', value: {value: true, key: "isActive"}},
            {name: 'Nieaktywne', value: {value: false, key: "isActive"}}
        ];
        vm.typeFilterValue = vm.typeFilterOptions[1].value;

        activate();

        function activate() {
            vm.loading = true;

            contactsService.getContacts().then(function (data) {
                vm.contacts = data;
                vm.contacts = contactsService.sortContacts(vm.contacts);
                vm.loading = false;
            });
        }

        function toContact(id) {
            $state.go('.edit', {'contactId': id});
        }
    }

})();