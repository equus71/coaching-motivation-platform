(function () {
    'use strict';

    angular
        .module('cmp.message', ['ngLodash'])
        .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$q', '$scope', '$state', 'contactsService', 'lodash', 'messageTemplatesService'];

    function MessageCtrl($q, $scope, $state, contactsService, lodash, messageTemplatesService) {
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
        vm.contactTypeFilterValue = null;
        vm.contactTypeFilterOptions = [
            {name: 'Wszystkie', value: null},
            {name: 'Aktywne', value: 'active'},
            {name: 'Nieaktywne', value: 'inactive'}
        ];

        $scope.$watch('vm.contact', contactChange);
        $scope.$on('templateSelect', templateChange);

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
                }
                if ($state.params.templateId) {
                    vm.template = lodash.find(vm.templates, function (obj) {
                        return obj.id == $state.params.templateId;
                    });
                    renderTemplate();
                }
            });
        }

        function contactChange() {
            sortTemplates();
        }

        function templateChange(event, template){
            vm.template = template;
            renderTemplate();
        }

        function openContactPicker() {
            vm.userPicker = true;
        }

        function closeUserPicker() {
            vm.userPicker = false;
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
            vm.message.type = vm.template.type;
//            TODO: template rendering
        }

    }

})();