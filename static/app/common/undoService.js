(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('undoService', undoService);

    undoService.$inject = ['$q', 'lodash'];

    /**
     * @description Service producing functions being an undo operations. Consider doing full Command pattern.
     * @param $q
     * @param lodash
     * @returns {{undoOperation: undoOperation}}
     */
    function undoService($q, lodash) {
        var us = {
            undoOperation: undoOperation
        };

        return us;

        /**
         * @description Prepare undo operation.
         * @param {object} object An object which state should be restored.
         * @param {function} operation An operation that should performed to restore/undo changes to the object.
         * Should return promise returning the new object.
         * @param {object} dataPatch The data that should be applied to the object before calling the operation.

         * @returns {promise} Return promise of the operation.
         */
        function undoOperation(object, operation, dataPatch) {
            undo.callbacks = [];

            function undo() {
                //apply data patch to object
                if (dataPatch) {
                    lodash.forOwn(dataPatch, function (value, key) {
                        object[key] = value;
                    });
                }

                //perform undo operation and call callbacks
                if (operation) {
                    return operation(object).then(function (data) {
                        lodash.forEach(undo.callbacks, function (callback) {
                            callback(data);
                        })
                    });
                } else {
                    return $q.when(object).then(function (data) {
                        lodash.forEach(undo.callbacks, function (callback) {
                            callback(data);
                        })
                    });
                }
            }

            return undo;
        }
    }

})();






