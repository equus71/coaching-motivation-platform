(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpLoading', cmpLoading);

    cmpLoading.$inject = [];

    function cmpLoading() {
        var directive = {
            restrict: 'E',
            templateUrl: 'common/loadingDirective.html'
        };
        return directive;
    }
})();