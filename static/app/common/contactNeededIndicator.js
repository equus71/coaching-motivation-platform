(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpContactNeededIndicator', cmpContactNeededIndicator);

    cmpContactNeededIndicator.$inject = ['$filter'];

    function cmpContactNeededIndicator($filter) {
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
                scope.tooltipText = "Kontakt nieaktywny.\nOstatni kontakt: "
                    + (scope.contact.lastContactDate ? $filter('date')(scope.contact.lastContactDate, "dd.MM.yyyy") : "brak");
            } else {
                //postponed contact does not need to be contacted but should be indicated
                if (scope.contact.postponedDate > new Date()) {
                    scope.classes = {'fa-clock-o': true, 'text-warning': true};
                    scope.tooltipText = "Kontakt odroczony do: "
                        + $filter('date')(scope.contact.postponedDate, "dd.MM.yyyy");

                } else {
                    //if last contact was more than notificationFrequency behind last time then it should be indicated
                    var nextContact = scope.contact.lastContactDate || new Date();
                    nextContact.setHours(nextContact.getHours() + scope.contact.notificationsFrequency);
                    if (nextContact < new Date()) {
                        scope.classes = {'fa-exclamation-triangle': true, 'text-danger': true};
                        scope.tooltipText = "Kontakt potrzebny.\nOstatni kontakt: "
                            + (scope.contact.lastContactDate ? $filter('date')(scope.contact.lastContactDate, "dd.MM.yyyy") : "brak");

                    } else {
                        //else no contact needed
                        scope.classes = {'fa-check': true, 'text-success': true};
                        scope.tooltipText = "Ostatni kontakt: "
                            + (scope.contact.lastContactDate ? $filter('date')(scope.contact.lastContactDate, "dd.MM.yyyy") : "brak");
                    }
                }
            }
        }
    }

})();