(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpIsFocused', cmpIsFocused);

    cmpIsFocused.$inject = [];

    function cmpIsFocused() {
        var directive = {
            require: "ngModel",
            restrict: 'A',
            link: linkFunc
        };
        return directive;

        function linkFunc(scope, element, attrs, ngModel) {
            ngModel.$focused = false;

            element.on('focus', function () {
                scope.$apply(function () {
                    ngModel.$focused = true;
                });
            });
            element.on('blur', function () {
                scope.$apply(function () {
                    ngModel.$focused = false;
                });
            });
        }
    }
})();