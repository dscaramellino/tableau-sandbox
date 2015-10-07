(function() {
  'use strict';

  angular.module('tableau-sandbox')

  .controller('MyDashController', function () {
    var self = this;

    self.schoolTypeFilterOptions = {
      "6 to 8": true,
      "6 to 12": true,
      "Charter": true,
      "K to 5": true,
      "K to 12": true,
      "Small HS": true,
      "Large HS": true,
      "Transfer": true
    }

  });

})();
