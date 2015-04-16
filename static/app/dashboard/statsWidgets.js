(function () {
    'use strict';

    angular.module('cmp.dashboard')
        .directive('cmpStatsWidgets', cmpStatsWidgets);

    cmpStatsWidgets.$inject = [];

    function cmpStatsWidgets() {
        var directive = {
            restrict: 'E',
            controller: ControllerFunc,
            controllerAs: 'vms',
            bindToController: true,
            templateUrl: 'dashboard/statsWidgets.html'
        };

        ControllerFunc.$inject = ['statsService'];

        return directive;

        function ControllerFunc(statsService) {
            var vm = this;

            vm.stats = {
                activeClients: '-',
                contactNeeded: '-',
                templates: '-',
                inMsgQueue: '-'
            };

            statsService.getStats().then(function(data) {
                vm.stats = data.stats;
            });
        }
    }

})();