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
        vm.formattedTags = [];

        activate();

        function activate() {
            contactsService.getContact($state.params.contactId).then(function (data) {
                vm.contact = data;
                vm.formattedTags = generateFormattedTags(vm.contact);
            });
            tagService.clearCache();
        }

        function saveContact() {
            if (vm.contactForm.$valid) {
                vm.saving = true;
                vm.contact.tags = getPlainTags(vm.formattedTags);
                contactsService.saveContact(vm.contact).then(function () {
                    $state.go('^');
                }, function () {
                    alertService.addAlert('Nie udało się zapisać kontaktu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.contactForm);
            }
        }

        function generateFormattedTags(contact) {
            var formattedTags = [];
            lodash.forEach(contact.tags, function(tag) {
                formattedTags.push({text:tag});
            });
            return formattedTags;
        }

        function getPlainTags(formattedTags) {
            var plainTags = [];
            lodash.forEach(formattedTags, function(tag) {
                plainTags.push(tag.text);
            });
            return plainTags;
        }

    }

})();