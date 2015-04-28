(function () {
    'use strict';

    angular.module('cmp.contacts')
        .directive('cmpContactMessages', cmpContactMessages);

    cmpContactMessages.$inject = [];

    function cmpContactMessages() {
        var directive = {
            restrict: 'E',
            scope: {
                contact: '='
            },
            controller: controllerFunc,
            templateUrl: 'contacts/contactMessagesDirective.html'
        };

        controllerFunc.$inject = ['$scope', 'messagesService'];

        return directive;

        function controllerFunc($scope, messagesService) {
            activate();

            function activate() {
                loadMessagesForContact();
                $scope.$watch('contact.id', loadMessagesForContact);
            }

            function loadMessagesForContact() {
                if ($scope.contact) {
                    messagesService.getContactsMessages($scope.contact).then(function (data) {
                        $scope.messages = data;
                    });
                }
            }
        }
    }

})();