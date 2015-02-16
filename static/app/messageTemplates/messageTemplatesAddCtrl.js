(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates')
        .controller('MessageTemplatesAddCtrl', MessageTemplatesAddCtrl);

    MessageTemplatesAddCtrl.$inject = ['$state', 'alertService', 'messageTemplatesService', 'tagService', 'validationService'];

    function MessageTemplatesAddCtrl($state, alertService, messageTemplatesService, tagService, validationService) {
        var vm = this;

        vm.matchingTags = tagService.getMatchingTags;
        vm.save = saveTemplate;
        vm.fieldValidation = validationService.fieldValidation;
        vm.template = {
            "name": "",
            "type": "EMAIL",
            "tags": [],
            "templateBody": "",
            "templateHeader": ""
        };

        activate();

        function activate(){
            tagService.clearCache();
        }

        function saveTemplate() {
            if(vm.templateForm.$valid){
                vm.saving = true;
                messageTemplatesService.createTemplate(vm.template).then(function(){
                    $state.go('^');
                }, function(){
                    alertService.addAlert('Nie udało się zapisać szablonu.', 'danger');
                });
            }else{
                validationService.markFormFieldsAsTouched(vm.templateForm);
            }
        }
    }

})();