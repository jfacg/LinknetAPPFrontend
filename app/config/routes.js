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
    .state('cicloPagamento', {
      url: "/cicloPagamento",
      templateUrl: "cicloPagamento/cicloPagamento.html"
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
