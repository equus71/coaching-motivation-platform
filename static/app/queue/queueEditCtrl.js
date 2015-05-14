(function () {
    'use strict';

    angular
        .module('cmp.queue')
        .controller('QueueEditCtrl', QueueEditCtrl);

    QueueEditCtrl.$inject = ['$state', 'contactsService', 'deleteModalService', 'messagesService', 'validationService'];

    function QueueEditCtrl($state, contactsService, deleteModalService, messagesService, validationService) {
        var vm = this;

        vm.message = {};
        vm.contact = null;
        vm.saveMessage = saveMessage;
        vm.deleteMessage = deleteMessage;

        activate();

        function activate() {
            messagesService.getMessage($state.params.messageId).then(function (data) {
                vm.message = data;
                if(vm.message.contact){
                    contactsService.getContact(vm.message.contact).then(function (data){
                        vm.contact = data;
                    })
                }
            });
        }

        function saveMessage(){
            if (vm.messageForm.$valid) {
                vm.saveInProgress = true;
                messagesService.saveMessage(vm.message).then(function () {
                    $state.go('^');
                }, function () {
                    vm.saveInProgress = false;
                    alertService.addAlert('Nie udało się zapisać wiadomości.', 'danger', 30000);
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.messageForm);
            }
        }

        function deleteMessage(){
            deleteModalService.makeDeleteModal(vm.message, "MESSAGE").then(function(){
                messagesService.deleteMessage(vm.message).then(function(){
                    $state.go('.^');
                })
            });
        }
    }

})();