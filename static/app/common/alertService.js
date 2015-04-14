(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('alertService', alertService);

    alertService.$inject = ['$timeout', 'lodash'];

    function alertService($timeout, lodash) {
        var alerts = [];

        var as = {
            addAlert: addAlert,
            getAlerts: getAlerts,
            closeAlert: closeAlert
        };

        return as;

        function addAlert(text, type, timeout) {
            var timeout = timeout || 0;

            var alert = {
                text: text,
                type: type
            };

            alerts.push(alert);

            if(timeout > 0) {
                $timeout(function () {
                    removeAlert(alert);
                }, timeout);
            }
        }

        function getAlerts() {
            return alerts;
        }

        function closeAlert(index){
            alerts.splice(index, 1);
        }

        function removeAlert(alert){
            lodash.remove(alerts, function(obj){
                return obj === alert;
            });
        }

    }

})();






