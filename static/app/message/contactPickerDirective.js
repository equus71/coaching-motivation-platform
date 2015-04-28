(function () {
    'use strict';

    angular.module('cmp.message')
        .directive('cmpContactPickerDirective', cmpContactPickerDirective);

    cmpContactPickerDirective.$inject = [];

    function cmpContactPickerDirective() {
        var directive = {
            restrict: 'E',
            scope: {
                isOpen: '=',
                contacts: '='
            },
            controller: ControllerFunc,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'message/contactPickerDirective.html'
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
            vm.contactTypeFilterValue = vm.contactTypeFilterOptions[1].value;
            vm.preselectContact = preselectContact;

            function preselectContact(contact) {
                vm.preselectedContact = contact;
            }

            function selectContact() {
                vm.isOpen = false;
                $scope.$emit('contactSelect', vm.preselectedContact);
            }

            function closeContactPicker() {
                vm.isOpen = false;
            }
        }
    }

})();