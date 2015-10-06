(function() {
  'use strict';

  angular.module('tableau-sandbox')

  .controller('MyDashController', function () {
    var self = this;

    self.filterOptions = {
      "6 to 8": true,
      "6 to 12": false,
      "Charter": true,
      "K to 5": false,
      "K to 12": false,
      "Small HS": false,
      "Large HS": false,
      "Transfer": false
    }

    self.applyFilter = function() {

    }

  });

})();
