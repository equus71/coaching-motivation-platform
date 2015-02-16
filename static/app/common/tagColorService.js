(function () {
    'use strict';

    angular.module('cmp.common')
        .factory('tagColorService', tagColorService);

    function tagColorService() {
        var colorAssignment = {};
        var colorIndex = 0;

        var tgc = {
            getColorForTag: getColorForTag
        };

        return tgc;

        function getColorForTag(tagName) {

            if (tagName in colorAssignment) {
                return colorAssignment[tagName];
            }

            colorAssignment[tagName] = colorBase[colorIndex];
            colorIndex++;

            if (colorIndex == colorBase.length) {
                colorIndex = 0;
            }

            return colorAssignment[tagName];
        }

    }

    var colorBase = ["#4A148C", "#1976D2", "#039BE5", "#F44336", "#D81B60", "#00BCD4",
        "#1B5E20", "#00ACC1", "#673AB7", "#7E57C2", "#B71C1C", "#4CAF50",
        "#006064", "#388E3C", "#1A237E", "#03A9F4", "#00838F", "#558B2F",
        "#A1887F", "#512DA8", "#00695C", "#795548", "#1565C0", "#0288D1",
        "#8D6E63", "#3949AB", "#FF5722", "#5D4037", "#E91E63", "#8E24AA",
        "#E65100", "#4527A0", "#6D4C41", "#2E7D32", "#BA68C8", "#3E2723",
        "#D84315", "#1E88E5", "#00897B", "#5E35B1", "#E64A19", "#2196F3",
        "#EF6C00", "#F4511E", "#43A047", "#0D47A1", "#4E342E", "#33691E",
        "#3F51B5", "#7986CB", "#0097A7", "#01579B", "#7B1FA2", "#E53935",
        "#0277BD", "#AD1457", "#311B92", "#D32F2F", "#C62828", "#5C6BC0",
        "#9575CD", "#AB47BC", "#C2185B", "#9C27B0", "#303F9F", "#009688",
        "#BF360C", "#880E4F", "#6A1B9A", "#00796B", "#004D40", "#283593"]

})();






