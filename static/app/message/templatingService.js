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
            // TODO: przygotować właściwy kontekst
            var context = {exp: 'ala ma kota'};

            //Handlebars compile template
            var compiledBodyTemplate = Handlebars.compile(template.templateBody);
            var compiledHeaderTemplate = Handlebars.compile(template.templateHeader);

            //context is applied to the template -- the real rendering
            message.body = compiledBodyTemplate(context);
            message.header = compiledHeaderTemplate(context);
            return message;
        }
    }

})();