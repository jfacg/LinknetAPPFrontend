(function () {
  angular.module('linknetApp').controller('DashboardCtrl', [
    '$http',
    DashboardController
  ])

  function DashboardController($http) {
    const vm = this
    vm.getSumario = function () {
      const url = 'http://localhost:3000/api/cicloPagamentoSumario'
      $http.get(url).then(function (response) {
        const {credito, debito} = response.data
        vm.credito = credito
        vm.debito = debito
        vm.consolidado = credito - debito
      })
    }

    vm.getSumario()
  }
})()
