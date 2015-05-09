(function () {
    'use strict';

    angular
        .module('cmp.board', [])
        .controller('BoardCtrl', BoardCtrl);

    BoardCtrl.$inject = ['alertService'];

    function BoardCtrl(alertService) {
        var vm = this;

        vm.alerts = alertService.getAlerts();
        vm.closeAlert = alertService.closeAlert;
        vm.undoAlert = alertService.undoAlert;
        vm.toggleSidebar = toggleSidebar;
        vm.isSidebarOpened = false;

        function toggleSidebar(){
            vm.isSidebarOpened = !vm.isSidebarOpened;
        }
    }

})();