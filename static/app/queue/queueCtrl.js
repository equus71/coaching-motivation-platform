(function () {
    'use strict';

    angular
        .module('cmp.queue', [])
        .controller('QueueCtrl', QueueCtrl);

    QueueCtrl.$inject = ['$state', 'messagesService'];

    function QueueCtrl($state, messagesService) {
        var vm = this;

        vm.goToMessage = toMessage;
        vm.typeFilterValue = null;
        vm.typeFilterOptions = [
            {name: 'Wszystkie', value: null},
            {name: 'SMSy', value: 'SMS'},
            {name: 'Emaile', value: 'EMAIL'}
        ];

        activate();

        function activate() {
            vm.loading = true;

            messagesService.getMessages().then(function (data) {
                vm.messages = data;
                vm.loading = false;
            })
        }

        function toMessage(id) {
            $state.go('.edit', {'messageId': id});
        }
    }

})();