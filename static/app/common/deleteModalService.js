(function () {
    'use strict';

    angular
        .module('cmp.common')
        .factory('deleteModalService', deleteModalService);

    deleteModalService.$inject = ['$modal', '$q'];

    function deleteModalService($modal, $q) {
        var deleteModal = null;
        return {
            makeDeleteModal: makeDeleteModal
        };

        function makeDeleteModal(resource, type) {
            modalCtrl.$inject = ['resource'];

            function modalCtrl(resource) {
                var vm = this;
                vm.resource = resource;
            }

            var modalUrl = '';
            if (type == 'MESSAGE_TEMPLATE') {
                modalUrl = 'common/deleteModalTemplate.html';
            }
            if (type === 'MESSAGE') {
                modalUrl = 'common/deleteModalMessage.html';
            }
            if (!deleteModal && modalUrl) {
                deleteModal = $modal.open({
                    templateUrl: modalUrl,
                    controller: modalCtrl,
                    controllerAs: "vmm",
                    resolve: {
                        resource: function () {
                            return resource;
                        }
                    }
                });
                deleteModal.result.then(function () {
                    deleteModal = undefined;
                }, function () {
                    deleteModal = undefined;
                });

                return deleteModal.result;
            }
            return $q.reject();
        }

    }
})();