(function () {
    'use strict';

    angular.module('cmp.message')
        .directive('cmpContactPickerDirective', cmpContactPickerDirective);

    cmpContactPickerDirective.$inject = ['$modal'];

    function cmpContactPickerDirective($modal) {
        var directive = {
            restrict: 'E',
            scope: {
                isOpen: '=',
                contacts: '='
            },
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/static/app/message/contactPickerDirective.html'
        };

        ControllerFunc.$inject = ['$scope'];

        return directive;

        function ControllerFunc($scope) {
            var vm = this;

            vm.closeContactPicker = closeContactPicker;
            vm.selectContact = selectContact;
            vm.preselectedContact = undefined;
            vm.contactTypeFilterOptions = [
                {name: 'Wszystkie', value: null},
                {name: 'Aktywne', value: {value: true, key: "isActive"}},
                {name: 'Nieaktywne', value: {value: false, key: "isActive"}}
            ];
            vm.contactTypeFilterValue =  vm.contactTypeFilterOptions[1].value;
            vm.preselectContact = preselectContact;

            function preselectContact(contact) {
                vm.preselectedContact = contact;
            }

            function selectContact() {
                var promptModal = $modal.open({
                    template: '<div><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()">x</button><div>Zmiana kontaktu</div></div><div class="modal-body">Zmiana kontaktu spowoduje ponowne odrysowanie szablonu. Utacisz wszystkie zmiany w istniejącej wiadomości. Czy na pewno zmienić kontakt?<p><button type="button" class="btn btn-warning" ng-click="$close()">Tak</button> <button type="button" class="btn btn-default" ng-click="$dismiss()">Nie</button></p></div></div>'
                });
                promptModal.result.then(function(){
                    vm.isOpen = false;
                    $scope.$emit('contactSelect', vm.preselectedContact);
                });
            }

            function closeContactPicker() {
                vm.isOpen = false;
            }


        }
    }

})();