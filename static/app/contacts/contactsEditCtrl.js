(function () {
    'use strict';

    angular
        .module('cmp.contacts')
        .controller('ContactsEditCtrl', ContactsEditCtrl);

    ContactsEditCtrl.$inject = ['$state', 'alertService', 'contactsService', 'lodash', 'tagService', 'validationService'];

    function ContactsEditCtrl($state, alertService, contactsService, lodash, tagService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.fieldValidation = validationService.fieldValidation;
        vm.save = saveContact;
        vm.ageRange = lodash.range(3,103);

        activate();

        function activate() {
            contactsService.getContact($state.params.contactId).then(function (data) {
                vm.contact = data;
            });
            tagService.clearCache();
        }

        function saveContact() {
            if (vm.contactForm.$valid) {
                vm.saving = true;
                contactsService.saveContact(vm.contact).then(function () {
                    $state.go('^');
                }, function () {
                    alertService.addAlert('Nie udało się zapisać kontaktu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.contactForm);
            }
        }

    }

})();