(function () {
    'use strict';

    angular
        .module('cmp.message', ['ngLodash'])
        .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$location', '$q', '$scope', '$state', 'alertService', 'contactsService', 'lodash', 'messageTemplatesService', 'templatingService', 'undoService'];

    function MessageCtrl($location, $q, $scope, $state, alertService, contactsService, lodash, messageTemplatesService, templatingService, undoService) {
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
        vm.receiverEmail = '';
        vm.receiverPhone = '';

        $scope.$on('templateSelect', templateChange);
        $scope.$on('contactSelect', contactChangeHandler);

        activate();

        function activate() {
            vm.loading = true;
            var contactsPromise = contactsService.getContacts();
            contactsPromise.then(function (data) {
                vm.contacts = data;
                vm.contacts = contactsService.sortContacts(vm.contacts);
            });
            var templatesPromise = messageTemplatesService.getTemplates();
            templatesPromise.then(function (data) {
                vm.templates = data;
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
                    vm.message.type = vm.template.type;
                    vm.message = renderTemplate(vm.message, vm.template, vm.contact);
                }
            });
        }

        function contactChangeHandler(event, contact) {
            var undo = undoService.undoOperation(vm, null,
                {
                    contact: vm.contact,
                    message: lodash.cloneDeep(vm.message),
                    receiverPhone: vm.receiverPhone,
                    receiverEmail: vm.receiverEmail
                });

            vm.contact = contact;
            $location.search('contactId', contact.id);
            contactChange();

            undo.callbacks.push(function (vm) {
                $location.search('contactId', vm.contact.id);
                vm.templates = sortTemplates(vm.templates, vm.contact);
            });
            alertService.addAlert('Adresat wiadomości został zmieniony.', 'success', 15000, undo);
        }

        function contactChange() {
            vm.templates = sortTemplates(vm.templates, vm.contact);
            vm.message = renderTemplate(vm.message, vm.template, vm.contact);
            vm.receiverEmail = vm.contact.email || '';
            vm.receiverPhone = vm.contact.phone || '';
        }

        function templateChange(event, template) {
            var undo = undoService.undoOperation(vm, null, {
                template: vm.template,
                message: lodash.cloneDeep(vm.message)
            });
            vm.template = template;
            vm.message.type = template.type;
            $location.search('templateId', template.id);
            vm.message = renderTemplate(vm.message, vm.template, vm.contact);
            undo.callbacks.push(function (vm) {
                $location.search('templateId', vm.template.id);
            });
            alertService.addAlert('Szablon wiadomości został zmieniony.', 'success', 15000, undo);
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
            } else {
                return templates;
            }
        }

        function renderTemplate(message, template, contact) {
            if (template && contact) {
                message = templatingService.compileTemplate(message, template, contact);
            }
            return message;
        }

    }

})();