(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates')
        .controller('MessageTemplatesEditCtrl', MessageTemplatesEditCtrl);

    MessageTemplatesEditCtrl.$inject = ['$state', 'alertService', 'messageTemplatesService', 'tagService', 'validationService'];

    function MessageTemplatesEditCtrl($state, alertService, messageTemplatesService, tagService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.fieldValidation = validationService.fieldValidation;
        vm.save = saveTemplate;

        activate();

        function activate() {
            messageTemplatesService.getTemplate($state.params.templateId).then(function (data) {
                vm.template = data;
            });
            tagService.clearCache();
        }

        function saveTemplate() {
            if (vm.templateForm.$valid) {
                vm.saving = true;
                messageTemplatesService.saveTemplate(vm.template).then(function () {
                    $state.go('^');
                }, function () {
                    alertService.addAlert('Nie udało się zapisać szablonu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.templateForm);
            }
        }
    }

})();