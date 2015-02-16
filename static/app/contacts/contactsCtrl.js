(function () {
    'use strict';

    angular
        .module('cmp.contacts', ['ngLodash'])
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['$state', 'contactsService'];

    function ContactsCtrl($state, contactsService) {
        var vm = this;

        vm.goToContact = toContact;
        vm.typeFilterValue = null;
        vm.typeFilterOptions = [
            {name: 'Wszystkie', value: null},
            {name: 'Aktywne', value: 'active'},
            {name: 'Nieaktywne', value: 'inactive'}
        ];

        activate();

        function activate() {
            contactsService.getContacts().then(function (data) {
                vm.contacts = data.contacts;
            });
        }

        function toContact(id) {
            $state.go('.edit', {'contactId': id});
        }
    }

})();