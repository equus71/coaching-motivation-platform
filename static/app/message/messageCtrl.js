(function () {
    'use strict';

    angular
        .module('cmp.message', ['ngLodash'])
        .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$location', '$q', '$scope', '$state', 'contactsService', 'lodash', 'messageTemplatesService'];

    function MessageCtrl($location, $q, $scope, $state, contactsService, lodash, messageTemplatesService) {
        var vm = this;

        vm.openContactPicker = openContactPicker;
        vm.closeUserPicker = closeUserPicker;
        vm.openTemplatePicker = openTemplatePicker;
        vm.closeTemplatePicker = closeTemplatePicker;
        vm.message = {
            type: 'EMAIL',
            header: '',
            body: ''
        };
        vm.templatePicker = false;
        vm.templates = [];
//        vm.contactTypeFilterValue = null;
//        vm.contactTypeFilterOptions = [
//            {name: 'Wszystkie', value: null},
//            {name: 'Aktywne', value: 'active'},
//            {name: 'Nieaktywne', value: 'inactive'}
//        ];

        $scope.$on('templateSelect', templateChange);
        $scope.$on('contactSelect', contactChangeHandler);

        activate();

        function activate() {
            vm.loading = true;
            var contactsPromise = contactsService.getContacts();
            contactsPromise.then(function (data) {
                vm.contacts = data.contacts;
            });
            var templatesPromise = messageTemplatesService.getTemplates();
            templatesPromise.then(function (data) {
                vm.templates = data.templates;
            });
            $q.all([contactsPromise, templatesPromise]).then(function () {
                vm.loading = false;
                if ($state.params.contactId) {
                    vm.contact = lodash.find(vm.contacts, function (obj) {
                        return obj.id == $state.params.contactId;
                    });
                    contactChange();
                }
                if ($state.params.templateId) {
                    vm.template = lodash.find(vm.templates, function (obj) {
                        return obj.id == $state.params.templateId;
                    });
                    renderTemplate();
                }
            });
        }

        function contactChangeHandler(event, contact) {
            vm.contact = contact;
            $location.search('contactId', contact.id);
            contactChange();
        }

        function contactChange() {
            sortTemplates();
            renderTemplate();
        }

        function templateChange(event, template){
            vm.template = template;
            $location.search('templateId', template.id);
            renderTemplate();
        }

        function openContactPicker() {
            vm.contactPicker = true;
        }

        function closeUserPicker() {
            vm.contactPicker = false;
        }

        function openTemplatePicker() {
            vm.templatePicker = true;
        }

        function closeTemplatePicker() {
            vm.templatePicker = false;
        }

        function sortTemplates() {
            if (vm.contact && vm.templates) {
                vm.templates = messageTemplatesService.sortTemplatesByMatch(vm.templates, vm.contact);
            }
        }

        function renderTemplate(){
            if(vm.template){
                vm.message.type = vm.template.type;
            }
//            TODO: template rendering
        }

    }

})();