(function () {
    'use strict';

    angular.module('cmp.common')
        .filter('offsetFilter', offsetFilter);

    function offsetFilter(){
        return function(input, start){
            var start = parseInt(start, 10);
            return input.slice(start);
        }
    }

})();