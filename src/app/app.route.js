(function() {
  'use strict';

  angular
    .module('user-manager')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/myProfile');

      $stateProvider
        .state('myDashboards', {
          url: '/myDashboards',
          templateUrl: 'app/components/myDashboards/myDashboards.html',
          controller: 'MyDashController',
          controllerAs: 'myDashCtrl'
        })

  });

})();
