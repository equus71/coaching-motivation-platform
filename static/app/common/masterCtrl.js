(function () {
    'use strict';

    angular
        .module('cmp.common')
        .controller('MasterCtrl', MasterCtrl);

    MasterCtrl.$inject = ['alertService'];

    function MasterCtrl(alertService) {
        var vm = this;

        vm.alerts = alertService.getAlerts();
        vm.closeAlert = alertService.closeAlert;
        vm.toggleSidebar = toggleSidebar;
        vm.isSidebarOpened = false;

        function toggleSidebar(){
            vm.isSidebarOpened = !vm.isSidebarOpened;
        }
    }

})();