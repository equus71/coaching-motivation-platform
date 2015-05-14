(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates', ['ngLodash'])
        .controller('MessageTemplatesCtrl', MessageTemplatesCtrl);

    MessageTemplatesCtrl.$inject = ['$state', 'messageTemplatesService'];

    function MessageTemplatesCtrl($state, messageTemplatesService) {
        var vm = this;

        vm.goToTemplate = toTemplate;
        vm.typeFilterValue = null;
        vm.typeFilterOptions = [
            {name: 'Wszystkie', value: null},
            {name: 'SMSy', value: 'SMS'},
            {name: 'Emaile', value: 'EMAIL'}
        ];

        activate();

        function activate() {
            vm.loading = true;
            messageTemplatesService.getTemplates().then(function (data) {
                vm.templates = data;
                vm.loading = false;
            })
        }

        function toTemplate(id) {
            $state.go('.edit', {'templateId': id});
        }
    }

})();