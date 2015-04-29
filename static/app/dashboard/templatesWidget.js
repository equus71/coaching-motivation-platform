(function () {
    'use strict';

    angular.module('cmp.dashboard')
        .directive('cmpTemplatesWidget', cmpTemplatesWidget);

    cmpTemplatesWidget.$inject = [];

    function cmpTemplatesWidget() {
        var directive = {
            restrict: 'E',
            controller: TemplatesWidgetControllerFunc,
            controllerAs: 'vmt',
            bindToController: true,
            templateUrl: 'dashboard/templatesWidget.html'
        };

        TemplatesWidgetControllerFunc.$inject = ['messageTemplatesService'];

        return directive;

        function TemplatesWidgetControllerFunc(messageTemplatesService) {
            var vm = this;

            vm.templates = [];
            vm.currentPage = 1;
            vm.pageSize = 10;

            messageTemplatesService.getTemplates().then(function (data) {
                vm.templates = data;
            });

        }
    }

})();