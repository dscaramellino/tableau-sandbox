(function() {
  'use strict';

  angular.module('tableau-sandbox')

  .directive('dsTableauViz', function() {
    return {
      restrict: 'E',

      template: '<div class="tableau-viz-container"></div>',

      scope: {
        width: '@',
        height: '@',
        url: '@',
        worksheetName: '@',
        schoolTypeFilterOptions: '='
      },


      link: function(scope, element, attrs) {

        var width = scope.width ? parseInt(scope.width) : 800;
        var height = scope.height ? parseInt(scope.height) : 1000;
        var url = scope.url || '';
        var worksheetName = scope.worksheetName;

        initializeViz();

        var viz, workbook, activeSheet, worksheets, activeWorksheet;

        function initializeViz() {
          var options = {
          width: width,
          height: height,
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: function () {
              workbook = viz.getWorkbook();
              // get the active sheet (ie tab) in the workbook
              activeSheet = workbook.getActiveSheet();
              // get the array of worksheets in this sheet
              worksheets = activeSheet.getWorksheets();
              activeWorksheet = getWorksheetByName(worksheets, worksheetName);
            }
          };
          viz = new tableau.Viz(element[0].querySelector('.tableau-viz-container'), url, options);
        }

        scope.$watch('schoolTypeFilterOptions', function () {
          applyFilter();
        }, true);

        function applyFilter() {
          var selectedFilters = getSelectedFilters();
          if (activeWorksheet) {
            activeWorksheet.applyFilterAsync(
            "Schooltype",
            selectedFilters,
            tableau.FilterUpdateType.REPLACE);
          } else {
            return;
          }
        }

        function getWorksheetByName(worksheets, name) {
          var worksheet;
          for (var i=0; i<worksheets.length; i++) {
            var thisWorksheet = worksheets[i];
            var thisWorksheetName = thisWorksheet.getName();
            if (thisWorksheetName === name) {
              worksheet = thisWorksheet;
              break;
            }
          }
          return worksheet;
        }

        function getSelectedFilters() {
          var filterOptions = scope.schoolTypeFilterOptions;
          var selectedFilters = [];
          for (var key in filterOptions) {
            if (filterOptions[key]) selectedFilters.push(key);
          }
          return selectedFilters;
        }

      }
    }
  })
})();

