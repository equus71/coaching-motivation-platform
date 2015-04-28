(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('tagService', tagService);

    tagService.$inject = ['$http', '$q', 'lodash'];

    function tagService($http, $q, lodash) {
        var ts = {
            getMatchingTags: getMatchingTags,
            clearCache: clearCache,
            generateFormattedTags: generateFormattedTags,
            getPlainTags: getPlainTags
        };

        var tags;
        var tagsGetPromise;

        return ts;

        function getMatchingTags(tagNamePart) {
            //get from cache
            if (tags) {
                return $q.when(getMatchingTagsFromCollection(tags, tagNamePart));
            }
            if (!tagsGetPromise) {
                tagsGetPromise = getTags();
            }
            var deferred = $q.defer();
            tagsGetPromise.then(function (data) {
                tags = data;
                deferred.resolve(getMatchingTagsFromCollection(tags, tagNamePart));
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function getMatchingTagsFromCollection(tagsCollection, tagNamePart) {
            return lodash.filter(tagsCollection, function (obj) {
                return obj.indexOf(tagNamePart) >= 0;
            })
        }

        function getTags() {
            var deferred = $q.defer();
            $http.get('/static/json/tags.json').success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }

        function clearCache() {
            tags = undefined;
            tagsGetPromise = undefined;
        }

        function generateFormattedTags(tags) {
            var formattedTags = [];
            lodash.forEach(tags, function (tag) {
                formattedTags.push({text: tag});
            });
            return formattedTags;
        }

        function getPlainTags(formattedTags) {
            var plainTags = [];
            lodash.forEach(formattedTags, function (tag) {
                plainTags.push(tag.text);
            });
            return plainTags;
        }

    }

})();






