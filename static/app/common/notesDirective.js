(function () {
    'use strict';

    angular.module('cmp.common')
        .directive('cmpNotes', cmpNotes);

    cmpNotes.$inject = [];

    function cmpNotes() {
        var directive = {
            restrict: 'E',
            scope: {
                contact: '='
            },
            controller: directiveController,
            controllerAs: 'vm',
            templateUrl: 'common/notesDirective.html'
        };

        directiveController.$inject = ['contactsService'];

        return directive;

        function directiveController(contactsService) {
            var vm = this;

            vm.saveNotes = saveNotes;

            function saveNotes(contact){
                vm.inProgress = true;
                contactsService.saveContact(contact).then(function(){
                    vm.inProgress = false;
                });
            }
        }
    }
})();