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
            markContacted: markContacted,
            sortContacts: sortContacts
        };
        
        function getContacts(isActive) {
            var deferred = $q.defer();
            var url = '/api/v1/contacts/';
            if (isActive !== undefined) {
                if (isActive) {
                    url += '?isActive=True';
                } else {
                    url += '?isActive=False';
                }
            }
            $http.get(url).success(function (data, status, headers, config) {
                lodash.forEach(data, formatDatesToJS);
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getContact(contactId) {
            var deferred = $q.defer();
            $http.get('/api/v1/contacts/' + contactId + '/').success(function (data, status, headers, config) {
                var contact = data;
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
                url: '/api/v1/contacts/' + contactId + '/',
                method: 'PUT',
                data: contact
            }).success(function (data, status, headers, config) {
                var contact = data;
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
                url: '/api/v1/contacts/',
                method: 'POST',
                data: contact
            }).success(function (data, status, headers, config) {
                var contact = data;
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
            if (contact.postponedDate && contact.postponedDate >= now) {
                contact.postponeChecked = true;
            }
            if (contact.plannedContact) {
                contact.plannedContactDate = new Date(contact.plannedContact);
            } else {
                contact.plannedContactDate = null;
            }

            return contact;
        }

        function formatDatesToJSON(contact) {
            if (contact.postponeChecked && contact.postponedDate) {
                contact.postponed = contact.postponedDate.toJSON();
            } else {
                if (!contact.postponeChecked && contact.postponed) {
                    //remove postponed if unchecked
                    contact.postponed = null;
                }
            }
            if (contact.lastContactDate) {
                contact.lastContact = contact.lastContactDate.toJSON();
            }
            if (contact.lastContactDate === null){
                contact.lastContact = null;
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
                postponedDate: contact.postponedDate,
                postponeChecked: contact.postponeChecked
            };
            contact.postponedDate = till;
            contact.postponeChecked = true;

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

        function sortContacts(contacts) {
            contacts = lodash.sortBy(contacts, 'lastContactDate');
            contacts = lodash.sortBy(contacts, evaluateContactPosition);
            return contacts;
        }

        function evaluateContactPosition(contact) {
            if (contact.state === 'CONTACT_NEEDED') {
                return 10;
            }
            if (contact.state === 'POSTPONED') {
                return 20;
            }
            if (contact.state === 'CONTACT_PLANNED') {
                return 25;
            }
            if (contact.state === 'CONTACT_OK') {
                return 30;
            }
            if (contact.state === 'DISABLED') {
                return 40;
            }

            //unknown order
            return 100;
        }

    }

})();