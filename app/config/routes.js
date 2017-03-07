angular.module('linknetApp').config([
  //navegação ui-route
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('dashboard',{
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    })
    .state('caixas', {
      url: "/caixa",
      templateUrl: "caixa/caixa.html"
    })
    .state('creditos', {
      url: "/credito",
      templateUrl: "credito/credito.html"
    })
    .state('debitos', {
      url: "/debito",
      templateUrl: "debito/debito.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
  }
])
