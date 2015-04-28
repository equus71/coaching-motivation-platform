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
        vm.formattedTags = [];
        vm.availableVariables = [
            {
                key: "imie",
                desc: "Imie kontaktu"
            },
            {
                key: "imie_w",
                desc: "Imie kontaktu w wołaczu"
            },
            {
                key: "nazwisko",
                desc: "Nazwisko kontaktu"
            },
            {
                key: "tytul",
                desc: "Tytuł, Pan/Pani"
            },
            {
                key: "tytul_w",
                desc: "Tytuł w wołaczu"
            }
        ];

        activate();

        function activate() {
            messageTemplatesService.getTemplate($state.params.templateId).then(function (data) {
                vm.template = data;
                vm.formattedTags = tagService.generateFormattedTags(vm.template.tags);
            });
            tagService.clearCache();
        }

        function saveTemplate() {
            if (vm.templateForm.$valid) {
                vm.saving = true;
                vm.template.tags = tagService.getPlainTags(vm.formattedTags);
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