(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpTypeSelect', cmpTypeSelect);

    cmpTypeSelect.$inject = ['lodash'];

    function cmpTypeSelect(lodash) {
        var directive = {
            restrict: 'E',
            scope: {
                value: '=',
                options: '='
            },
            link: linkFunc,
            template: '<div class="form-group dropdown" dropdown><button class="btn btn-default dropdown-toggle" type="button" dropdown-toggle>{{ currentValueName() }} <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li role="presentation" ng-repeat="option in options track by $index"><a role="menuitem" tabindex="-1" href="" ng-click="selectOption(option)">{{::option.name}}</a></li></ul></div>'
        };
        return directive;

        function linkFunc(scope, element, attrs) {
            scope.selectOption = selectOption;
            scope.currentValueName = currentValueName;

            function selectOption(option){
                scope.value = option.value;
            }

            function currentValueName(){
                return (lodash.find(scope.options, function(obj){
                    return obj.value == scope.value;
                }) || scope.options[0]).name;
            }
        }
    }

})();