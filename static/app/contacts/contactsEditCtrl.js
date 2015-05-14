(function () {
    'use strict';

    angular
        .module('cmp.contacts')
        .controller('ContactsEditCtrl', ContactsEditCtrl);

    ContactsEditCtrl.$inject = ['$state', 'alertService', 'contactsService', 'deleteModalService', 'lodash', 'tagService', 'validationService'];

    function ContactsEditCtrl($state, alertService, contactsService, deleteModalService, lodash, tagService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.fieldValidation = validationService.fieldValidation;
        vm.save = saveContact;
        vm.delete = deleteContact;
        vm.ageRange = lodash.range(3,103);
        vm.formattedTags = [];

        activate();

        function activate() {
            contactsService.getContact($state.params.contactId).then(function (data) {
                vm.contact = data;
                vm.formattedTags = tagService.generateFormattedTags(vm.contact.tags);
            });
            tagService.clearCache();
        }

        function saveContact() {
            if (vm.contactForm.$valid) {
                vm.saveInProgress = false;
                vm.contact.tags = tagService.getPlainTags(vm.formattedTags);
                contactsService.saveContact(vm.contact).then(function () {
                    $state.go('^');
                }, function () {
                    vm.saveInProgress = false;
                    alertService.addAlert('Nie udało się zapisać kontaktu.', 'danger', 30000);
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.contactForm);
            }
        }

        function deleteContact(){
            vm.deleteInProgress = true;
            deleteModalService.makeDeleteModal(vm.contact, "CONTACT").then(function(){
                contactsService.deleteContact(vm.contact).then(function(){
                    $state.go('.^');
                }, function(){
                    vm.deleteInProgress = false;
                    alertService.addAlert('Nie udało się skasować kontaktu.', 'danger', 30000);
                })
            });
        }

    }

})();