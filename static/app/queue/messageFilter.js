(function () {
    'use strict';

    angular.module('cmp.queue')
        .filter('messageFilter', messageFilter);

    messageFilter.$inject = ['lodash'];

    function messageFilter(lodash) {
        return function (input, filterPhrase) {
            var out = [];
            if (!filterPhrase) {
                return input;
            }
            filterPhrase = filterPhrase.toLowerCase();
            for (var i = 0; i < input.length; i++) {
                var inputName = input[i].recipientName.toLowerCase();
                if (inputName.indexOf(filterPhrase) >= 0) {
                    out.push(input[i]);
                }
            }
            return out;
        }
    }

})();