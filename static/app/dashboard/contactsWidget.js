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
            templateUrl: 'dashboard/contactsWidget.html'
        };

        ControllerFunc.$inject = ['$modal', '$state', 'alertService', 'contactsService', 'lodash'];

        return directive;

        function ControllerFunc($modal, $state, alertService, contactsService, lodash) {
            var vm = this;

            vm.contacts = [];
            vm.writeToContact = writeToContact;
            vm.postponeContact = postponeContact;
            vm.markContactedNow = markContactedNow;
            vm.deactivateContact = deactivateContact;
            vm.currentPage = 1;
            vm.pageSize = 2;

            contactsService.getContacts().then(function (data) {
                vm.contacts = data.contacts;
            });

            function writeToContact(contact) {
                $state.go('message', {'contactId': contact.id});
            }

            function postponeContact(contact) {
                var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                contactsService.postponeContact(contact, tomorrow).then(function () {
                    lodash.remove(vm.contacts, function (obj) {
                        return obj == contact;
                    });
                    alertService.addAlert('Kontakt odroczony do jutra.', 'success', 3000);
                    //    TODO: add undo
                });
            }

            function markContactedNow(contact) {
                var now = new Date();
                contactsService.markContacted(contact, now).then(function () {
                    lodash.remove(vm.contacts, function (obj) {
                        return obj == contact;
                    });
                    alertService.addAlert('Kontakt oznaczony jako obsłużony.', 'success', 3000);
                    //    TODO: add undo
                });
            }

            function deactivateContact(contact) {
                var promptModal = $modal.open({
                    templateUrl: 'dashboard/deactiveContactModal.html'
                });
                promptModal.result.then(function () {
                    contactsService.deactivateContact(contact).then(function () {
                        lodash.remove(vm.contacts, function (obj) {
                            return obj == contact;
                        });
                        alertService.addAlert('Kontakt deaktywowany.', 'success', 3000);
                        //    TODO: add undo
                    });
                });
            }
        }
    }

})();