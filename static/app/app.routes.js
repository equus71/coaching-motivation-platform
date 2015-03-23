(function () {
    'use strict';

    angular.module('cmp.routes', [
        'ui.router',
        'cmp.messageTemplates'
    ])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'dashboard/dashboard.html',
                data: {
                    displayName: 'Dashboard'
                }
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: 'contacts/contacts.html',
                controller: "ContactsCtrl as vm",
                data: {
                    displayName: 'Kontakty'
                }
            })
            .state('contacts.edit', {
                url: '/{contactId:[0-9]{1,8}}',
                views: {
                    '@': {
                        templateUrl: 'contacts/contactsAddEdit.html',
                        controller: "ContactsEditCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Edycja'
                }
            })
            .state('contacts.add', {
                url: '/add',
                data: {
                    displayName: 'Dodaj nowy'
                }
            })
            .state('messageTemplates', {
                url: '/templates',
                templateUrl: 'messageTemplates/messageTemplates.html',
                controller: "MessageTemplatesCtrl as vm",
                data: {
                    displayName: 'Szablony'
                }
            })
            .state('messageTemplates.edit', {
                url: '/{templateId:[0-9]{1,8}}',
                views: {
                    '@': {
                        templateUrl: 'messageTemplates/messageTemplatesAddEdit.html',
                        controller: "MessageTemplatesEditCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Edycja'
                }
            })
            .state('messageTemplates.add', {
                url: '/add',
                views: {
                    '@': {
                        templateUrl: 'messageTemplates/messageTemplatesAddEdit.html',
                        controller: "MessageTemplatesAddCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Dodaj nowy'
                }
            })
            .state('message', {
                url: '/message?contactId&templateId',
                templateUrl: 'message/message.html',
                controller: "MessageCtrl as vm",
                reloadOnSearch: false,
                data: {
                    displayName: 'Przygotowanie wiadmości'
                }
            })
            .state('queue', {
                url: '/queue',
                data: {
                    displayName: 'Kolejka wiadomości do wysłania'
                }
            })
            .state('queue.edit', {
                url: '/{messageId:[0-9]{1,8}}',
                data: {
                    displayName: 'Edytuj'
                }
            })
    }

})();