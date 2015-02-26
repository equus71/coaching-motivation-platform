(function () {
    'use strict';

    angular.module('cmp', [
        'cmp.messageTemplates',
        'cmp.contacts',
        'cmp.routes',
        'cmp.message',
        'cmp.common',
        'cmp.dashboard',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'angularUtils.directives.uiBreadcrumbs',
        'ngTagsInput'
    ]);

})();