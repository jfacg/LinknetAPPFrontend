(function () {
  angular.module('linknetApp').controller('CaixaCtrl', [
    '$http',
    'msgs',
    'tabs',
    CaixaController
  ])

  function CaixaController($http, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3000/api/caixa'

//#####################################################################
    vm.refresh = function () {
      $http.get(url).then(function (response) {
        vm.caixa = {}
        vm.caixas = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }
//#####################################################################
    vm.create = function () {
      vm.caixa.nome = vm.nomeCiclo(vm.caixa.mes, vm.caixa.ano)
      $http.post(url, vm.caixa).then(function (response) {
        vm.refresh()
        msgs.addSucesso('Operação realizada com sucesso!!')
      }).catch(function (response) {
        msgs.addErro(response.data.errors)
      })
    }
//#####################################################################
    vm.delete = function () {
      const deleteUrl = `${url}/${vm.caixa._id}`
      $http.delete(deleteUrl).then(function (response) {
        vm.refresh()
        msgs.addSucesso('Operação realizada com sucesso!!')
      }).catch(function (response) {
        msgs.addErro(response.data.errors)
      })
    }

//#####################################################################
        vm.update = function () {
          vm.caixa.nome = vm.nomeCiclo(vm.caixa.mes, vm.caixa.ano)
          const updateUrl = `${url}/${vm.caixa._id}`
          $http.put(updateUrl, vm.caixa).then(function (response) {
            vm.refresh()
            msgs.addSucesso('Operação realizada com sucesso!!')
          }).catch(function (response) {
            msgs.addErro(response.data.errors)
          })
        }
//#####################################################################
    vm.showTabUpdate = function (caixa) {
      vm.caixa = caixa
      tabs.show(vm, {tabUpdate:true})
    }
//#####################################################################
    vm.showTabDelete = function (caixa) {
      vm.caixa = caixa
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
