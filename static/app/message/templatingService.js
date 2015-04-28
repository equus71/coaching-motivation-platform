(function () {
    'use strict';

    angular.module('cmp.message')
        .factory('templatingService', templatingService);

    templatingService.$inject = [];

    function templatingService() {
        var ts = {
            compileTemplate: compileTemplate
        };

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
    }

})();