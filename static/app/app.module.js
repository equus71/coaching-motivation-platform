(function () {
    'use strict';

    angular
        .module('cmp', [
            'cmp.messageTemplates',
            'cmp.contacts',
            'cmp.login',
            'cmp.message',
            'cmp.common',
            'cmp.dashboard',
            'cmp.queue',
            'cmp.board',
            'ngAnimate',
            'ngCookies',
            'ui.router',
            'ui.bootstrap',
            'angularUtils.directives.uiBreadcrumbs',
            'ngTagsInput'
        ])
        .run(csrfRun);

    csrfRun.$inject = ['$http'];

    function csrfRun($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();