(function () {
  angular.module('linknetApp').controller('DebitoCtrl', [
    '$http',
    'msgs',
    'tabs',
    CreditoController
  ])

    function DebitoController($http, msgs, tabs) {
      const vm = this
      const url = 'http://localhost:3000/api/debito'


      vm.refresh = function () {
        $http.get('http://localhost:3000/api/cicloPagamento').then(function (response) {
          vm.cicloPagamentos =  response.data
          vm.cicloId = null
          vm.cicloAtual = {}
          const dataAtual = new Date
          const mesAtual = dataAtual.getMonth()+1
          const anoAtual = dataAtual.getFullYear()

          for (var i = 0; i < vm.cicloPagamentos.length; i++) {
            if(vm.cicloPagamentos[i].mes === mesAtual && vm.cicloPagamentos[i].ano === anoAtual){
              vm.cicloAtual = vm.cicloPagamentos[i]

            }
          }
          vm.cicloId = vm.cicloAtual._id
          vm.credito = {}
          vm.credito = {tipo: "", coletor: "", status: "", statusCaixa: "", devedor: "", descricao: "", valor: 0, data:new Date}

          vm.listaTipo = ['MENSALIDADE','INSTALACAO','VENDA','EMPRESTIMO','OUTROS']
          vm.listaStatusCred = ["RECEBIDO", "AGENDADO", "PENDENTE", "CANCELADO"]
          vm.listaStatusCaixa = ["REPASSADO", "NAO REPASSADO"]
          vm.listaColetor = ["DANIEL", "IZAQUE", "JAILSON", "JOSUE", "JUAN"]
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
      }

      //#####################################################################
      vm.create = function () {
        if (vm.cicloId===null) {
          vm.cicloId = vm.cicloAtual._id
        }
        const updateUrl = `${url}/${vm.cicloId}`
        $http.post(updateUrl, vm.credito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      //#####################################################################
      vm.update = function () {
        if (vm.cicloId===null) {
          vm.cicloId = vm.cicloAtual._id
        }
        const updateUrl = `${url}/${vm.cicloId}`
        $http.put(updateUrl, vm.credito).then(function (response) {
          vm.refresh()
          msgs.addSucesso('Operação realizada com sucesso!!')
        }).catch(function (response) {
          msgs.addErro(response.data.errors)
        })
      }

      //#####################################################################
          vm.delete = function () {

            if (vm.cicloId===null) {
              vm.cicloId = vm.cicloAtual._id
            }
            const deleteUrl = `${url}/${vm.cicloId}/${vm.credito._id}`
            $http.delete(deleteUrl, vm.credito._id).then(function (response) {
              console.log(vm.credito._id);
              vm.refresh()
              msgs.addSucesso('Operação realizada com sucesso!!')
            }).catch(function (response) {
              msgs.addErro(response.data.errors)
            })
          }

      //#####################################################################
      vm.change = function() {
        for (var i = 0; i < vm.cicloPagamentos.length; i++) {
          if (vm.cicloPagamentos[i]._id===vm.cicloId) {
            vm.cicloAtual = vm.cicloPagamentos[i]
          }
        }
      }
      //#####################################################################
      vm.showTabUpdate = function (credito) {
        if (vm.cicloId===null) {
          vm.cicloId = vm.cicloAtual._id
        }
        vm.credito = credito
        tabs.show(vm, {tabUpdate:true})
      }

      //#####################################################################
          vm.showTabDelete = function (credito) {
            if (vm.cicloId===null) {
              vm.cicloId = vm.cicloAtual._id
            }
            vm.credito = credito
            tabs.show(vm, {tabDelete:true})
          }

      vm.refresh()
    }

})()
