(function () {
    'use strict';

    angular.module('cmp.common', ['ngLodash'])
        .directive('cmpIsFocused', cmpIsFocused)
        .directive('cmpTag', cmpTag);

    //TODO: extract directives from here
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
            })
        }
    }

    cmpTag.$inject = ['tagColorService'];

    function cmpTag(tagColorService) {
        var directive = {
            restrict: 'E',
            scope: {
                tags: "=",
                limit: "=?"
            },
            link: linkFunc,
            template: '<span><span ng-repeat="tag in tags|limitTo:limit"><span class="label label-info" ng-style="{\'background-color\': tagColor(tag)}">{{ tag }}</span> </span> <span ng-if="::tags.length > 5" class="label label-info" tooltip="{{ tags.slice(limit).join() }}">+{{ (tags.length - limit) }}</span></span>'
        };
        return directive;
        function linkFunc(scope, element, attrs) {
            scope.tagColor = tagColorService.getColorForTag;
            scope.limit = scope.limit || 5;
        }
    }

})();