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

        activate();

        function activate() {
            messagesService.getMessage($state.params.messageId).then(function (data) {
                vm.message = data;
                if(vm.message.contactId){
                    contactsService.getContact(vm.message.contactId).then(function (data){
                        vm.contact = data;
                    })
                }
            });
        }
    }

})();