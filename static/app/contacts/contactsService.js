(function () {
    'use strict';

    angular
        .module('cmp.contacts')
        .factory('contactsService', contactsService);

    contactsService.$inject = ['$http', '$q', 'lodash'];

    function contactsService($http, $q, lodash) {
        return{
            getContacts: getContacts,
            getContact: getContact,
            saveContact: saveContact,
            createContact: createContact
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
            var deferred = $q.defer();
            $http({
                url: '/save/operation',
                method: 'PUT',
                data: contact
            }).success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function createContact(contact) {
            contact = formatDatesToJSON(contact);
            var deferred = $q.defer();
            $http({
                url: '/create/operation',
                method: 'POST',
                data: contact
            }).success(function (data, status, headers, config) {
                deferred.resolve();
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise ;
        }

        function formatDatesToJS(contact){
            if (contact.postponed){
                contact.postponedDate = new Date(contact.postponed);
            }else{
                contact.postponedDate = null;
            }
            if (contact.lastContact){
                contact.lastContactDate = new Date(contact.lastContact);
            }else{
                contact.lastContactDate = null;
            }
            var now = new Date();
            if (contact.postponedDate
                && contact.postponedDate.getDate() <= now.getDate()
                && contact.postponedDate.getMonth() <= now.getMonth()
                && contact.postponedDate.getFullYear() <= now.getFullYear() ){
                contact.postponeChecked = true;
            }

            return contact;
        }

        function formatDatesToJSON(contact){
            if(contact.postponeChecked && contact.postponedDate){
                contact.postponed = contact.postponedDate.toJSON();
            }
            if(contact.lastContactDate){
                contact.lastContact = contact.lastContactDate.toJSON();
            }
            return contact;
        }
    }

})();