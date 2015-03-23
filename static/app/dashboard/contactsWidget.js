(function () {
    'use strict';

    angular.module('cmp.dashboard')
        .directive('cmpContactsWidget', cmpContactsWidget);

    cmpContactsWidget.$inject = [];

    function cmpContactsWidget() {
        var directive = {
            restrict: 'E',
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'dashboard/contactsWidget.html'
        };

        ControllerFunc.$inject = ['$modal', '$state', 'contactsService'];

        return directive;

        function ControllerFunc($modal, $state, contactsService) {
            var vm = this;

            vm.contacts = [];
            vm.writeToContact = writeToContact;
            vm.postponeContact = postponeContact;
            vm.markContactedNow = markContactedNow;
            vm.deactivateContact = deactivateContact;
            vm.currentPage = 1;

            contactsService.getContacts().then(function(data){
                vm.contacts = data.contacts;
            });

            function writeToContact(contact){
                $state.go('message', {'contactId': contact.id});
            }

            function postponeContact(contact){

            }

            function markContactedNow(contact){

            }

            function deactivateContact(contact){
                var promptModal = $modal.open({
                    template: '<div><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()">x</button><div>Deaktywacja kontaktu</div></div><div class="modal-body">Deaktywacja kontaktu spowoduje, że kontakt nie będzie pojawiać się na listach z przypomnieniami. Deaktywować kontakt? <p><button type="button" class="btn btn-warning" ng-click="$close()">Tak</button> <button type="button" class="btn btn-default" ng-click="$dismiss()">Nie</button></p></div></div>'
                });
                promptModal.result.then(function(){
                    contactsService.deactivateContact(contact).then(function(){
                        //TODO: handling
                    });
                });
            }
        }
    }

})();