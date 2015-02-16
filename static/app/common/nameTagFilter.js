(function () {
    'use strict';

    angular.module('cmp.common')
        .filter('nameTagFilter', nameTagFilter);

    nameTagFilter.$inject = ['lodash'];

    function nameTagFilter(lodash) {
        return function (input, name) {
            var out = [];
            if (!name) {
                return input;
            }
            name = name.toLowerCase();
            for (var i = 0; i < input.length; i++) {
                var inputName = '';
                if(input[i].name){
                    inputName = input[i].name;
                }else{
                    inputName = input[i].firstName + ' ' + input[i].lastName;
                }
                inputName = inputName.toLowerCase();
                if (inputName.indexOf(name) >= 0
                    || lodash.find(input[i].tags,
                    function (obj) {
                        return obj.indexOf(name) >= 0
                    })) {
                    out.push(input[i]);
                }
            }
            return out;
        }
    }

})();