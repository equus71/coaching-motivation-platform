(function () {
    'use strict';

    angular
        .module('cmp.queue')
        .factory('messagesService', messagesService);

    messagesService.$inject = ['$http', '$q', 'lodash'];

    function messagesService($http, $q, lodash) {
        return {
            getMessages: getMessages,
            getMessage: getMessage,
            saveMessage: saveMessage,
            createMessage: createMessage
        };
        function getMessages() {
            var deferred = $q.defer();
            $http.get('/static/json/messages.json').success(function (data, status, headers, config) {
                lodash.forEach(data.messages, formatDatesToJS);
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getMessage(messageId) {
            var deferred = $q.defer();
            $http.get('/static/json/messages.json').success(function (data, status, headers, config) {
                var message = lodash.find(data.messages, function (obj) {
                    return obj.id == messageId;
                });
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
                url: '/save/operation',
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
                url: '/create/operation',
                method: 'POST',
                data: message
            }).success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
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