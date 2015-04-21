(function () {
    'use strict';

    angular
        .module('cmp.common')
        .factory('contactsService', contactsService);

    contactsService.$inject = ['$http', '$q', 'lodash', 'undoService'];

    function contactsService($http, $q, lodash, undoService) {
        return {
            getContacts: getContacts,
            getContact: getContact,
            saveContact: saveContact,
            createContact: createContact,
            deactivateContact: deactivateContact,
            postponeContact: postponeContact,
            markContacted: markContacted
        };
        function getContacts() {
            var deferred = $q.defer();
            $http.get('/static/json/contacts.json').success(function (data, status, headers, config) {
                lodash.forEach(data.contacts, formatDatesToJS);
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getContact(contactId) {
            var deferred = $q.defer();
            $http.get('/static/json/contacts.json').success(function (data, status, headers, config) {
                var contact = lodash.find(data.contacts, function (obj) {
                    return obj.id == contactId
                });
                contact = formatDatesToJS(contact);
                deferred.resolve(contact);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function saveContact(contact) {
            contact = formatDatesToJSON(contact);
            var contactId = contact.id;
            var deferred = $q.defer();
            $http({
                url: '/static/json/contacts.json',
                method: 'PUT',
                data: contact
            }).success(function (data, status, headers, config) {
                var contact = lodash.find(data.contacts, function (obj) {
                    return obj.id == contactId
                });
                contact = formatDatesToJS(contact);
                deferred.resolve(contact);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function createContact(contact) {
            contact = formatDatesToJSON(contact);
            var deferred = $q.defer();
            $http({
                url: '/static/json/contacts.json',
                method: 'POST',
                data: contact
            }).success(function (data, status, headers, config) {
                var contact = data.contacts[0];
                contact = formatDatesToJS(contact);
                deferred.resolve(contact);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function formatDatesToJS(contact) {
            if (contact.postponed) {
                contact.postponedDate = new Date(contact.postponed);
            } else {
                contact.postponedDate = null;
            }
            if (contact.lastContact) {
                contact.lastContactDate = new Date(contact.lastContact);
            } else {
                contact.lastContactDate = null;
            }
            var now = new Date();
            if (contact.postponedDatei
                && contact.postponedDate >= now) {
                contact.postponeChecked = true;
            }

            return contact;
        }

        function formatDatesToJSON(contact) {
            if (contact.postponeChecked && contact.postponedDate) {
                contact.postponed = contact.postponedDate.toJSON();
            }
            if (contact.lastContactDate) {
                contact.lastContact = contact.lastContactDate.toJSON();
            }
            return contact;
        }

        function deactivateContact(contact) {
            var undoPatch = {
                isActive: contact.isActive
            };
            contact.isActive = false;

            var result = saveContact(contact);
            result.undo = undoService.undoOperation(contact, saveContact, undoPatch);

            return result;
        }

        function postponeContact(contact, till) {
            var undoPatch = {
                postponedDate: contact.postponedDate
            };
            contact.postponedDate = till;

            var result = saveContact(contact);
            result.undo = undoService.undoOperation(contact, saveContact, undoPatch);

            return result;
        }

        function markContacted(contact, contactTime) {
            var undoPatch = {
                lastContactDate: contact.lastContactDate
            };
            contact.lastContactDate = contactTime;

            var result = saveContact(contact);
            result.undo = undoService.undoOperation(contact, saveContact, undoPatch);

            return result;
        }

    }

})();