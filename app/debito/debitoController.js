(function () {
  angular.module('linknetApp').controller('DebitoCtrl', [
    '$http',
    'msgs',
    'tabs',
    DebitoController
  ])

    function DebitoController($http, msgs, tabs) {
      const vm = this
      const url = 'http://localhost:3000/api/debito'
      const urlCaixa = 'http://localhost:3000/api/caixa'

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true})
        $http.get(urlCaixa).then(function (response) {
          geradorListas()
          vm.caixas = response.data
          vm.caixaAtual = {}
          const dataAtual = new Date
          for (var i = 0; i < vm.caixas.length; i++) {
            if(vm.caixas[i].mes === dataAtual.getMonth()+1 && vm.caixas[i].ano === dataAtual.getFullYear()){
              vm.caixaAtual = vm.caixas[i]
          }}

          vm.caixaSelecionado = vm.caixaAtual._id

          const urlRefresh = `${urlCaixa}/${vm.caixaAtual._id}`
          $http.get(urlRefresh).then(function (response) {
            vm.debitos = response.data.debitos
            vm.debito = {valor: 0, data:new Date}
          })
        })

      }

      const geradorListas = function () {
        vm.listaTipo = ['COMPRA','SALARIO','CONTA','OUTRO']
        vm.listaStatusDebt = ["PAGO", "AGENDADO", "PENDENTE", "CANCELADO"]
        vm.listaStatusCaixa = ["LOJA", "PROPRIO"]
        vm.listaPagador = ["DANIEL", "IZAQUE", "JAILSON", "JOSUE", "JUAN"]
      }

      vm.create = function () {
        const createUrl = `${url}/${vm.caixaSelecionado}`
        $http.post(createUrl, vm.debito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.update = function () {
        const updateUrl = `${url}/${vm.caixaSelecionado}`
        $http.put(updateUrl, vm.debito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.delete = function () {
        const deleteUrl = `${url}/${vm.caixaSelecionado}/${vm.debito._id}`
        $http.delete(deleteUrl).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.change = function() {
        const url = `${urlCaixa}/${vm.caixaSelecionado}`
        $http.get(url).then(function (response) {
          vm.debitos = response.data.debitos
        })
      }

      vm.showTabUpdate = function (debito) {
        vm.debito = debito
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (debito) {
        vm.debito = debito
        tabs.show(vm, {tabDelete:true})
      }

      vm.refresh()
    }

})()
