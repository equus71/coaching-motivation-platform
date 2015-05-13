(function () {
    'use strict';

    angular
        .module('cmp.common')
        .factory('messagesService', messagesService);

    messagesService.$inject = ['$http', '$q', 'lodash'];

    function messagesService($http, $q, lodash) {
        return {
            getMessages: getMessages,
            getContactsMessages: getContactsMessages,
            getMessage: getMessage,
            saveMessage: saveMessage,
            createMessage: createMessage,
            deleteMessage: deleteMessage
        };
        function getMessages() {
            var deferred = $q.defer();
            $http.get('/api/v1/messages/').success(function (data, status, headers, config) {
                lodash.forEach(data, formatDatesToJS);
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getContactsMessages(contact) {
            var deferred = $q.defer();
            $http.get('/api/v1/contacts/' + contact.id + '/messages/').success(function (data, status, headers, config) {
                lodash.forEach(data, formatDatesToJS);
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getMessage(messageId) {
            var deferred = $q.defer();
            $http.get('/api/v1/messages/' + messageId + '/').success(function (data, status, headers, config) {
                var message = data;
                message = formatDatesToJS(message);
                deferred.resolve(message);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function saveMessage(message) {
            var deferred = $q.defer();
            message = formatDatesToJSON(message);
            $http({
                url: '/api/v1/messages/' + message.id + '/',
                method: 'PUT',
                data: message
            }).success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function createMessage(message) {
            var deferred = $q.defer();
            message = formatDatesToJSON(message);
            $http({
                url: '/api/v1/messages/',
                method: 'POST',
                data: message
            }).success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function deleteMessage(message){
            return $http({
                url: '/api/v1/messages/' + message.id + '/',
                method: 'DELETE'
            });
        }

        function formatDatesToJS(message) {
            if (message.creationDate) {
                message.creation = new Date(message.creationDate);
            } else {
                message.creation = null;
            }
            if (message.sendAtDate) {
                message.sendAt = new Date(message.sendAtDate);
            } else {
                message.sendAt = null;
            }

            return message;
        }

        function formatDatesToJSON(message) {
            if (message.creation) {
                message.creationDate = message.creation.toJSON();
            }
            if (message.sendAt) {
                message.sendAtDate = message.sendAt.toJSON();
            }
            return message;
        }
    }

})();