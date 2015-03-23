(function () {
    'use strict';

    angular.module('cmp.message')
        .directive('cmpTemplatePickerDirective', cmpTemplatePickerDirective);

    cmpTemplatePickerDirective.$inject = ['$modal'];

    function cmpTemplatePickerDirective($modal) {
        var directive = {
            restrict: 'E',
            scope: {
                isOpen: '=',
                templates: '='
            },
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'message/templatePickerDirective.html'
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
                var promptModal = $modal.open({
                    template: '<div><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()">x</button><div>Zmiana szablonu</div></div><div class="modal-body">Wprowadzone dane w tytule i treści wiadomości zostaną zastąpione danymi z wybranego szablonu. Kontunuować?<p><button type="button" class="btn btn-warning" ng-click="$close()">Tak</button> <button type="button" class="btn btn-default" ng-click="$dismiss()">Nie</button></p></div></div>'
                });
                promptModal.result.then(function(){
                    vm.isOpen = false;
                    $scope.$emit('templateSelect', vm.preselectedTemplate);
                });
            }

            function closeTemplatePicker() {
                vm.isOpen = false;
            }


        }
    }

})();