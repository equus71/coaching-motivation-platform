(function () {
    'use strict';

    angular.module('cmp')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: "LoginCtrl as vm"
            })
            .state('board', {
                abstract: true,
                templateUrl: "board/board.html",
                controller: "BoardCtrl as vm",
                onEnter: boardOnEnter
            })
            .state('board.dashboard', {
                url: '/',
                templateUrl: 'dashboard/dashboard.html',
                data: {
                    displayName: 'Dashboard'
                }
            })
            .state('board.contacts', {
                url: '/contacts',
                templateUrl: 'contacts/contacts.html',
                controller: "ContactsCtrl as vm",
                data: {
                    displayName: 'Kontakty'
                }
            })
            .state('board.contacts.edit', {
                url: '/{contactId:[0-9]{1,8}}',
                views: {
                    '@board': {
                        templateUrl: 'contacts/contactsAddEdit.html',
                        controller: "ContactsEditCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Edycja'
                }
            })
            .state('board.contacts.add', {
                url: '/add',
                views: {
                    '@board': {
                        templateUrl: 'contacts/contactsAddEdit.html',
                        controller: "ContactsAddCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Dodaj nowy'
                }
            })
            .state('board.messageTemplates', {
                url: '/templates',
                templateUrl: 'messageTemplates/messageTemplates.html',
                controller: "MessageTemplatesCtrl as vm",
                data: {
                    displayName: 'Szablony'
                }
            })
            .state('board.messageTemplates.edit', {
                url: '/{templateId:[0-9]{1,8}}',
                views: {
                    '@board': {
                        templateUrl: 'messageTemplates/messageTemplatesAddEdit.html',
                        controller: "MessageTemplatesEditCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Edycja'
                }
            })
            .state('board.messageTemplates.add', {
                url: '/add',
                views: {
                    '@board': {
                        templateUrl: 'messageTemplates/messageTemplatesAddEdit.html',
                        controller: "MessageTemplatesAddCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Dodaj nowy'
                }
            })
            .state('board.message', {
                url: '/message?contactId&templateId',
                templateUrl: 'message/message.html',
                controller: "MessageCtrl as vm",
                reloadOnSearch: false,
                data: {
                    displayName: 'Przygotowanie wiadmości'
                }
            })
            .state('board.queue', {
                url: '/queue',
                templateUrl: 'queue/queue.html',
                controller: "QueueCtrl as vm",
                data: {
                    displayName: 'Kolejka wiadomości do wysłania'
                }
            })
            .state('board.queue.edit', {
                url: '/{messageId:[0-9]{1,8}}',
                views: {
                    '@board': {
                        templateUrl: 'queue/queueEdit.html',
                        controller: "QueueEditCtrl as vm"
                    }
                },
                data: {
                    displayName: 'Edytuj'
                }
            });
    }

    boardOnEnter.$inject = ['$state', 'authenticationService'];

    function boardOnEnter($state, authenticationService){
        if(!authenticationService.isAuthenticated()){
            $state.go('login');
        }
    }

//    TODO: add http interceptor for 403 response leading to login state

})();