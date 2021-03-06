(function () {
    'use strict';

    angular
        .module('cmp.contacts')
        .controller('ContactsAddCtrl', ContactsAddCtrl);

    ContactsAddCtrl.$inject = ['$state', 'alertService', 'contactsService', 'lodash', 'tagService', 'validationService'];

    function ContactsAddCtrl($state, alertService, contactsService, lodash, tagService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.fieldValidation = validationService.fieldValidation;
        vm.save = saveContact;
        vm.ageRange = lodash.range(3,103);

        activate();

        function activate() {
            vm.contact = {
                newContact: true,
                isActive: true
            };
            vm.formattedTags = [];
            tagService.clearCache();
        }

        function saveContact() {
            if (vm.contactForm.$valid) {
                vm.saveInProgress = true;
                vm.contact.tags = tagService.getPlainTags(vm.formattedTags);
                contactsService.createContact(vm.contact).then(function () {
                    $state.go('^');
                }, function () {
                    vm.saveInProgress = false;
                    alertService.addAlert('Nie udało się zapisać kontaktu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.contactForm);
            }
        }

    }

})();