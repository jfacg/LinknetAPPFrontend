(function () {
  angular.module('linknetApp').controller('CicloPagamentoCtrl', [
    '$http',
    'msgs',
    'tabs',
    CicloPagamentoController
  ])

  function CicloPagamentoController($http, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3000/api/cicloPagamento'

//#####################################################################
    vm.refresh = function () {
      $http.get(url).then(function (response) {
        vm.cicloPagamento = {}
        vm.cicloPagamentos = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }
//#####################################################################
    vm.create = function () {
      vm.cicloPagamento.nome = vm.nomeCiclo(vm.cicloPagamento.mes, vm.cicloPagamento.ano)
      $http.post(url, vm.cicloPagamento).then(function (response) {
        vm.refresh()
        msgs.addSucesso('Operação realizada com sucesso!!')
      }).catch(function (response) {
        msgs.addErro(response.data.errors)
      })
    }
//#####################################################################
    vm.delete = function () {
      const deleteUrl = `${url}/${vm.cicloPagamento._id}`
      $http.delete(deleteUrl).then(function (response) {
        vm.refresh()
        msgs.addSucesso('Operação realizada com sucesso!!')
      }).catch(function (response) {
        msgs.addErro(response.data.errors)
      })
    }

//#####################################################################
        vm.update = function () {
          vm.cicloPagamento.nome = vm.nomeCiclo(vm.cicloPagamento.mes, vm.cicloPagamento.ano)
          const updateUrl = `${url}/${vm.cicloPagamento._id}`
          $http.put(updateUrl, vm.cicloPagamento).then(function (response) {
            vm.refresh()
            msgs.addSucesso('Operação realizada com sucesso!!')
          }).catch(function (response) {
            msgs.addErro(response.data.errors)
          })
        }
//#####################################################################
    vm.showTabUpdate = function (cicloPagamento) {
      vm.cicloPagamento = cicloPagamento
      tabs.show(vm, {tabUpdate:true})
    }
//#####################################################################
    vm.showTabDelete = function (cicloPagamento) {
      vm.cicloPagamento = cicloPagamento
      tabs.show(vm, {tabDelete:true})
    }
//#####################################################################
    vm.nomeCiclo = function (mes, ano) {
      var nome = ""
      if(mes === 1){nome = `Janeiro/${ano}`}
      if(mes === 2){nome = `Fevereiro/${ano}`}
      if(mes === 3){nome = `Março/${ano}`}
      if(mes === 4){nome = `Abril/${ano}`}
      if(mes === 5){nome = `Maio/${ano}`}
      if(mes === 6){nome = `Junho/${ano}`}
      if(mes === 7){nome = `Julho/${ano}`}
      if(mes === 8){nome = `Agosto/${ano}`}
      if(mes === 9){nome = `Setembro/${ano}`}
      if(mes === 10){nome = `Outubro/${ano}`}
      if(mes === 11){nome = `Novembro/${ano}`}
      if(mes === 12){nome = `Dezembro/${ano}`}
      return nome
    }
//#####################################################################
    vm.refresh()
  }
})()
