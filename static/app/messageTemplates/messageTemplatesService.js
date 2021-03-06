(function () {
    'use strict';

    angular
        .module('cmp.messageTemplates')
        .factory('messageTemplatesService', messageTemplatesService);

    messageTemplatesService.$inject = ['$http', '$q', 'lodash'];

    function messageTemplatesService($http, $q, lodash) {
        return{
            getTemplates: getTemplates,
            getTemplate: getTemplate,
            saveTemplate: saveTemplate,
            createTemplate: createTemplate,
            deleteTemplate: deleteTemplate,
            sortTemplatesByMatch: sortTemplatesByMatch
        };
        function getTemplates() {
            var deferred = $q.defer();
            $http.get('/api/v1/messageTemplates/').success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getTemplate(templateId) {
            var deferred = $q.defer();
            $http.get('/api/v1/messageTemplates/' + templateId + '/').success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function saveTemplate(template) {
            var deferred = $q.defer();
            $http({
                url: '/api/v1/messageTemplates/' + template.id + '/',
                method: 'PUT',
                data: template
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function createTemplate(template) {
            var deferred = $q.defer();
            $http({
                url: '/api/v1/messageTemplates/',
                method: 'POST',
                data: template
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function deleteTemplate(template){
            return $http({
                url: '/api/v1/messageTemplates/' + template.id + '/',
                method: 'DELETE'
            });
        }

        function sortTemplatesByMatch(templates, contact) {
            // sort templates by number of matching tags with the given contact
            var contactTags = contact.tags;

            return lodash.sortBy(templates,
                function (template) {
                    return lodash.reduce(
                        template.tags, function (sum, tag) {
                            if (contactTags.indexOf(tag) >= 0){
                                return sum + 1;
                            }else{
                                return sum;
                            }
                        }, 0);
                }).reverse();
        }
    }

})();