(function () {
    'use strict';

    angular.module('cmp.common')
        .filter('typeFilter', typeFilter);

    function typeFilter(){
        return function(input, type){
            var out = [];
            if (!type) {
                return input;
            }
            if (!input) {
                return [];
            }
            for (var i = 0; i < input.length; i++) {
                if (input[i].type == type) {
                    out.push(input[i]);
                }
            }
            return out;
        }
    }

})();