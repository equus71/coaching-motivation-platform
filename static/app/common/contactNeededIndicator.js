(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpContactNeededIndicator', cmpContactNeededIndicator);

    cmpContactNeededIndicator.$inject = [];

    function cmpContactNeededIndicator() {
        var directive = {
            restrict: 'E',
            scope: {
                contact: '='
            },
            link: linkFunc,
            template: '<span tooltip="{{tooltipText}}"><i class="fa" ng-class="classes"></i></span>'
        };
        return directive;

        function linkFunc(scope, element, attrs) {
            //disabled contacts does not need to be contacted
            if (!scope.contact.isActive) {
                scope.classes = {'fa-check': true};
            } else {
                //postponed contact does not need to be contacted but should be indicated
                if (scope.contact.postponedDate > new Date()) {
                    scope.classes = {'fa-clock-o': true, 'text-warning': true};
                } else {
                    //if last contact was more than notificationFrequency behind last time then it should be indicated
                    var nextContact = scope.contact.lastContactDate || new Date();
                    nextContact.setHours(nextContact.getHours() + scope.contact.notificationsFrequency);
                    if (nextContact < new Date()) {
                        scope.classes = {'fa-exclamation-triangle': true, 'text-danger': true};
                    } else {
                        //else no contact needed
                        scope.classes = {'fa-check': true, 'text-success': true};
                    }
                }
            }

            //TODO: wyliczyć tooltip
        }
    }

})();