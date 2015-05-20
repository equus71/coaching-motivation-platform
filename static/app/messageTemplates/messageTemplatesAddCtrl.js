(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates')
        .controller('MessageTemplatesAddCtrl', MessageTemplatesAddCtrl);

    MessageTemplatesAddCtrl.$inject = ['$state', 'alertService', 'messageTemplatesService', 'tagService', 'templatingService', 'validationService'];

    function MessageTemplatesAddCtrl($state, alertService, messageTemplatesService, tagService, templatingService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.save = saveTemplate;
        vm.fieldValidation = validationService.fieldValidation;
        vm.formattedTags = [];
        vm.template = {
            "name": "",
            "type": "EMAIL",
            "tags": [],
            "templateBody": "",
            "templateHeader": ""
        };

        activate();

        function activate() {
            tagService.clearCache();
            templatingService.getDefaultVariables().then(function(data){
                vm.availableVariables = data;
            });
        }

        function saveTemplate() {
            if (vm.templateForm.$valid) {
                vm.saveInProgress = true;
                vm.template.tags = tagService.getPlainTags(vm.formattedTags);
                messageTemplatesService.createTemplate(vm.template).then(function () {
                    $state.go('^');
                }, function () {
                    vm.saveInProgress = false;
                    alertService.addAlert('Nie udało się zapisać szablonu.', 'danger');
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.templateForm);
            }
        }
    }

})();