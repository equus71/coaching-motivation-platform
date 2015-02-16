(function () {
    'use strict';

    angular.module('cmp.message')
        .directive('cmpTemplatePickerDirective', cmpTemplatePickerDirective);

    cmpTemplatePickerDirective.$inject = [];

    function cmpTemplatePickerDirective() {
        var directive = {
            restrict: 'E',
            scope: {
                isOpen: '=',
                templates: '='
            },
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/static/app/message/templatePickerDirective.html'
        };

        ControllerFunc.$inject = ['$scope'];

        return directive;

        function ControllerFunc($scope) {
            var vm = this;

            vm.closeTemplatePicker = closeTemplatePicker;
            vm.selectTemplate = selectTemplate;
            vm.preselectedTemplate = undefined;
            vm.templateTypeFilterValue = null;
            vm.templateTypeFilterOptions = [
                {name: 'Wszystkie', value: null},
                {name: 'SMSy', value: 'SMS'},
                {name: 'Emaile', value: 'EMAIL'}
            ];
            vm.preselectTemplate = preselectTemplate;

            function preselectTemplate(template) {
                vm.preselectedTemplate = template;
            }

            function selectTemplate() {
                vm.isOpen = false;
                $scope.$emit('templateSelect', vm.preselectedTemplate);
            }

            function closeTemplatePicker() {
                vm.isOpen = false;
            }


        }
    }

})();