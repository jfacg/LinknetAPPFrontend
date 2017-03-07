(function () {
  angular.module('linknetApp').controller('CreditoCtrl', [
    '$http',
    'msgs',
    'tabs',
    CreditoController
  ])

    function CreditoController($http, msgs, tabs) {
      const vm = this
      const url = 'http://localhost:3000/api/credito'
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
            vm.creditos = response.data.creditos
            vm.credito = {valor: 0, data:new Date}
          })
        })

      }

      const geradorListas = function () {
        vm.listaTipo = ['MENSALIDADE','INSTALACAO','VENDA','EMPRESTIMO','OUTROS']
        vm.listaStatusCred = ["RECEBIDO", "AGENDADO", "PENDENTE", "CANCELADO"]
        vm.listaStatusCaixa = ["REPASSADO", "NAO REPASSADO"]
        vm.listaColetor = ["DANIEL", "IZAQUE", "JAILSON", "JOSUE", "JUAN"]
      }

      vm.create = function () {
        const createUrl = `${url}/${vm.caixaSelecionado}`
        $http.post(createUrl, vm.credito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.update = function () {
        const updateUrl = `${url}/${vm.caixaSelecionado}`
        $http.put(updateUrl, vm.credito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.delete = function () {
        const deleteUrl = `${url}/${vm.caixaSelecionado}/${vm.credito._id}`
        $http.delete(deleteUrl, vm.credito._id).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      vm.change = function() {
        const url = `${urlCaixa}/${vm.caixaSelecionado}`
        $http.get(url).then(function (response) {
          vm.creditos = response.data.creditos
        })
      }

      vm.showTabUpdate = function (credito) {
        if (vm.cicloId===null) {
          vm.cicloId = vm.cicloAtual._id
        }
        vm.credito = credito
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (credito) {
        vm.credito = credito
        tabs.show(vm, {tabDelete:true})
      }

      vm.refresh()
    }

})()
