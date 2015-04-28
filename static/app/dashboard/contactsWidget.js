(function () {
    'use strict';

    angular.module('cmp.dashboard')
        .directive('cmpContactsWidget', cmpContactsWidget);

    cmpContactsWidget.$inject = [];

    function cmpContactsWidget() {
        var directive = {
            restrict: 'E',
            controller: ControllerFunc,
            controllerAs: 'vmc',
            bindToController: true,
            templateUrl: 'dashboard/contactsWidget.html'
        };

        ControllerFunc.$inject = ['$state', 'alertService', 'contactsService', 'lodash'];

        return directive;

        function ControllerFunc($state, alertService, contactsService, lodash) {
            var vm = this;

            vm.contacts = [];
            vm.writeToContact = writeToContact;
            vm.postponeContact = postponeContact;
            vm.markContactedNow = markContactedNow;
            vm.deactivateContact = deactivateContact;
            vm.currentPage = 1;
            vm.pageSize = 10;

            activate();

            function activate() {
                contactsService.getContacts(true).then(function (data) {
                    vm.contacts = data;
                    vm.contacts = contactsService.sortContacts(vm.contacts);
                });
            }

            function writeToContact(contact) {
                $state.go('message', {'contactId': contact.id});
            }

            function postponeContact(contact) {
                var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                var result = contactsService.postponeContact(contact, tomorrow);
                result.then(function () {
                    //TODO: mark contact with new state & resort list
                    lodash.remove(vm.contacts, function (obj) {
                        return obj == contact;
                    });
                    result.undo.callbacks.push(addContactBackToContacts);
                    alertService.addAlert('Kontakt odroczony do jutra.', 'success', 15000, result.undo);
                });
            }

            function markContactedNow(contact) {
                var now = new Date();
                var result = contactsService.markContacted(contact, now);
                result.then(function () {
                    //TODO: mark contact with new state & resort list
                    lodash.remove(vm.contacts, function (obj) {
                        return obj == contact;
                    });
                    result.undo.callbacks.push(addContactBackToContacts);
                    alertService.addAlert('Kontakt oznaczony jako obsłużony.', 'success', 15000, result.undo);
                });
            }

            function deactivateContact(contact) {
                var result = contactsService.deactivateContact(contact);
                result.then(function () {
                    lodash.remove(vm.contacts, function (obj) {
                        return obj == contact;
                    });
                    result.undo.callbacks.push(addContactBackToContacts);
                    alertService.addAlert('Kontakt deaktywowany.', 'success', 15000, result.undo);
                });
            }

            function addContactBackToContacts(contact) {
                vm.contacts.push(contact);
                vm.contacts = contactsService.sortContacts(vm.contacts);
            }

        }
    }

})();