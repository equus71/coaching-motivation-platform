(function () {
    'use strict';

    angular.module('cmp.message')
        .factory('templatingService', templatingService);

    templatingService.$inject = ['$http', '$q'];

    function templatingService($http, $q) {
        var ts = {
            compileTemplate: compileTemplate,
            getDefaultVariables: getDefaultVariables,
            getAllVariables: getAllVariables
        };

        var  defaultVariables = [
            {
                key: "imie",
                desc: "Imie kontaktu"
            },
            {
                key: "imie_w",
                desc: "Imie kontaktu w wołaczu"
            },
            {
                key: "nazwisko",
                desc: "Nazwisko kontaktu"
            },
            {
                key: "tytul",
                desc: "Tytuł, Pan/Pani"
            },
            {
                key: "tytul_w",
                desc: "Tytuł w wołaczu"
            }
        ];

        return ts;

        function compileTemplate(message, template, contact) {
            // basing on the contact the context is build
            var context = prepareMessageContextFromContact(contact);

            //Handlebars compile template
            var compiledBodyTemplate = Handlebars.compile(template.templateBody);
            var compiledHeaderTemplate = Handlebars.compile(template.templateHeader);

            //context is applied to the template -- the real rendering
            message.body = compiledBodyTemplate(context);
            message.header = compiledHeaderTemplate(context);

            return message;
        }

        function prepareMessageContextFromContact(contact) {
            var context = {};

            context.imie = contact.firstName;

            context.imie_w = contact.firstNameDeclension;
            context.nazwisko = contact.lastName;

            context.tytul = "";
            context.tytul_w = "";
            if (contact.gender == "1") {
                context.tytul = "Pan";
                context.tytul_w = "Panie";
            }
            if (contact.gender == "2") {
                context.tytul = "Pani";
                context.tytul_w = "Pani";
            }

            return context;
        }

        function getDefaultVariables() {
            return $q.when(defaultVariables);
        }

        function getAllVariables() {
            var deferred = $q.defer();
            $http({
                url: '/api/v1/variables/',
                //TODO: extend model & add service
                method: 'GET'
            }).success(function (data, status, headers, config) {
                var allVariables = defaultVariables;
                allVariables.concat(data);
                deferred.resolve(allVariables);
            }).error(function (data) {
                deferred.reject();
            });
            return deferred.promise;
        }
    }

})();