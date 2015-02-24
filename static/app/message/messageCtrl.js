(function () {
    'use strict';

    angular
        .module('cmp.message', ['ngLodash'])
        .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$location', '$q', '$scope', '$state', 'contactsService', 'lodash', 'messageTemplatesService', 'templatingService'];

    function MessageCtrl($location, $q, $scope, $state, contactsService, lodash, messageTemplatesService, templatingService) {
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
                    vm.message = renderTemplate(vm.message, vm.template, vm.contact);
                }
            });
        }

        function contactChangeHandler(event, contact) {
            vm.contact = contact;
            $location.search('contactId', contact.id);
            contactChange();
        }

        function contactChange() {
            vm.templates = sortTemplates(vm.templates, vm.contact);
            vm.message = renderTemplate(vm.message, vm.template, vm.contact);
        }

        function templateChange(event, template){
            vm.template = template;
            vm.message.type = template.type;
            $location.search('templateId', template.id);
            vm.message = renderTemplate(vm.message, vm.template, vm.contact);
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

        function sortTemplates(templates, contact) {
            if (contact && templates) {
                return messageTemplatesService.sortTemplatesByMatch(templates, contact);
            }else{
                return templates;
            }
        }

        function renderTemplate(message, template, contact){
            if(template && contact){
                message = templatingService.compileTemplate(message, template, contact);
            }
            return message;
        }

    }

})();