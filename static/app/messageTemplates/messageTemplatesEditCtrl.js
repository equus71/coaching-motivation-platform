(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates')
        .controller('MessageTemplatesEditCtrl', MessageTemplatesEditCtrl);

    MessageTemplatesEditCtrl.$inject = ['$state', 'alertService', 'deleteModalService', 'messageTemplatesService', 'tagService', 'templatingService', 'validationService'];

    function MessageTemplatesEditCtrl($state, alertService, deleteModalService, messageTemplatesService, tagService, templatingService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.fieldValidation = validationService.fieldValidation;
        vm.save = saveTemplate;
        vm.delete = deleteTemplate;
        vm.formattedTags = [];

        activate();

        function activate() {
            messageTemplatesService.getTemplate($state.params.templateId).then(function (data) {
                vm.template = data;
                vm.formattedTags = tagService.generateFormattedTags(vm.template.tags);
            });
            templatingService.getDefaultVariables().then(function(data){
                vm.availableVariables = data;
            });
            tagService.clearCache();
        }

        function saveTemplate() {
            if (vm.templateForm.$valid) {
                vm.saveInProgress = true;
                vm.template.tags = tagService.getPlainTags(vm.formattedTags);
                messageTemplatesService.saveTemplate(vm.template).then(function () {
                    $state.go('^');
                }, function () {
                    vm.saveInProgress = false;
                    alertService.addAlert('Nie udało się zapisać szablonu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.templateForm);
            }
        }

        function deleteTemplate() {
            deleteModalService.makeDeleteModal(vm.template, "MESSAGE_TEMPLATE").then(function(){
                messageTemplatesService.deleteTemplate(vm.template).then(function(){
                    $state.go('.^');
                });
            });
        }
    }

})();