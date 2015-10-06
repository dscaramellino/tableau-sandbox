(function() {
  'use strict';

  angular.module('tableau-sandbox')

  .directive('dsDashboardWidget', function() {
    return {
      restrict: 'E',

      link: function(scope, element, attrs) {

        initializeViz();

        var viz, workbook, activeSheet, worksheets, activeWorksheet;

        function initializeViz() {
          var url = "http://awstest.newvisions.org/#/views/testworkbook/Whoareourschools";
          var options = {
          width: 1050,
          height: 700,
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: function () {
              workbook = viz.getWorkbook();
              // get the active sheet (ie tab) in the workbook
              activeSheet = workbook.getActiveSheet();
              // get the array of worksheets in this sheet
              worksheets = activeSheet.getWorksheets();
              activeWorksheet = getWorksheetByName(worksheets, "Sheet 2");
              applyFilter();
            }
          };
          viz = new tableau.Viz(element, url, options);
        }

        function applyFilter() {
          var selectedFilters = getSelectedFilters();
          activeWorksheet.applyFilterAsync(
          "Schooltype",
          selectedFilters,
          tableau.FilterUpdateType.REPLACE);
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
          var filterOptions = scope.myDashCtrl.filterOptions;
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

