(function () {
    'use strict';

    angular
        .module('cmp.queue')
        .controller('QueueEditCtrl', QueueEditCtrl);

    QueueEditCtrl.$inject = ['$state', 'contactsService', 'messagesService'];

    function QueueEditCtrl($state, contactsService, messagesService) {
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
                vm.saving = true;
                messagesService.saveMessage(vm.message).then(function () {
                    $state.go('^');
                }, function () {
                    alertService.addAlert('Nie udało się zapisać wiadomości.', 'danger', 30000);
                });
            } else {
                validationService.markFormFieldsAsTouched(vm.messageForm);
            }
        }

        function deleteMessage(){

        }
    }

})();