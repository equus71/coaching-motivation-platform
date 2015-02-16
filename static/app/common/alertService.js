(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('alertService', alertService);

    function alertService() {
        var alerts = [];

        var as = {
            addAlert: addAlert,
            getAlerts: getAlerts,
            closeAlert: closeAlert
        };

        return as;

        function addAlert(text, type) {
            alerts.push({
                text: text,
                type: type
            });
        }

        function getAlerts() {
            return alerts;
        }

        function closeAlert(index){
            alerts.splice(index, 1);
        }

    }

})();






