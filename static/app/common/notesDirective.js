(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpNotes', cmpNotes);

    cmpNotes.$inject = [];

    function cmpNotes() {
        var directive = {
            restrict: 'E',
            scope: {
                contact: '='
            },
            link: linkFunc,
            templateUrl: 'common/notesDirective.html'
        };
        return directive;

        function linkFunc(scope, element, attrs) {
            //TODO: write save notes logic
        }
    }
})();