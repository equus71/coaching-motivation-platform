(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpTag', cmpTag);

    cmpTag.$inject = ['tagColorService'];

    function cmpTag(tagColorService) {
        var directive = {
            restrict: 'E',
            scope: {
                tags: "=",
                limit: "=?"
            },
            link: linkFunc,
            templateUrl: 'common/tagDirective.html'
        };
        return directive;
        function linkFunc(scope, element, attrs) {
            scope.tagColor = tagColorService.getColorForTag;
            scope.limit = scope.limit || 5;
        }
    }
})();