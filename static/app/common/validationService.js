(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('validationService', validationService);

    validationService.$inject = ['lodash'];

    function validationService(lodash) {
        var vs = {
            fieldValidation: fieldValidation,
            markFormFieldsAsTouched: markFormFieldsAsTouched
        };

        return vs;

        function fieldValidation(field) {
            try {
                return !field.$valid && field.$touched && !field.$focused;
            } catch (err) {
                return false;
            }
        }

        function markFormFieldsAsTouched(form) {
            lodash.each(form, function (value, key) {
                // We skip non-form and non-inputs
                if (!value || value.$dirty === undefined) {
                    return;
                }
                // Recursively applying same method on all forms included in the form
                if (value.$addControl) {
                    return markFormFieldsAsTouched(value);
                }
                // Setting inputs to $touched
                if(value.$setTouched){
                    value.$setTouched();
                }
            });
        }
    }

})();